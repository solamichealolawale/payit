var sendmoney = {
    isLive: app.isLiveApp,
    txn: null,
    currentTxn: null,
    bankAccname: null,
    bankName: null,
    txnRef: null,
    backStack:[],
    // forwardStack:[],

    start: function() {
        //move the user to the next section based on selections
        $('#transfer-method').on('click', function() {
            //open the next section
            if (app.element('walletTransfer').checked) {
                sendmoney.switchSection('wallet-transfer');
            } else if (app.element('accountTransfer').checked) {
                sendmoney.switchSection('bank-transfer-info');
            }
        });

        //check which country is selected
        $('#country-name').on('click', function(e) {
        	e.preventDefault();
            var country = $("#country-lists option:selected").text()
            if (country == "Nigeria") {
                //open the next section if Nigeria is selected
                sendmoney.switchSection('choose-transfer');
            }else{
                app.alert('Coming Soon','We are working on getting this service available to ' + country,'info');
                $('#sendMoney').modal('hide');
            }
        });

        //check which type of method the user wants to use
        $('#transfer-bank-method').on('click', function(e) {
            e.preventDefault();
            
            //open the next section
            if (app.element('cardMethod').checked) {
                sendmoney.currentTxn = 'card';
            } else if (app.element('walletMethod').checked) {
                sendmoney.currentTxn = 'wallet';
            }

            var txn = {
                'accNo': sendmoney.txn.accNo,
                'bankCode': sendmoney.txn.bankCode,
                'amount': $('#tAmount').val(),
                'ben_number': '',
                'bankName': sendmoney.bankName,
                'accName': sendmoney.bankAccname
            }

            //update the transaction state
            sendmoney.txn = txn;

            //determine transaction part way based on selection
            if (sendmoney.currentTxn == 'wallet') {
                //collect the transaction
                app.pay('bank-transfer', 'wallet', txn);
            } else {
                //open the card section for entering card details
                sendmoney.switchSection('sendmoney-card-method');
            }
        });

        //wallet validation if wallet is chosen
        $('#validate-wallet').on('click', function(e) {
            e.preventDefault();
            $(this).text("Loading...");
            var txn = {
                'number': app.element('wallet-transfer-phone').value,
                'amount': app.element('wallet-transfer-amount').value
            }
            sendmoney.txn = txn;
            sendmoney.processValidation('wallet', txn);
        });

        //authorize wallet transaction
        $('#commit-transfer-wallet').on('click', function(e) {
            e.preventDefault();

            //request for pin to complete the transaction
            app.pay('wallet-transfer', 'wallet', sendmoney.txn);
        });

        // switch to bank tranfer if card is choosen
        $('#transfer-bank-process').on('click', function(e) {
            e.preventDefault();
            sendmoney.switchSection('bank-transfer');
        });

        //checks which payment method is choosen (Interswitch or saved cards)
        //makes sure user signs in before user proceed to see list of saved cards


        $('#btn-sendmoney-card-method').on('click', function(e) {
            e.preventDefault();

            if (app.element('sendmoneySaveCard').checked){
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
                                        <label for="sendmoney_card_id_`+ count +`}">
                                            <input type="radio" class="option-input radio" value="`+ value.keycode +`" name="sendmoney-choose-card" id="sendmoney_card_id_`+ count +`" data-info=''>
                                        </label>
                                    </td>
                                    <td>
                                    <label for="sendmoney_card_id_`+ count +`">
                                        <img src="`+ img +`" style="width: 50px;" />
                                    </label>
                                    </td>
                                    <td class="text-black">
                                        <label for="sendmoney_card_id_`+ count +`">
                                            <small class="bold">`+ value.maskcard +`<span id="cardMark`+ count +`"></span><br><span id="smbankName`+ count +`" style="display: none"></span></small>
                                        </label>
                                    </td>
                                </tr> `;
                                count++;
                            })
                        }

                        $('#listSavedCardsOnSendMoney').html(temp);

                        //enable the disabled proceed button, if one of the saved card is chosen
                        $("input[name=sendmoney-choose-card]:radio").change(function () {
                            $('#btn-sendmoney-use-savecard').show();       
                        });
                    });
                    sendmoney.switchSection('sendmoney-view-cards');
                }else{
                    app.SignIn(function() {
                        sendmoney.switchSection('sendmoney-view-cards');
                    });
                }
            }else{
                //send to an endpoint
                //return app.pay('bank-transfer', 'card', sendmoney.txn);
                sendmoney.switchSection('bank-transfer-card-info');
            }

        });

        //enable the disabled proceed button, if one of the saved card is chosen
        $("input[name=sm-choose-card]:radio").change(function () {
            $('#btn-sendmoney-use-savecard').show();       
        });
        
        // send keycode to an endpoint if proceed button is clicked
        $('#btn-sendmoney-use-savecard').on('click', function(e) {
            e.preventDefault();
            var keycode = $('input[name=sendmoney-choose-card]:checked').val(),
                txn = {
                'accNo': sendmoney.txn.accNo,
                'bankCode': sendmoney.txn.bankCode,
                'amount': $('#tAmount').val(),
                'ben_number': '',
                'bankName': sendmoney.bankName,
                'accName': sendmoney.bankAccname
            }
            sendmoney.txn = txn;
            app.processSavedCard('bank-transfer', keycode, txn, function(){
                $('#sendMoney').modal('hide');
            });
        });

        //validates Card Info/Details
        $('#validate-cardInfo').on('click', function(e) {
            e.preventDefault();

           if ($("#card").val() == ''){
                return app.alert('Error', 'Kindly Enter a Valid Card Number.', 'error');
            }else if ($("#card_expiry").val() == ''){
                return app.alert('Error', 'Kindly Enter a Valid Card Expiry Number.', 'error');
            }else if ($("#cvv").val() == ''){
                return app.alert('Error', 'Kindly Enter a Valid Card CVV.', 'error');
            }else if ($("#card-pin").val() == ''){
                return app.alert('Error', 'Kindly Enter your Card PIN', 'error');
            }else{
                $(this).text("Loading...");
                var txn = {
                    'user': app.db().last().id,
                    'accNo': sendmoney.txn.accNo,
                    'bankCode': sendmoney.txn.bankCode,
                    'amount': $('#tAmount').val(),
                    'ben_number': '',
                    'bankName': sendmoney.bankName,
                    'accName': sendmoney.bankAccname
                }
                
                //update the transaction state
                sendmoney.txn = txn;

                var cardInfo = app.formData('card_info');

                sendmoney.processCardInfo('card', txn, cardInfo);
             }
            
        });


        //switch to where user can save their card info when they click on add card
        $('#btn-sendmoney-addcard').on('click', function(e) {
            e.preventDefault();
            sendmoney.switchSection('bank-transfer-card-info');
        });

        //validates OTP
        $('#validate-OTP').on('click', function(e) {
            e.preventDefault();
            $(this).text("Loading...");

            var userOTP = $('#OTP').val();
            var txnRef = sendmoney.txnRef;
            sendmoney.processOTP(txnRef, userOTP);

        });


        //accept certain pattern when input
        Payment.restrictNumeric(document.querySelector('[data-numeric]'));
        Payment.formatCardNumber(document.querySelector('.cc-number-send'));
        //Payment.formatCardExpiry(document.querySelector('.cc-exp'));
        Payment.formatCardCVC(document.querySelector('.cc-cvc-send'));
        // var cardType = Payment.fns.cardType(_this.J.val(_this.number));


        //card number validation when user are entering info
        $('#card-send').keyup(function() {
            //once the card status / validity has been clearified jump to the next tab
            if (Payment.fns.validateCardNumber(Payment.J.val(document.querySelector('.cc-number-send')))) {
                //jump to the next tab if its valid input
                $('input[name="card-expiration-send"]').focus();
            }
        });

        //card expiry validation on user input
        $('#card_expiry-send').keyup(function() {
            var value = $(this).val();
            var length = $(this).val().length;

            if (length == 1) {
                if (value > 1) {
                    $(this).val('0' + value + ' / ');
                }
            }

            if (length == 2) {
                $(this).val(value + ' / ');
            }

            if (length == 3 || length == 4 || length == 5) {
                $(this).val(value.substr(0, 2));
            }

            //jump to the next tab if its valid input
            if (length == 7) {
                $('input[name="card-cvv-send"]').focus();
            }
        });

        //card cvv validation on user input
        $('#cvv-send').keyup(function() {
            var length = $(this).val().length;
            if (length == 3) {
                $('input[name="card-pin-send"]').focus();
            }
        });

    },

    switchSection: function(section) {
        //hide all the section 
        $('.sections-sendmoney').hide();
        //enable the active section  
        $('#section-' + section).show();
        sendmoney.backStack.push(section);
    },


    goBack: function(){
        sendmoney.backStack.pop();
        var last =  sendmoney.backStack[sendmoney.backStack.length - 1];
        $('.sections-sendmoney').hide();
        $('#section-' + last).show();
    },


    init: function() {
        sendmoney.switchSection('choose-country');
        sendmoney.txn = null;
        sendmoney.txnRef = null;
        app.element('accNo').value = '';
        app.element('tAmount').value = '';
        app.element('bank_account_name').innerHTML = '';
        $('#country,#wallet_transfer_form')[0].reset();

    },
    
    process: function(name) {
        accName = name;

    },
    processOTP: function(txnRef, otp) {
        var data = {
            txnRef: txnRef,
            otp: otp
        };

        //connect to the server and process as needed
        $.post(app.API + '/web/transfer/account/process/card/otp', {
            'data': data
        })
            .done(function(response) {
            //return the data
            if (response.status == 200) {
                //handle the response also
                app.alert(
                response.title,
                response.msg, 'success')
            } else {
                //display error message
                app.alert(
                response.title,
                response.msg, 'error')
            }
        });
    },
    getAccountName: function() {
        accName = app.element('bank_account_name');
        accName.innerHTML = 'Loading ...';
        //pull the current selected bank and account number to get the result of the transaction
        var txn = {
            'accNo': app.element('accNo').value,
            'bankCode': $("#bank-lists option:selected").val()
        };
        sendmoney.txn = txn;
        sendmoney.bankName = $("#bank-lists option:selected").text();
        sendmoney.processValidation('bank', txn);
    },
    processValidation: function(type, data) {
        if (type == 'wallet') {
            url = '/web/transfer/wallet/validation';
        } else {
            url = '/web/transfer/account/validation';
        }

        $.post(app.API + url, {
            'data': data
        })
            .done(function(response) {
            //return the data
            if (response.status == 200) {
                //connect to the next tab and display user information for confirmation
                if (type == 'wallet') {
                    //display the information
                    $('#user_fullname').text(response.info.firstname + ' ' + response.info.lastname);
                    $('#user_profile_img').attr('src', app.API + '/storage/' + response.info.pic);

                    //calculate total with the charges of 2% and apply to the total
                    $('#user_amount').text(sendmoney.txn.amount)
                    sendmoney.switchSection('wallet-summary');

                } else {
                    //display result on the
                    accName = app.element('bank_account_name');
                    accName.innerHTML = response.name;
                    sendmoney.bankAccname = response.name;

                    //enable the button
                    document.getElementById("transfer-bank-process").disabled = false;
                }

            } else {
                //display error message
                app.alert(
                response.title,
                response.msg, 'error')
            }
        });
    },
    processCardInfo: function(type, txn, data) {

        $.post(app.API + '/web/transfer/account/process/card', {
            'type': type,
            'txn': txn,
            'cardInfo': data
        })
            .done(function(response) {
            //return the data
            if (response.status == 200) {
                //keep the transaction reference
                sendmoney.txnRef = response.txnRef;

                //connect to the next tab and ask for the OTP
                if (response.validation) {
                    //open iframe and load the url into it
                    //sendmony is already listening for response from iframe at start function
                    var iframe = document.createElement('iframe');
                    iframe.setAttribute('style', 'z-index:9999;');
                    iframe.setAttribute('width', '100%');
                    iframe.setAttribute('height', '100%');
                    iframe.setAttribute('id', 'iframe');
                    iframe.src = response.url;
                    iframe.onload = function() {
                        $(".loadingtext").hide();
                    }
                    $('.iframe-holder').removeClass('hide');
                    $('.iframe-3dsec').append(iframe);

                    //close the open modal
                    $("#sendMoney").modal('hide');
                } else {
                    sendmoney.switchSection('bank-transfer-card-otp');
                }

            } else {
                //display error message
                app.alert(
                response.title,
                response.msg, 'error')
            }
        });

    },
    validateAmount: function(amount) {
        //check the amount against the settings from the server to set the amount within the given range.
        if (app.validateAmount(amount)) {
            //check against settings to see if it matches.
            return true;
        } else {
            return false;
        }
    }
}
sendmoney.start();