var airtime = {
    isLive: app.isLiveApp,
    txnRef: null,
    backStack:[],

    start: function() {
        app.element('number').focus();
        document.getElementById("submitAirtime").addEventListener("click", function(event) {
            event.preventDefault()
            airtime.process();
        });


        //checks which payment method is choosen (Interswitch or saved cards)
        //makes sure user signs in before user proceed to see list of saved cards
        $('#btn-airtime-card-method').on('click', function(e) {
            e.preventDefault();

            if (app.element('airtimeSaveCard').checked){
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

                        $('#listSavedCardsOnAirtime').html(temp);

                        //enable the disabled proceed button, if one of the saved card is chosen
                        $("input[name=airtime-choose-card]:radio").change(function () {
                            $('#btn-airtime-use-savecard').show();       
                        });
                    });
                    airtime.switchSection('airtime-view-cards');
                }else{
                    app.SignIn(function() {
                        airtime.switchSection('airtime-view-cards');
                    });
                }
            }else{
                //send to an endpoint
                return app.pay('airtime', 'card', app.formData('airtimeTxn'));
            }

        });

        // send 
        $('#btn-airtime-use-savecard').on('click', function(e) {
            e.preventDefault();
            var keycode = $('input[name=airtime-choose-card]:checked').val();
            app.processSavedCard('airtime', keycode, app.formData('airtimeTxn'), function(){
                $('#payairtime').modal('hide');
            });
        });

        // switch to where user can save their card info when they click on add card
        // $('#btn-airtime-addcard').on('click', function(e) {
        //     e.preventDefault();
        //     airtime.switchSection('bank-transfer-card-info-airtime');
        // });

        // //accept certain pattern when input
        // Payment.restrictNumeric(document.querySelector('[data-numeric]'));
        // Payment.formatCardNumber(document.querySelector('.cc-number-airtime'));
        // //Payment.formatCardExpiry(document.querySelector('.cc-exp'));
        // Payment.formatCardCVC(document.querySelector('.cc-cvc-airtime'));
        // // var cardType = Payment.fns.cardType(_this.J.val(_this.number));


        // //card number validation when user are entering info
        // $('#card-airtime').keyup(function() {
        //     //once the card status / validity has been clearified jump to the next tab
        //     if (Payment.fns.validateCardNumber(Payment.J.val(document.querySelector('.cc-number-airtime')))) {
        //         //jump to the next tab if its valid input
        //         $('#card_expiry-airtime').focus();
        //     }
        // });

        // //card expiry validation on user input
        // $('#card_expiry-airtime').keyup(function() {
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
        //         $('input[name="card-cvv-airtime"]').focus();
        //     }
        // });

        // //card cvv validation on user input
        // $('#cvv-airtime').keyup(function() {
        //     var length = $(this).val().length;
        //     if (length == 3) {
        //         $('input[name="card-pin-airtime"]').focus();
        //     }
        // });

        //  //validates Card Info/Details
        // $('#validate-cardInfo-airtime').on('click', function(e) {
        //     e.preventDefault();
            
        //     if ($("#card-airtime").val() == ''){
        //         return app.alert('Error', 'Kindly Enter a Valid Card Number.', 'error');
        //     }else if ($("#card_expiry-airtime").val() == ''){
        //         return app.alert('Error', 'Kindly Enter a Valid Card Expiry Number.', 'error');
        //     }else if ($("#cvv-airtime").val() == ''){
        //         return app.alert('Error', 'Kindly Enter a Valid Card CVV.', 'error');
        //     }else if ($("#card-pin-airtime").val() == ''){
        //         return app.alert('Error', 'Kindly Enter your Card PIN', 'error');
        //     }else{
        //         $(this).text("Loading...");
        //         var cardInfo = app.formData('card_info-airtime');
        //         app.processCardInfo('airtime', cardInfo, app.formData('airtimeTxn'));
        //     }

        // });


        // $('#validate-OTP-airtime').on('click', function(e) {
        //     e.preventDefault();
        //     $(this).text("Loading...");

        //     var userOTP = $('#OTP-airtime').val();
        //     var txnRef = airtime.txnRef;
        //     airtime.processOTP(txnRef, userOTP, app.formData('airtimeTxn'));
        // });
    },
    setNetwork: function(network) {
        app.element("network").value = network;
        var networks = ["ATL", "ETI", "GLO", "MTN"];
        for (var i = 0; i < networks.length; i++) {
            if (networks[i] == network) {
                app.element("at" + networks[i]).className = (networks[i] == "MTN") ? "network end selected" : "network selected";
            } else {
                app.element("at" + networks[i]).className = (networks[i] == "MTN") ? "network end" : "network";
            }
        }
    },
    guessNetwork: function(phone) {
        if (phone == "") return "";
        prefix = phone.substring(0, 4);
        var networks = {
            "0703": "MTN",
            "0706": "MTN",
            "0803": "MTN",
            "0806": "MTN",
            "0810": "MTN",
            "0813": "MTN",
            "0814": "MTN",
            "0816": "MTN",
            "0903": "MTN",
            "0701": "ATL",
            "0708": "ATL",
            "0802": "ATL",
            "0808": "ATL",
            "0812": "ATL",
            "0902": "ATL",
            "0705": "GLO",
            "0805": "GLO",
            "0807": "GLO",
            "0811": "GLO",
            "0815": "GLO",
            "0905": "GLO",
            "0809": "ETI",
            "0815": "ETI",
            "0817": "ETI",
            "0818": "ETI",
            "0908": "ETI",
            "0909": "ETI"
        };
        var network = networks[prefix];
        if (!network) return "";
        else return network;
    },
    process: function(e) {
        var input = app.input("airtimeTxn"),
            guess = true;
        if (airtime.validateAmount(input.amount.value) && app.validatePhone(input.number.value)) {
            var networks = document.getElementsByClassName("network");
            for (var i = 0; i < networks.length; i++) {
                if (networks[i].className.indexOf('selected') != '-1') {
                    guess = false;
                }
            }
            if (guess) {
                airtime.setNetwork(airtime.guessNetwork(input.number.value));
            }
            if (app.element('walletPayment2').checked) {
                if (app.isLoggedIn) {
                    app.pay('airtime', 'wallet', app.formData('airtimeTxn'));
                } else {
                    app.SignIn(function() {
                        app.pay('airtime', 'wallet', app.formData('airtimeTxn'));
                    });
                }
            } else if (app.element('cardPayment2').checked) {
                // app.pay('airtime', 'card', app.formData('airtimeTxn'));
                airtime.switchSection('airtime-card-method');
            }
        } else {
            if (!app.validatePhone(input.number.value)) {
                return app.alert('Error', 'Kindly enter a valid phone number.', 'error');
            } else if (!airtime.validateAmount(input.amount.value)) {
                return app.alert('Error', 'Kindly enter a valid amount.', 'error');
            }
        }
    },
    clickNetwork: function(networkId) {
        if (networkId == "MTN") {
            airtime.setNetwork(networkId);
        } else if (networkId == "GLO") {
            airtime.setNetwork(networkId)
        } else if (networkId == "ATL") {
            airtime.setNetwork(networkId)
        } else if (networkId == "ETI") {
            airtime.setNetwork(networkId)
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
        $('.sections-airtime').hide();
        //enable the active section  
        $('#section-' + section).show();
        airtime.backStack.push(section);
    },

    goBack: function(){
        airtime.backStack.pop();
        var last =  airtime.backStack[airtime.backStack.length - 1];
        $('.sections-airtime').hide();
        $('#section-' + last).show();
    },

    processOTP: function(txnRef, otp, txn) {
        var data = {
            txnRef: txnRef,
            otp: otp,
            txn: txn
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
    init: function() {
        airtime.switchSection('airtime');
        $('#airtimeTxn')[0].reset();
        airtime.txnRef = null;        
    }
}
airtime.start();