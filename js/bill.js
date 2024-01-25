var bill = {
    isLive: app.isLiveApp,
    txn: null,
    txnRef: null,
    backStack:[],

    start: function() {
        //check if a previous transaction exits and active the user account for it.
        //app.start();
        bill.switchSection('pay-bills');

        //checks which payment method is choosen (Interswitch or saved cards)
        //makes sure user signs in before user proceed to see list of saved cards
        $('#btn-bills-card-method').on('click', function(e) {
            e.preventDefault();

            if (app.element('billSaveCard').checked){
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
                                        <label for="bill_card_id_`+ count +`">
                                            <input type="radio" class="option-input radio" value="`+ value.keycode +`" name="bill-choose-card" id="bill_card_id_`+ count +`" data-info=''>
                                        </label>
                                    </td>
                                    <td>
                                    <label for="bill_card_id_`+ count +`">
                                        <img src="`+ img +`" style="width: 50px;" />
                                    </label>
                                    </td>
                                    <td class="text-black">
                                        <label for="bill_card_id_`+ count +`">
                                            <small class="bold">`+ value.maskcard +`<span id="cardMark`+ count +`"></span><br><span id="billbankName`+ count +`" style="display: none"></span></small>
                                        </label>
                                    </td>
                                </tr> `;
                                count++;
                            })
                        }

                        $('#listSavedCardsOnBills').html(temp);

                        //enable the disabled proceed button, if one of the saved card is chosen
                        $("input[name=bill-choose-card]:radio").change(function () {
                            $('#btn-bill-use-savecard').show();       
                        });
                    });
                    bill.switchSection('bills-view-cards');
                }else{
                    app.SignIn(function() {
                        bill.switchSection('bills-view-cards');
                    });
                }
            }else{
                //send to an endpoint
                return app.pay('bill', 'card', bill.txn);
            }

        });

        // send 
        $('#btn-bill-use-savecard').on('click', function(e) {
            e.preventDefault();
            var keycode = $('input[name=bill-choose-card]:checked').val();
            app.processSavedCard('bill', keycode, JSON.stringify(bill.txn), function(){
                $('#paybills').modal('hide');
            });
        });

        // // switch to where user can save their card info when they click on add card
        // $('#btn-bill-addcard').on('click', function(e) {
        //     e.preventDefault();
        //     bill.switchSection('bank-transfer-card-info-bill');
        // });

        // //accept certain pattern when input
        // Payment.restrictNumeric(document.querySelector('[data-numeric]'));
        // Payment.formatCardNumber(document.querySelector('.cc-number'));
        // //Payment.formatCardExpiry(document.querySelector('.cc-exp'));
        // Payment.formatCardCVC(document.querySelector('.cc-cvc'));
        // // var cardType = Payment.fns.cardType(_this.J.val(_this.number));


        // //card number validation when user are entering info
        // $('#card-bill').keyup(function() {
        //     //once the card status / validity has been clearified jump to the next tab
        //     if (Payment.fns.validateCardNumber(Payment.J.val(document.querySelector('.cc-number')))) {
        //         //jump to the next tab if its valid input
        //         $('#card_expiry-bill').focus();
        //     }
        // });

        // //card expiry validation on user input
        // $('#card_expiry-bill').keyup(function() {
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
        //         $('input[name="card-cvv-bill"]').focus();
        //     }
        // });

        // //card cvv validation on user input
        // $('#cvv-bill').keyup(function() {
        //     var length = $(this).val().length;
        //     if (length == 3) {
        //         $('input[name="card-pin-bill"]').focus();
        //     }
        // });

        //  //validates Card Info/Details
        // $('#validate-cardInfo-bill').on('click', function(e) {
        //     e.preventDefault();
            
        //     if ($("#card-bill").val() == ''){
        //         return app.alert('Error', 'Kindly Enter a Valid Card Number.', 'error');
        //     }else if ($("#card_expiry-bill").val() == ''){
        //         return app.alert('Error', 'Kindly Enter a Valid Card Expiry Number.', 'error');
        //     }else if ($("#cvv-bill").val() == ''){
        //         return app.alert('Error', 'Kindly Enter a Valid Card CVV.', 'error');
        //     }else if ($("#card-pin-bill").val() == ''){
        //         return app.alert('Error', 'Kindly Enter your Card PIN', 'error');
        //     }else{
        //         $(this).text("Loading...");
        //         var cardInfo = app.formData('card_info-bill');
        //         app.processCardInfo('bill', cardInfo, JSON.stringify(bill.txn));
        //     }

        // });

        // $('#validate-OTP-bill').on('click', function(e) {
        //     e.preventDefault();
        //     $(this).text("Loading...");

        //     var userOTP = $('#OTP-bill').val();
        //     var txnRef = bill.txnRef;
        //     bill.processOTP(txnRef, userOTP, bill.txn);
        // });


        app.hasBillStarted = true;

        //display images for each of the bills
        var billers = '',
            billerImage = '',
            count = 0,
            defaultBiller = null;

        data.bills.forEach(function(element) {
            //save the 

            if (count == 0) {
                defaultBiller = count;
            }

            billers += '<option data-biller-id="' + element.id + '" value="' + count + '">' + element.name + '</option>';

            billerImage += '<a href="javascript:;" data-target="#paybills" data-keyboard="false" data-backdrop="static" data-toggle="modal" data-id="' + element.id + '" data-bill-id="' + count + '" data-whatever="' + element.name + '"><img id="img-biller-id-' + element.id + '" src="https://bills.payit.ng/storage/' + element.logo + '" alt="' + element.name + '" data-biller-id="' + element.id + '" class="bills img-fluid" onclick="bill.init()"/></a>';
            count += 1;
        }, this);

        app.element('billers').innerHTML = billers;

        app.element('bImageContainer').innerHTML = billerImage;


        //bills slider
        $(".bills-slider").slick({
            infinite: true,
            dots: true,
            autoplay: false,
            arrows: false,
            slidesPerRow: 3,
            rows: 5,
            lazyLoad: 'ondemand',
            autoplaySpeed: 1000
        });

        //choose the biller item and activate it for the loading page
        bill.setBillItem(defaultBiller);



        //process the user transaction when they are ready.
        document.getElementById("submitBill").addEventListener("click", function(event) {
            event.preventDefault()

            //start the process of committing the transaction to the server.
            bill.process();
        });


        //also activate button click using delegate 
        //because the were created on the fly
        $(document).on("change", "#billers", function(obj) {

            var input = this.value;

            bill.setBillItem(input);
        });

        //also activate button click using delegate 
        //because the were created on the fly
        $(document).on("change", "#biller_items", function(obj) {
            var input = this.value;

            bill.setBillAmount();
        });


        $(document).on("change keyup keydown", "#amount", function(obj) {
            var amount = app.input('billTxn').amount.value;

            if (amount == '') {
                bill.calTotal(true);
            } else {
                bill.calTotal(false, amount);
            }
        });
    },

    setBillItem: function(biller_id) {
        //set up the data of the biller
        var item = data.type[biller_id],
            biller_items = '',
            count = 0;

        $.each(item, function(key, value) {
            //console.log("Key " + key + " Value: " + JSON.stringify(value));
            //item will run onces get its own array loop.
            value.forEach(function(element) {
                //save the 
                biller_items += '<option data-biller-id="' + biller_id + '"  data-item-id="' + element.id + '" data-resource="' + element.resource_from + '" data-amount="' + element.amount + '" data-key="' + element.keycode + '" value="' + count + '">' + element.name + '</option>';
                count += 1;
            }, this);
        });

        app.element('biller_items').innerHTML = biller_items;

        //use the biller_id to pull the information of the smartcard number
        app.input('billTxn').custID.placeholder = data.bills[biller_id].reference;

        //setBillAmount
        bill.setBillAmount();
    },

    setBillAmount: function() {
        var amount = bill.getBillAmount(),
            amountInput = app.input('billTxn').amount;

        //don't change anything if the amount is not set.
        if (amount == 0) {
            //clear the user details and also enable the input field.

            //set the amount the user is supposed to enter
            amountInput.value = '';

            //enable it
            amountInput.disabled = false;

            //hide the total value for the moment
            bill.calTotal(true);
        } else {
            //set the amount the user is supposed to enter
            amountInput.value = amount;

            //disable the input form from been populated
            amountInput.disabled = true;

            //set the total amount for the user to see.
            bill.calTotal();
        }

    },

    getBillAmount: function() {
        //pull the amount of the current bill
        if ($("#biller_items option:selected").attr("data-amount") == 0) {
            return 0;
        } else {
            return $("#biller_items option:selected").attr("data-amount");
        }

    },

    calTotal: function(hide, amount) {
        //get the amount of the bill and add the charges 
        var total = 0,
            charges = 100;

        if (amount) {
            total = parseInt(amount) + charges;
            totalCharges = ((parseInt(amount) + charges) * 0.015);
        } else {
            total = parseInt(bill.getBillAmount()) + charges;
            totalCharges = ((parseInt(bill.getBillAmount()) + charges) * 0.015);
        }


        //display the output of the total as well
        app.element('total').innerHTML = app.numberFormat(total);
        app.element('totalCharges').innerHTML = app.numberFormat(totalCharges);


        if (hide) {
            $('#totalP').hide();
            $('#cardCharges').hide()
        } else {
            $('#totalP').show();
            $('#cardCharges').show();
        }

        $('input[type=radio][name=paymentMethod]').change(function() {
            if (this.value == 'wallet') {
                $('#cardCharges').hide()
            } else if (this.value == 'card') {
                $('#cardCharges').show()
            }
        });

        return total;

    },

    getCustomerName: function() {
        var key = $("#biller_items option:selected").attr("data-key"),
            resource = $("#biller_items option:selected").attr("data-resource"),
            custId = app.input('billTxn').custID.value,
            customerName = app.element('customer_name');


        //show that the loader to indicate it is pulling data from the server.
        customerName.innerHTML = 'Loading ...'; // app.element('spinner').innerHTML;

        //connect to the server and get their username
        $.post(app.API + '/customer/name', {
            'key': key,
            'custId': custId,
            'resource': resource
        })
            .done(function(data) {

            if (data.status == 200) {
                //show the username that was been prsented by the server.
                customerName.innerHTML = data.custName;
                customerName.classList.remove("error");

            } else if (data.status == 300) {
                //show a warning message to the user instead.
                customerName.innerHTML = data.msg;
                customerName.classList.add("error");

            } else if (data.status == 400) {
                app.alert(
                data.title,
                data.msg, 'error')
            } else {
                /*app.alert(
                        'Oops..',
                        'Something went wrong!',
                        'error'
                    )*/
            }

        })
            .fail(function(data) {
            //app.alert('Oops...', 'Something went wrong!', 'error');
        })
    },

    process: function(e) {
        var input = app.input("billTxn"),
            guess = true;

        if (bill.validateAmount(input.amount.value) && bill.validateCustID(input.custID.value) && bill.validateEmail(input.email.value) && bill.validatePhone(input.phone.value)) {
            //generate the data to send to the server
            var data = {
                'item_id': $("#biller_items option:selected").attr("data-item-id"),
                'key': $("#biller_items option:selected").attr("data-key"),
                'custId': JSON.parse(app.formData('billTxn')).custID,
                'amount': JSON.parse(app.formData('billTxn')).amount,
                'email': JSON.parse(app.formData('billTxn')).email,
                'phone': JSON.parse(app.formData('billTxn')).phone
            };
            //update bill txn
            bill.txn = data;
            //determine payment method
            if (app.element('walletPayment').checked) {
                app.SignIn(function() {
                    app.pay('bill', 'wallet', data);
                });
            } else {
                bill.switchSection('bills-card-method');

            }

        } else {
            //check and return valid errors for each of the inputs.
            if (!bill.validateCustID(input.custID.value)) {
                return app.alert('Error', 'Kindly Enter a Valid ' + app.input('billTxn').custID.getAttribute("placeholder") + '.', 'error');
            } else if (!bill.validateAmount(input.amount.value)) {
                return app.alert('Error', 'Kindly enter a valid amount.', 'error');
            } else if (!bill.validateEmail(input.email.value)) {
                return app.alert('Error', 'Kindly enter a valid email.', 'error');
            } else if (!bill.validatePhone(input.phone.value)) {
                return app.alert('Error', 'Kindly enter a valid phone number.', 'error');
            }

        }

    },

    switchSection: function(section) {
        //hide all the section 
        $('.sections-bill').hide();
        //enable the active section  
        $('#section-' + section).show();
        bill.backStack.push(section);
    },

    goBack: function(){
        bill.backStack.pop();
        var last =  bill.backStack[bill.backStack.length - 1];
        $('.sections-bill').hide();
        $('#section-' + last).show();
    },

    init: function() {
        bill.switchSection('pay-bills');
        bill.txn = null;
        // bill.txnRef = null;
        $('#billTxn')[0].reset();

    },

    validateCustID: function(custId) {
        if (custId == '') {
            return false
        } else {
            return true;
        }
    },

    validateEmail: function(email) {
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if ((email == '') || (!filter.test(email))) {
            return false
        } else {
            return true;
        }
    },

    validatePhone: function(phone) {
        var filterPhone = /^\d{4}\d{3}\d{4}$/;

        if ((phone == '') || (!filterPhone.test(phone))) {
            return false
        } else {
            return true;
        }
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

//     function run() {
//         bill.start();
//     }
// window.onload = run;