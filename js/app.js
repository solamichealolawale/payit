var app = {
    isLiveApp: true,
    API: 'https://bills.payit.ng',
    db: TAFFY(),
    isLoggedIn: false,
    banks: null,
    hasBillStarted: false,
    start: function() {
        //connect to the server and get the settings that is available for each each of the transactions,
        // should be configurable from the other settings on the  billers.
        app.db.store("DB");
        app.db.settings({
            name: "DB"
        });

        //determine if the user has logged into the system        
        if (app.db().select("status") == 'Active') {
            app.isLoggedIn = true;
            app.loginState();

            //update the balance sliently on page load
            $.post(app.API + '/web/balance', {
                'user': app.db().select("id")
            })
            .done(function(data) {
                //set and update the balance
                if (data.status == 200) {
                    app.setBalance(data.balance);
                    app.updateBalance();
                }
            });
        }

        
        //check the state of banksData and render its value when in localStroage
        var banksData =  JSON.parse(localStorage.getItem('banksData'));
        
        if(banksData != null){
            //update the list with bank data
            options = "";
            $.each(banksData, function(index, value) {
                options += "<option value='" +index+"'>"+value+"</option>";
            });

            $('#bank-lists').html(options);    
        }

        //pull the bank resources from the server
        $.get(app.API + '/web/transfer/account/banks', {
            
        })
        .done(function(data) {
            //make the list of banks available to process from other where its needed
            if(data.status == 200){

                try{
                    if(data.banks != false){
                        banks = JSON.parse(data.banks);
                        localStorage.setItem('banksData', data.banks);
                    }
                }catch(e){
                    banks = null;
                }

                //update the list with bank data
                options = "";
                $.each(banks, function(index, value) {
                    options += "<option value='" +index+"'>"+value+"</option>";
                });

                $('#bank-lists').html(options);
            }
        });

        $.each(app.db().select("status"), function(index, value) {
            if (value == 'Active') {
                app.isLoggedIn = true;
                app.loginState();
            }
        });

        //also activate button click using delegate 
        //because the were created on the fly
        $(document).on("click", ".btn-pin", function(obj) {
            var input = this.innerHTML;
            if (input == 'Del') {
                //remove the last digit
                app.pinPad(this.innerHTML, true);
            } else if (input == 'Clr') {
                app.pinPad(this.innerHTML, true, true);
            } else {
                app.pinPad(this.innerHTML);
            }

        });

        //enable headers for all ajax request 
        $.ajaxSetup({
            headers: {
                // 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

    },

    loginState: function() {
        app.isLoggedIn = true;

        app.updateBalance();

        // $('#logout').removeClass('hide');
        $('#logoutAirtime').removeClass('hide');
        $('#logoutTopup').removeClass('hide');
        $('#logoutSendMoney').removeClass('hide');

        //app.element("signIn").textContent = "Logout"
        //$("#signIn").attr('id','signOut');

        $('#signIn,#signUp,#getStarted').hide();
        $('#signOut,#balanceCon,#cog').show();
    },

    logoutState: function() {
        app.isLoggedIn = false;

        // $("#logout").addClass('hide');
        $("#logoutAirtime").addClass('hide');
        $('#logoutTopup').addClass('hide');
        $('#logoutSendMoney').addClass('hide')

        //app.element("signOut").textContent = "LogIn"
        //$("#signIn").attr('id','signOut');

        $('#signIn,#signUp,#getStarted').show();
        $('#signOut,#balanceCon,#cog').hide();
    },

    Signout: function() {
        //clear all the user data
        app.db().remove();

        //call the logout state
        app.logoutState();
    },

    SignIn: function(callback = false, callback_arg) {
        setTimeout(function() {

            if (app.isLoggedIn) {
                //the user is logged into the app cannot log in twice.
                //change the state to log in
                app.loginState();

                //start callback after it has been resolved.
                return app.callback(callback);
            }

            swal({
                title: '',
                type: '',
                html: '<div class="mb-2"><img src="images/payit.png" class="img-fluid"></div> <h1>Login </h1>' + '<form class="mt-4">' + '<div class="form-group">' + '<input type="text" placeholder="Email or Phone Number" class="form-control" id="user" name="user" autocomplete="off" required="" ); cursor: auto;">' + '</div>' + '<div class="form-group">' + '<input type="password" placeholder="Password" class="form-control" id="password" name="password" autocomplete="off" required=""; cursor: auto;">' + '<a href="javascript:void(0)" class="mt-3 link" onclick="app.ResetPassword()">Forgot Password</a>' + '</form>' + '</div>',
                //padding: 100,
                showCloseButton: true,
                showCancelButton: true,
                confirmButtonColor: '#ff497c',
                cancelButtonColor: '#E64270',
                confirmButtonText: 'Login',
                cancelButtonText: 'Create Account',
                //confirmButtonClass: 'btn btn-primary',
                //confirmButtonClass: 'btn btn-danger',
                showLoaderOnConfirm: true,
                preConfirm: function() {
                    return new Promise(function(resolve) {

                        $.post(app.API + '/login', {
                                'user': app.value('user'),
                                'password': app.value('password')
                            })
                            .done(function(data) {
                                app.db().remove();

                                if (data.status == 200) {
                                    //clear the database and store with new details
                                    app.db().remove();
                                    //save the user details
                                    app.db.insert(data.info);

                                    resolve(data)

                                    return true;
                                } else if (data.status == 300) {
                                    app.alert(
                                        data.title,
                                        data.msg, 'error')
                                } else if (data.status == 400) {
                                    app.alert(
                                        data.title,
                                        data.msg, 'error')
                                }

                            })
                            .fail(function(data) {
                                app.alert('Oops...', 'Something went wrong!', 'error');
                            })
                    })
                },
                onOpen: function() {
                    app.element('user').focus();
                },
                allowOutsideClick: false
            }).then(function(result) {
                //change the state to log in
                app.loginState();

                //start callback after it has been resolved.
                app.callback(callback);
            }, function(dismiss) {
                if (dismiss === 'cancel') {
                    //open the sign up popup
                    app.SignUp();
                }
            })
        }, 250);

    },

    SignUp: function(callback = false, callback_arg) {
        setTimeout(function() {

            if (app.isLoggedIn) {
                //the user is logged into the app cannot log in twice.
                //change the state to log in
                app.loginState();

                //start callback after it has been resolved.
                return app.callback(callback);
            }

            swal({
                title: '',
                type: '',
                html: '<div class="mb-2"><img src="images/payit.png" class="img-fluid"></div> <h1>Create Account</h1> ' + '<form class="mt-4">' + '<div class="form-group">' + '<input type="text" placeholder="First Name" class="form-control" id="firstname" name="firstname" autocomplete="off" required="" ); cursor: auto;">' + '</div>' + '<div class="form-group">' + '<input type="text" placeholder="Last Name" class="form-control" id="lastname" name="lastname" autocomplete="off" required="" ); cursor: auto;">' + '</div>' + '<div class="form-group">' + '<input type="text" placeholder="Email" class="form-control" id="email" name="email" autocomplete="off" required="" ); cursor: auto;">' + '</div>' + '<div class="form-group">' + '<input type="text" placeholder="Phone Number" class="form-control" id="phone" name="phone" autocomplete="off" required="" ); cursor: auto;">' + '</div>' + '<div class="form-group">' + '<input type="password" placeholder="Password" class="form-control" id="password" name="password" autocomplete="off" required="" ); cursor: auto;">' + '</div>' + '<div class="form-group">' + '<input type="password" placeholder="Confirm Password" class="form-control" id="cpassword" name="cpassword" autocomplete="off" required="" ); cursor: auto;">' + '</div>' + '<div class="form-group">' + '<input type="text" placeholder="(Optional) Referral Code" class="form-control" id="rcode" name="rcode" autocomplete="off" required="" ); cursor: auto;">' + '</div>' + '</form>',
                //padding: 100,
                showCloseButton: true,
                showCancelButton: true,
                confirmButtonColor: '#ff497c',
                cancelButtonColor: '#E64270',
                confirmButtonText: 'Create',
                cancelButtonText: 'Login',
                //confirmButtonClass: 'btn btn-primary',
                //confirmButtonClass: 'btn btn-danger',
                showLoaderOnConfirm: true,
                preConfirm: function() {
                    return new Promise(function(resolve, reject) {

                        //validate the user input at this point
                        if (!validate.validateText(app.value('firstname'))) {
                            return reject('Enter a Valid First Name')
                        } else if (!validate.validateText(app.value('lastname'))) {
                            return reject('Enter a Valid Last Name')
                        } else if (!validate.validateEmail(app.value('email'))) {
                            return reject('Enter a valid Email Address')
                        } else if (!validate.validatePhonenumber(app.value('phone'))) {
                            return reject('Enter a Valid Phone Number')
                        } else if (!validate.validatePassword(app.value('password'))) {
                            return reject('Enter a Valid Password')
                        } else if (!validate.validateConfirmation(app.value('password'), app.value('cpassword'))) {
                            return reject('Enter Matching Password')
                        }

                        $.post(app.API + '/create', {
                                'firstname': app.value('firstname'),
                                'lastname': app.value('lastname'),
                                'email': app.value('email'),
                                'phone': app.value('phone'),
                                'password': app.value('password'),
                                'cpassword': app.value('cpassword'),
                                'referral': app.value('rcode'),
                            })
                            .done(function(data) {

                                if (data.status == 200) {
                                    //clear the database and store with new details
                                    app.db().remove();

                                    //save the user details
                                    app.db.insert(data.info);

                                    resolve(data)
                                } else if (data.status == 300) {
                                    app.alert(
                                        data.title,
                                        data.msg, 'error')
                                } else if (data.status == 400) {
                                    app.alert(
                                        data.title,
                                        data.msg, 'error')
                                }

                            })
                            .fail(function(data) {
                                app.alert('Oops...', 'Something went wrong!', 'error');
                            })
                    })
                },
                onOpen: function() {
                    app.element('user').focus();
                },
                allowOutsideClick: false
            }).then(function(result) {
                //change the state to log in
                //ask the user to setup pin
                /*
                app.loginState();

                //start callback after it has been resolved.
                app.callback(callback);
                */
                swal({
                    title: '',
                    type: '',
                    html: '<form> ' + '<h1>Set 4 Digit PIN</h1>' + '<div class="form-group">' + '<input type="text" placeholder="Enter 4 Digit PIN" class="form-control" id="pin" name="pin" autocomplete="off" required="" ); cursor: auto;">' + '</div>' + '' + '</form>',
                    //padding: 100,
                    showCloseButton: true,
                    showCancelButton: false,
                    confirmButtonColor: '#ff497c',
                    cancelButtonColor: '#E64270',
                    confirmButtonText: 'Set PIN',
                    cancelButtonText: 'Create Account',
                    //confirmButtonClass: 'btn btn-primary',
                    //confirmButtonClass: 'btn btn-danger',
                    showLoaderOnConfirm: true,
                    preConfirm: function() {
                        return new Promise(function(resolve) {

                            $.post(app.API + '/setpin', {
                                    'pin': app.value('pin'),
                                    'email': app.db().select("email")
                                })
                                .done(function(data) {

                                    if (data.status == 200) {
                                        //clear the database and store with new details
                                        app.db().remove();

                                        //save the user details
                                        app.db.insert(data.info);

                                        resolve(data)
                                    } else if (data.status == 300) {
                                        app.alert(
                                            data.title,
                                            data.msg, 'error')
                                    } else if (data.status == 400) {
                                        app.alert(
                                            data.title,
                                            data.msg, 'error')
                                    }

                                })
                                .fail(function(data) {
                                    app.alert('Oops...', 'Something went wrong!', 'error');
                                })
                        })
                    },
                    onOpen: function() {
                        // app.element('user').focus();
                    },
                    allowOutsideClick: false
                }).then(function(result) {
                    //change the state to log in
                    app.loginState();

                    //start callback after it has been resolved.
                    app.callback(callback);
                })

            }, function(dismiss) {
                if (dismiss === 'cancel') {
                    //open the sign up popup
                    app.SignIn();
                }
            })
        }, 250);

    },

    ResetPassword: function(callback = false, callback_arg) {
        setTimeout(function() {

            if (app.isLoggedIn) {
                //the user is logged into the app cannot log in twice.
                //change the state to log in
                app.loginState();

                //start callback after it has been resolved.
                return app.callback(callback);
            }

            swal({
                title: '',
                type: '',
                html: '<h1>Reset Password</h1> ' + '<form class="mt-3">' + '<div class="form-group">' + '<input type="text" placeholder="Email Address" class="form-control" id="email" name="email" autocomplete="off" required="" ); cursor: auto;">' + '</div>' + '<div class="text-center"><a href="javascript:void(0)" class="link" onclick="app.SignIn()">Login</a> | ' + '<a href="javascript:void(0)" class="link" onclick="app.SignUp()">Create Account</a></div>' + '' + '</form>',
                //padding: 100,
                showCloseButton: true,
                showCancelButton: false,
                confirmButtonColor: '#ff497c',
                cancelButtonColor: '#E64270',
                confirmButtonText: 'Reset Password',
                cancelButtonText: 'Create Account',
                //confirmButtonClass: 'btn btn-primary',
                //confirmButtonClass: 'btn btn-danger',
                showLoaderOnConfirm: true,
                preConfirm: function() {
                    return new Promise(function(resolve) {

                        $.post(app.API + '/reset', {
                                'email': app.value('email')
                            })
                            .done(function(data) {

                                if (data.status == 200) {
                                    //clear the database and store with new details
                                    app.db().remove();

                                    //save the user details
                                    app.db.insert(data.info);

                                    resolve(data)
                                } else if (data.status == 300) {
                                    app.alert(
                                        data.title,
                                        data.msg, 'error')
                                } else if (data.status == 400) {
                                    app.alert(
                                        data.title,
                                        data.msg, 'error')
                                }

                            })
                            .fail(function(data) {
                                app.alert('Oops...', 'Something went wrong!', 'error');
                            })
                    })
                },
                onOpen: function() {
                    // app.element('user').focus();
                },
                allowOutsideClick: false
            }).then(function(result) {
                //change the state to log in
                app.loginState();

                //start callback after it has been resolved.
                app.callback(callback);
            })
        }, 250);

    },

    getAccountInfo: function() {

    },

    getBalance: function() {
        return app.db().select("balance");
    },

    setBalance: function(amount) {
        //update the balance of the user after each transactions
        app.db().update({
            "balance": amount
        });
    },

    updateBalance: function(animate = true, pull = false) {
        if (pull) {
            //connect to the database to pull the balance of the user and update as required.

        } else {
            if (animate) {
                // app.element('userBalance').innerHTML = app.element('spinner').innerHTML;
                // app.element('userBalanceAirtime').innerHTML = app.element('spinner').innerHTML;
                app.element('balance').innerHTML = app.element('spinner').innerHTML;
                // app.element('userBalanceTopup').innerHTML = app.element('spinner').innerHTML;
               // app.element('userBalanceSendMoney').innerHTML = app.element('spinner').innerHTML;
                setTimeout(function() {
                    // app.element('userBalance').innerHTML = app.numberFormat(app.db().select("balance"));
                    // app.element('userBalanceAirtime').innerHTML = app.numberFormat(app.db().select("balance"));
                    app.element('balance').innerHTML = app.numberFormat(app.db().select("balance"));
                    // app.element('userBalanceTopup').innerHTML = app.numberFormat(app.db().select("balance"));
                   // app.element('userBalanceSendMoney').innerHTML = app.numberFormat(app.db().select("balance"));
                }, 1000);

            } else {
                // app.element('userBalance').innerHTML = app.numberFormat(app.db().select("balance"));
                // app.element('userBalanceAirtime').innerHTML = app.numberFormat(app.db().select("balance"));
                app.element('balance').innerHTML = app.numberFormat(app.db().select("balance"));
                app.element('userBalanceTopup').innerHTML = app.numberFormat(app.db().select("balance"));
               // app.element('userBalanceSendMoney').innerHTML = app.numberFormat(app.db().select("balance"));
            }
        }
    },

    value: function(element) {
        return app.element(element).value;
    },

    formData: function(name) {

        var form = document.getElementById(name),
            data = {};

        //Extract Each Element Value and name
        for (var i = 0; i < form.elements.length; i++) {
            if (form.elements[i].name != '') {
                data[form.elements[i].name] = form.elements[i].value;
            }
        }

        return JSON.stringify(data);
    },

    clearFormData: function(name) {

    },

    input: function(form) {
        return document.forms[form].getElementsByTagName("input");
    },

    showBusy: function() {

    },

    hideBusy: function() {

    },

    alert: function(title, message, status) {
        swal(
            title,
            message,
            status)
    },

    element: function(element) {
        return document.getElementById(element);
        if (window[element]) return window[element];
        return window[element] = document.getElementById(element);
    },

    query: function(className, value) {
        var items = document.getElementsByClassName(className);
        for (var i = 0, count = items.length; i < count; i++) {
            items[i].innerHTML = value;
        }
    },

    validateAmount: function(amount) {
        if (amount == 0 || amount < 1 ) return false;
        return new RegExp('^[0-9.]+$').test(amount);
    },

    validatePhone: function(number) {
        number = number.replace(/\D/g, "");
        if (number.substr(0, 4) == "2340") number = "0" + number.substr(4);
        else if (number.substr(0, 3) == "234") number = "0" + number.substr(3);

        if (number.substr(0, 2) == "07" || number.substr(0, 2) == "08" || number.substr(0, 2) == "09") return number;
        else return false;
    },

    showAmountError: function() {
        app.alert("Invalid Amount", "Please enter a valid amount.\nÂ· Amount must be numbers only\nÂ· Amount must be more than " + localStorage.currency + " 1");
    },

    numberFormat: function(amount, currency, decimal) {
        amount = Number(amount).toFixed(2).toString();

        var x = amount.split('.');
        var x1 = x[0],
            x2 = x[1];

        if (!x2) x2 = "00";
        else if (x2.length == 1) x2 = x2 + "0";
        if (decimal) {
            //if (!x2) x2 = "00";
            x2 = "." + x2;
        } else x2 = '<span class="powerDecimals">.' + x2 + '</span>';

        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }

        if (currency) {
            currency = '<span class="currency">' + currency + '</span>';

            if (!decimal) return currency + " " + x1 + x2;
            else return currency + x1 + x2;
        } else return x1 + x2;
    },

    pay: function(txn, method, data) {
        //handles all payment method to be used on the platform.
        //get the settings that has been enabled for the each of the calling transactions.
        // console.log(data);
        //determine the method of payment the user wants to make use of
        if (method == 'wallet') {
            return app.walletPayment(txn, data);
        } else if (method == 'card') {
            if (txn == 'addmoney'){
                return app.moneyTopup(txn,data);
            }else if (txn == 'donation'){
                return app.donation(txn, data);
            }else{
                return app.cardPayment(txn, data);
            }
        } else {
            return app.alert('Error', 'Unable to determine payment method!');
        }
    },
    
    walletPayment: function(type, data) {

        //ensure the user is currently logged
        if (app.isLoggedIn) {
            //transfer the user data to the server and also wait for need responses.
            setTimeout(function() {

                swal({
                    title: '',
                    type: '',
                    html: '<form> ' + '<h3>Enter App PIN</h3>' + '' + app.getPinPad() + '</form>',
                    // padding: auto,
                    showCloseButton: true,
                    showCancelButton: true,
                    confirmButtonColor: '#ff497c',
                    cancelButtonColor: '#E64270',
                    confirmButtonText: 'Pay',
                    cancelButtonText: 'Cancel',
                    //confirmButtonClass: 'btn btn-primary',
                    //confirmButtonClass: 'btn btn-danger',
                    showLoaderOnConfirm: true,
                    preConfirm: function() {
                        return new Promise(function(resolve) {
                            var txn = {
                                'method': 'wallet',
                                'type': type,
                                'pin': Base64.encode($('.swal2-content input[type=password]').val()),
                                'data': data,
                                'payload': app.db().select("id")
                            }
                            app.transaction(txn);
                        })
                    },
                    onOpen: function() {
                        app.element('pin').focus();
                    },
                    allowOutsideClick: false

                }).then(function(result) {
                    //change the state to log in
                    //app.loginState();

                    //start callback after it has been resolved.
                    app.callback(callback);
                })


            }, 250);

        } else {
            //save the current transaction in memory so as to continue with it when the user is signed properly.
            //by loop the txn data to the user until either cancel or successful login.
            app.SignIn(function() {
                app.pay(txn, 'wallet', data);
            });
        }
    },

    cardPayment: function(type, data) {
        //collect the card details of the user if they are using cards.
        // var div = document.getElementById('formContainer');
        var strData = JSON.stringify(data);
        var url = 'https://bills.payit.ng/bills/payments/' + type;
        app.post(url, {
            data: strData
        });
    },

    processSavedCard: function(txn_name, keycode, data, callback) {

        //ensure the user is currently logged
        if (app.isLoggedIn) {
            //transfer the user data to the server and also wait for need responses.
            setTimeout(function() {

                swal({
                    title: '',
                    type: '',
                    html: '<form> ' + '<h3>Enter App PIN</h3>' + '' + app.getPinPad() + '</form>',
                    // padding: auto,
                    showCloseButton: true,
                    showCancelButton: true,
                    confirmButtonColor: '#ff497c',
                    cancelButtonColor: '#E64270',
                    confirmButtonText: 'Pay',
                    cancelButtonText: 'Cancel',
                    //confirmButtonClass: 'btn btn-primary',
                    //confirmButtonClass: 'btn btn-danger',
                    showLoaderOnConfirm: true,
                    preConfirm: function() {
                        return new Promise(function(resolve) {
                            var txn = {
                                'pin': Base64.encode($('.swal2-content input[type=password]').val()),
                                'keycode': keycode,
                                'data': data,
                                'payload': app.db().select("id"),
                                'method': 'saved_card',
                                'type': txn_name
                            }
                                                        
                            app.transaction(txn, callback);

                        })
                    },
                    onOpen: function() {
                        app.element('pin').focus();
                    },
                    allowOutsideClick: false

                }).then(function(result) {
                    //change the state to log in
                    //app.loginState();

                    //start callback after it has been resolved.
                    app.callback(callback);
                })

            }, 250);

        } else {
            //save the current transaction in memory so as to continue with it when the user is signed properly.
            //by loop the txn data to the user until either cancel or successful login.
            app.SignIn(function() {
                app.processSavedCard(type, mark, keycode, data);
            });
        }
    },

    listCards: function(userID, callback){
        $.post(app.API + '/web/list/cards', {
            'user': userID
        })

        .done(function(response) {
            //return the data
            if (response.status == 200) {
                //something will happen here
                app.callback(callback, response);
            } else {
                //display error message
                app.alert(
                response.title,
                response.msg, 'error')
            }
        });
    },

    moneyTopup: function(type, data) {

        var strData = JSON.stringify(data);
        var url = app.API+'/account/fund/wallet'
        app.post(url, {
            data: strData
        });
    },

    donation: function(type, data) {
        var strData = JSON.stringify(data);
        var url = app.API+'/web/donation/card/payment'
        app.post(url, {
            data: strData
        });
    },

    transaction: function(data, callback) {

        $.post(app.API + '/transaction', {
                'txn': data
            })
            .done(function(data) {

                if (data.status == 200) {
                    //update the user balance
                    app.alert(
                        data.title,
                        data.msg, 'success');

                    //update the amount left for the customer to know their balance.
                    app.setBalance(data.balance);
                    app.updateBalance();

                } else if (data.status == 300) {
                    app.alert(
                        data.title,
                        data.msg, 'error')
                } else if (data.status == 400) {
                    app.alert(
                        data.title,
                        data.msg, 'error')
                } else {
                    app.alert('Oops..', 'Something went wrong!', 'error')
                }

                //start callback after it has been resolved.
                app.callback(callback);

            })
            .fail(function(data) {
                app.alert('Oops...', 'Something went wrong!', 'error');

                //start callback after it has been resolved.
                app.callback(callback);
            })
    },

    pinPad: function(input, del, clr) {
        if (clr) {
            //remove all the input 
            //app.element('pin').value = '';
            $('.swal2-content input[type=password]').val('');
        } else if (del) {
            //remove the last value from the input
            //var pin = app.element('pin').value
            var pin = $('.swal2-content input[type=password]').val();

            $('.swal2-content input[type=password]').val(pin.substring(0, pin.length - 1));
        } else {
            //check if the user has not exceed the length of the pin
            if ($('.swal2-content input[type=password]').val().length == 4) {
                //app.alert('Oops...', 'Exceeded Number of PIN Allowed!', 'error');
            } else {
                //collect the user pin data.
                // app.element('pin').value = app.element('pin').value + input;
                $('.swal2-content input[type=password]').val($('.swal2-content input[type=password]').val() + input)
            }
        }
    },

    getPinPad() {
        //copy the pinpad into memory but also restore it after use so that it would be accessible to another function when called.
        var pinpad = app.element('pinpad').innerHTML;
        //clear the pin pad to avoid conflit with other calling functions
        //app.element('pinpad').innerHTML = '';


        return pinpad;
    },

    restorePinPad(html) {
        //restore the pin html back to memory
        app.element('pinpad').innerHTML = html
    },

    encode: function(s, k) {
        var enc = "";
        var str = "";
        // make sure that input is string
        str = s.toString();
        for (var i = 0; i < s.length; i++) {
            // create block
            var a = s.charCodeAt(i);
            // bitwise XOR
            var b = a ^ k;
            enc = enc + String.fromCharCode(b);
        }
        //return enc;
        return Base64.encode(enc)
    },

    callback: function(callback, data = false) {
        //start a callback 
        if (callback != null && typeof callback === "function") {
            if(data != false){
                callback(data);
            }else{
                callback();  
            }
            
        } else {
            app.alert('Oops...', 'Something went wrong!', 'error');
        }
    },

    post: function(path, params, method) {
        method = method || "post"; // Set method to post by default if not specified.

        // The rest of this code assumes you are not using a library.
        // It can be made less wordy if you use one.
        var form = document.createElement("form");
        form.setAttribute("method", method);
        form.setAttribute("action", path);

        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                var hiddenField = document.createElement("input");
                hiddenField.setAttribute("type", "hidden");
                hiddenField.setAttribute("name", key);
                hiddenField.setAttribute("value", params[key]);

                form.appendChild(hiddenField);
            }
        }

        document.body.appendChild(form);
        form.submit();
    }

};

// Create Base64 Object
var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(e) {
        var t = "";
        var n, r, i, s, o, u, a;
        var f = 0;
        e = Base64._utf8_encode(e);
        while (f < e.length) {
            n = e.charCodeAt(f++);
            r = e.charCodeAt(f++);
            i = e.charCodeAt(f++);
            s = n >> 2;
            o = (n & 3) << 4 | r >> 4;
            u = (r & 15) << 2 | i >> 6;
            a = i & 63;
            if (isNaN(r)) {
                u = a = 64
            } else if (isNaN(i)) {
                a = 64
            }
            t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
        }
        return t
    },
    decode: function(e) {
        var t = "";
        var n, r, i;
        var s, o, u, a;
        var f = 0;
        e = e.replace(/[^A-Za-z0-9+/=]/g, "");
        while (f < e.length) {
            s = this._keyStr.indexOf(e.charAt(f++));
            o = this._keyStr.indexOf(e.charAt(f++));
            u = this._keyStr.indexOf(e.charAt(f++));
            a = this._keyStr.indexOf(e.charAt(f++));
            n = s << 2 | o >> 4;
            r = (o & 15) << 4 | u >> 2;
            i = (u & 3) << 6 | a;
            t = t + String.fromCharCode(n);
            if (u != 64) {
                t = t + String.fromCharCode(r)
            }
            if (a != 64) {
                t = t + String.fromCharCode(i)
            }
        }
        t = Base64._utf8_decode(t);
        return t
    },
    _utf8_encode: function(e) {
        e = e.replace(/rn/g, "n");
        var t = "";
        for (var n = 0; n < e.length; n++) {
            var r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r)
            } else if (r > 127 && r < 2048) {
                t += String.fromCharCode(r >> 6 | 192);
                t += String.fromCharCode(r & 63 | 128)
            } else {
                t += String.fromCharCode(r >> 12 | 224);
                t += String.fromCharCode(r >> 6 & 63 | 128);
                t += String.fromCharCode(r & 63 | 128)
            }
        }
        return t
    },
    _utf8_decode: function(e) {
        var t = "";
        var n = 0;
        var r = c1 = c2 = 0;
        while (n < e.length) {
            r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r);
                n++
            } else if (r > 191 && r < 224) {
                c2 = e.charCodeAt(n + 1);
                t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                n += 2
            } else {
                c2 = e.charCodeAt(n + 1);
                c3 = e.charCodeAt(n + 2);
                t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                n += 3
            }
        }
        return t
    }
}


var validate = {
    validateEmail: function(email) {
        if (!validate.validateValue(email)) return false;
        var regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        if (regex.test(email)) return true;
        else return false;
    },
    validatePassword: function(password) {
        if (password.length > 2) {
            return true;
        } else {
            return false;
        }

    },
    validateText: function(text) {
        if (text.length > 2) {
            return true;
        } else {
            return false;
        }
    },
    validateDate: function(date) {

    },
    validateTime: function(time) {

    },
    validatePhonenumber: function(phone) {
        if (!validate.validateValue(phone)) {
            //first step of validation 
            return false;
        } else {
            //ensure that the means the requirement for a phone number
            phone = phone.replace(/\D/g, "");
            if (phone.substr(0, 4) == "2340") phone = "0" + phone.substr(4);
            else if (phone.substr(0, 3) == "234") phone = "0" + phone.substr(3);

            if (phone.substr(0, 2) == "07" || phone.substr(0, 2) == "08" || phone.substr(0, 2) == "09") return phone;
            else return false;
        }
    },
    validateConfirmation: function(value, confirm) {
        if (value == confirm || value === confirm) {
            return true;
        } else {
            return false;
        }
    },
    validateValue: function(value) {
        if (value == "") {
            return false;
        } else {
            return true;
        }
    },
    showLogs: function() {
        //display the logs on the log page.

    },
    log: function(log) {
        //log the data to the console, only on debug
        if (debug) {
            console.log(log);
        }
    }    
}