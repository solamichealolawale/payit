var donate = {
    isLive: app.isLiveApp,
    txn: null,
    $donateId: null,
    currentTxn: null,
    bankAccname: null,
    bankName: null,
    txnRef: null,
    backStack:[],

    start: function() {
        //move the user to the next section based on selections
        $('#choose-donate-option').on('click', function() {
            //open the next section
            if (app.element('optionNGO').checked) {
                donate.switchSection('create-NGO');
            } else if (app.element('optionDonate').checked) {
                donate.switchSection('list-NGO');
                donate.listNGO();
            }
        });

        $('#submitDonations').on('click', function(event) {
            event.preventDefault();
            donate.process();
        });

        $('#btn-donate-card-method').on('click', function(e) {
            e.preventDefault();
            if (app.element('donateSaveCard').checked){
                //checks if the user is already signed in
                if(app.isLoggedIn){
                    var userID = app.db().last().id
                    app.listCards(userID, function(response){
                        //process list of saved cards from the server
                        var temp = null,
                            count = 1,
                            img = '';

                        if(response.cards.length === 0){
                            temp += `<tr>
                                    <td><small class="bold text-danger">Ooops! No card is available.<br> 
                                    Please add a new card or try again later</small> </td>
                                </tr> `;
                        }else{
                            response.cards.forEach(function(value, index){
                            
                            if(value.bankname.indexOf('mastercard') >= 0){
                                img = "images/others/master.png";
                            }else if(value.bankname.indexOf('visacard') >= 0){
                                img = "images/others/visa.png";
                            }else if(value.bankname.indexOf('vervecard') >= 0){
                                img = "images/others/verve.png";
                            }else if(value.bankname.indexOf('americanexpress') >= 0){
                                img = "images/others/ae.png";
                            }else{
                                img = "images/others/card.png";
                            }

                            temp += `<tr>
                                    <td class="wave">
                                        <label for="airtime_card_id_`+ count +`}">
                                            <input type="radio" class="option-input radio" value="`+ value.keycode +`" name="airtime-choose-card" id="airtime_card_id_`+ count +`" data-info=''>
                                        </label>
                                    </td>
                                    <td>
                                    <label for="airtime_card_id_`+ count +`">
                                        <img src="`+ img +`" style="width: 50px;" />
                                    </label>
                                    </td>
                                    <td class="text-black">
                                        <label for="airtime_card_id_`+ count +`">
                                            <small class="bold">`+ value.maskcard +`<span id="cardMark`+ count +`"></span><br><span id="airbankName`+ count +`" style="display: none"></span></small>
                                        </label>
                                    </td>
                                </tr> `;
                                count++;
                            })
                        }

                        $('#listSavedCardsOnDonate').html(temp);

                        //enable the disabled proceed button, if one of the saved card is chosen
                        $("input[name=donate-choose-card]:radio").change(function () {
                            $('#btn-donate-use-savecard').show();       
                        });
                    });
                    donate.switchSection('donate-view-cards');
                }else{
                    app.SignIn(function() {
                        donate.switchSection('donate-view-cards');
                    });
                }
            }else{
                //send to an endpoint
                return app.pay('donation', 'card', app.formData('donateTxn'));
            }
        });

        $('#btn-donate-use-savecard').on('click', function(e) {
            e.preventDefault();
            var keycode = $('input[name=donate-choose-card]:checked').val();
            app.processSavedCard('donation', keycode, app.formData('donateTxn'), function(){
                $('#donate').modal('hide');
            });
        });

        // on change of the input type file
        $("#ngo-logo").change(function(){
            donate.previewImage(this);
        });

        $("#ngo-cimg").change(function(){
            donate.previewImage(this)
        });

        $("#ngo-cac").change(function(){
            if (Math.round(input.files[0].size/1024) >= 2048){
            app.alert('Oops','Selected file size is greater than 2MB Please reduce the size and try again', 'warning');
            $(this).val("");
            return false;
            }
        });

    },

    previewImage: function(input){
        //if the image selected is greater than 500Kb ignore the image and reset the image placeholder
        if (Math.round(input.files[0].size/1024) >= 512){
            app.alert('Oops','Image size is greater than 500kb Please reduce the size and try again', 'warning');
            $(input).val("");
            return false;
            
        }else{
            //preview the image
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $(input).closest("div").find("img").attr('src', e.target.result);
                    // console.log(reader.result);
                }
                reader.readAsDataURL(input.files[0]);
            }
        }
    },
 
    init: function() {
        donate.switchSection('choose-donate');
        donate.txn = null;
        donate.txnRef = null;
        // app.element('accNo').value = '';
        // app.element('tAmount').value = '';
        // app.element('bank_account_name').innerHTML = '';
        // $('#country,#wallet_transfer_form')[0].reset();
    },

    process: function(name) {
       var input = app.input("donateTxn")
        if (donate.validateAmount(input.amount.value)) {
            if (app.element('walletPayment3').checked) {
                if (app.isLoggedIn) {
                    app.pay('donation', 'wallet', app.formData('donateTxn'));
                } else {
                    app.SignIn(function() {
                        app.pay('donation', 'wallet', app.formData('donateTxn'));
                    });
                }
            } else if (app.element('cardPayment3').checked) {
                donate.switchSection('donate-card-method');
            }
        } else if (input.amount.value) {
            return app.alert('Error', 'Kindly enter a amount.', 'error');
        } else if (!topup.validateAmount(input.amount.value)) {
            return app.alert('Error', 'Kindly enter a valid amount.', 'error');
        }
    },

    validateAmount: function(amount) {
        if (app.validateAmount(amount)) {
            return true;
        } else {
            return false;
        }
    },

    listNGO: function(){
        $('#listNGO').html(`<tr>
                          <td colspan="2"><span class="bold text-warning">Loading...</span></td>
                        </tr>`);

        $.get(app.API + '/web/donations')
        .done(function(data){
            var looop = null;
            data.donations.forEach(function(ngo) {
                looop +=
                `<tr class="eachNGO" onclick="donate.getNGODetails(this)" data-id="`+ngo.id+`">
                <td width="40%"><img src="`+app.API + '/storage/'+ngo.logo+`" class="img-fluid"></td>
                <td width="60%"><h5><small class="bold text-uppercase">`+ngo.name+`</small></h5></td>
                </tr>`
            });
            $('#listNGO').html(looop);
        });
    },

    getNGODetails: function(element){
        var getNGOId = $(element).data('id');
        donate.$donateId = getNGOId;

        donate.switchSection('NGO-details');

        $('#section-NGO-details').html(`<div class='card-profile text-center'><span class="bold text-warning">Loading...<span></div>`);
        // gets JSON data from the below url
        $.get(app.API + '/web/donation/'+getNGOId)
        .done(function(response){
            var contents = null;
            contents = 
            `<div class='card-profile text-center'>
            <img class='card-img-top img-fluid' src='`+app.API+'/storage/'+response.data.bg_picture+`' class="img-fluid">
            <div class=''>
            <img alt='NGOLogo' class='card-img-profile img-fluid' src='`+app.API + '/storage/'+response.data.logo+`'>

            <h4 class='card-title'>`+response.data.name+`</h4>
            <div id="descriptions">`+response.data.description+`</div>
            <div class='card-links'>
            <a href="javascript:;" onclick="donate.goBack()" class="btn btn-primary mx-1 pull-left">Back</a>
            <a href="javascript:;" onclick="donate.showDonateForm()" class="btn btn-primary mx-1 pull-right" id="make-donations">Proceed</a>
            </div>
            </div>
            </div>`
            $('#section-NGO-details').html(contents);
            $('#logo-NGO').attr('src',app.API + '/storage/'+response.data.logo);
            $('#name-NGO').text(response.data.name);
        });
    },

    showDonateForm: function(){
        donate.switchSection("NGO-form");
        $('#donate-user').val(app.db().last().id);
        $('#donateId').val(donate.$donateId);
    },

    switchSection: function(section) {
        //hide all the section 
        $('.sections-donate').hide();
        //enable the active section  
        $('#section-' + section).show();
         donate.backStack.push(section);
    },

    goBack: function(){
        donate.backStack.pop();
        var last =  donate.backStack[donate.backStack.length - 1];
        $('.sections-donate').hide();
        $('#section-' + last).show();
    },

}
donate.start();