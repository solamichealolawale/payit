var topup = {
    isLive: app.isLiveApp,
    txnRef: null,
    backStack:[],

    start: function() {
        app.element('number').focus();
        document.getElementById("submitPopup").addEventListener("click", function(event) {
            event.preventDefault()
            topup.process();
        });


        //checks which payment method is choosen (Interswitch or saved cards)
        //makes sure user signs in before user proceed to see list of saved cards
        $('#btn-topup-card-method').on('click', function(e) {
            e.preventDefault();

            if (app.element('topupSaveCard').checked){
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
                                        <label for="topup_card_id_`+ count +`}">
                                            <input type="radio" class="option-input radio" value="`+ value.keycode +`" name="topup-choose-card" id="topup_card_id_`+ count +`" data-info=''>
                                        </label>
                                    </td>
                                    <td>
                                    <label for="topup_card_id_`+ count +`">
                                        <img src="`+ img +`" style="width: 50px;" />
                                    </label>
                                    </td>
                                    <td class="text-black">
                                        <label for="topup_card_id_`+ count +`">
                                            <small class="bold">`+ value.maskcard +`<span id="cardMark`+ count +`"></span><br><span id="topbankName`+ count +`" style="display: none"></span></small>
                                        </label>
                                    </td>
                                </tr> `;
                                count++;
                            })
                        }

                        $('#listSavedCardsOntopup').html(temp);

                        //enable the disabled proceed button, if one of the saved card is chosen
                        $("input[name=topup-choose-card]:radio").change(function () {
                            $('#btn-topup-use-savecard').show();       
                        });
                    });
                    topup.switchSection('topup-view-cards');
                }else{
                    app.SignIn(function() {
                        topup.switchSection('topup-view-cards');
                    });
                }
            }else{
                //send to an endpoint
                $('#topup-user').val(app.db().last().id);
            	app.pay('addmoney', 'card', app.formData('topupTxn'));
            }

        });

        // send 
        $('#btn-topup-use-savecard').on('click', function(e) {
            e.preventDefault();
            var keycode = $('input[name=topup-choose-card]:checked').val();
            app.processSavedCard('addmoney', keycode, app.formData('topupTxn'));
        });

        // // switch to where user can save their card info when they click on add card
        // $('#btn-topup-addcard').on('click', function(e) {
        //     e.preventDefault();
        //     topup.switchSection('bank-transfer-card-info-topup');
        // });

        // //accept certain pattern when input
        // Payment.restrictNumeric(document.querySelector('[data-numeric]'));
        // Payment.formatCardNumber(document.querySelector('.cc-number-topup'));
        // //Payment.formatCardExpiry(document.querySelector('.cc-exp'));
        // Payment.formatCardCVC(document.querySelector('.cc-cvc-topup'));
        // // var cardType = Payment.fns.cardType(_this.J.val(_this.number));


        // //card number validation when user are entering info
        // $('#card-topup').keyup(function() {
        //     //once the card status / validity has been clearified jump to the next tab
        //     if (Payment.fns.validateCardNumber(Payment.J.val(document.querySelector('.cc-number')))) {
        //         //jump to the next tab if its valid input
        //         $('#card_expiry-topup').focus();
        //     }
        // });

        // //card expiry validation on user input
        // $('#card_expiry-topup').keyup(function() {
        //     var value = $(this).val();
        //     var length = $(this).val().length;

        //     if (length == 1) {
        //         if (value > 1) {
        //             $(this).val('0' + value + ' / ');
        //         }
        //     }

        //     if (length == 2) {
        //         $(this).val(value + ' / ');
        //     }

        //     if (length == 3 || length == 4 || length == 5) {
        //         $(this).val(value.substr(0, 2));
        //     }

        //     //jump to the next tab if its valid input
        //     if (length == 7) {
        //         $('input[name="card-cvv-topup"]').focus();
        //     }
        // });

        // //card cvv validation on user input
        // $('#cvv-topup').keyup(function() {
        //     var length = $(this).val().length;
        //     if (length == 3) {
        //         $('input[name="card-pin-topup"]').focus();
        //     }
        // });

        //  //validates Card Info/Details
        // $('#validate-cardInfo-topup').on('click', function(e) {
        //     e.preventDefault();
            
        //     if ($("#card-topup").val() == ''){
        //         return app.alert('Error', 'Kindly Enter a Valid Card Number.', 'error');
        //     }else if ($("#card_expiry-topup").val() == ''){
        //         return app.alert('Error', 'Kindly Enter a Valid Card Expiry Number.', 'error');
        //     }else if ($("#cvv-topup").val() == ''){
        //         return app.alert('Error', 'Kindly Enter a Valid Card CVV.', 'error');
        //     }else if ($("#card-pin-topup").val() == ''){
        //         return app.alert('Error', 'Kindly Enter your Card PIN', 'error');
        //     }else{
        //         $(this).text("Loading...");
        //         var cardInfo = app.formData('card_info-topup');
        //         app.processCardInfo('topup', cardInfo, app.formData('topupTxn'));
        //     }

        // });


        // $('#validate-OTP-topup').on('click', function(e) {
        //     e.preventDefault();
        //     $(this).text("Loading...");

        //     var userOTP = $('#OTP-topup').val();
        //     var txnRef = topup.txnRef;
        //     topup.processOTP(txnRef, userOTP, app.formData('topupTxn'));
        // });

    },
    process: function(e) {
        var input = app.input("topupTxn")
        if (topup.validateAmount(input.amount.value)) {
        	topup.switchSection('topup-card-method')
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
    switchSection: function(section) {
        //hide all the section 
        $('.sections-topup').hide();
        //enable the active section  
        $('#section-' + section).show();
        topup.backStack.push(section);
    },

    goBack: function(){
        topup.backStack.pop();
        var last =  topup.backStack[topup.backStack.length - 1];
        $('.sections-topup').hide();
        $('#section-' + last).show();
    },
    
    init: function() {
        topup.switchSection('topup');
        $('#topupTxn')[0].reset();        
    }
}
topup.start();