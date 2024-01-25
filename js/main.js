jQuery(function($) {

    'use strict';

    (function() {

        //events slider
        $(".cta-slider").slick({
            infinite: true,
            dots: false,
            slidesToShow: 1,
            autoplay: true,
            autoplaySpeed: 10000,
            slidesToScroll: 1
        });


        //airtime slider
        $(".brands-slider").slick({
            infinite: true,
            dots: true,
            arrows: true,
            slidesToShow: 4,
            autoplay: true,
            autoplaySpeed: 800,
            slidesToScroll: 1,
            responsive: [{
                breakpoint: 1025,
                settings: {
                    slidesToShow: 3,
                }
            }, {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                }
            }, {
                breakpoint: 450,
                settings: {
                    slidesToShow: 1,
                }
            }]
        });


    }());


    // -------------------------------------------------------------
    //  Tooltip
    // -------------------------------------------------------------
    (function() {

        $('[data-toggle="tooltip"]').tooltip();

    }());

    // -------------------------------------------------------------
    //  Variable Modal (i.e using the same modal for different info)
    // -------------------------------------------------------------     

    (function() {

        $(document).on('ready', function() {
            //to get the parameters from url
            var getUrlParameter = function getUrlParameter(sParam) {
                var sPageURL = decodeURIComponent(window.location.search.substring(1)),
                    sURLVariables = sPageURL.split('&'),
                    sParameterName,
                    i;

                for (i = 0; i < sURLVariables.length; i++) {
                    sParameterName = sURLVariables[i].split('=');

                    if (sParameterName[0] === sParam) {
                        return sParameterName[1] === undefined ? true : sParameterName[1];
                    }
                }
            };

            //perform or trigger the on click function of the ID
            var linkparam = getUrlParameter('start');
            if (linkparam == 'addmoney'){
                $('#addMoneyLink').trigger('click');
            }else if (linkparam == 'sendmoney'){
                $('#sendMoneyLink').trigger('click');
            }

            $('#paybills').on('show.bs.modal', function(event) {
                var button = $(event.relatedTarget) // Button that triggered the modal
                var recipient = button.data('whatever') // Extract biller name from data-whatever attributes
                var id = button.data('id'); //Extract id from data-id in the image

                // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
                // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
                var modal = $(this)
                modal.find('.user-account h1').html('Pay ' + recipient + ' Bills'); //find h1 in this modal and insert the name of the biller 


                // sets the biller image on the modal 
                var imgSrc = $('#img-biller-id-' + id).attr('src');
                modal.find('.user-account .m-image').html('<img src="' + imgSrc + '" class="bills mb-0"/>');


                //set the bill user click on automatically on the modal
                var bill_id = button.data('bill-id');
                bill.setBillItem(bill_id);
            })

            $('#payairtime').on('show.bs.modal', function(event) {
                var airtimeImg = $(event.relatedTarget) // Button that triggered the modal
                var id = airtimeImg.data('id') // Extract airtime data-id from the ahref modal

                airtime.clickNetwork(id)
            })

            // resets modal forms when closed
            $('#payairtime,#paybills,#sendMoney,#addMoney').on('hidden.bs.modal', function(event) {
                $('#airtimeTxn,#billTxn,#country,#topupTxn,#wallet_transfer_form,#card_info,#form-OTP')[0].reset();
                app.element('customer_name').innerHTML = ''
            });

        });

    }());

    $(document).ready(function() {

        $("a").on('click', function(event) {
            // Make sure this.hash has a value before overriding default behavior
            if (this.hash !== "") {
            	 event.preventDefault();

                // Store hash
                var hash = this.hash;

                // Using jQuery's animate() method to add smooth page scroll
                // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
                $('html, body').animate({
                    scrollTop: $(hash).offset().top
                }, 800, function() {

                    // Add hash (#) to URL when done scrolling (default click behavior)
                    window.location.hash = hash;
                });
            } // End if
        });

        // gets JSON data from the below url 
        $.ajax({
            type: "GET",
            url: "https://bills.payit.ng/bills/resources",
            success: function(result) {
                data = JSON.parse(result.bills); //convert the text coming from the server to an object
                loadData(result);

                $("#loader").fadeOut("slow");
                $("#bImageContainer").fadeIn();

                $('.bills-slider').slick('setPosition');

                localStorage.setItem('billsData', result.bills);
            }
        });

        // triggers signup popup
        $("#signUp").click(function() {
            app.SignUp(function() {
                app.alert("Congrats!", "<span class='text-capitalize'>" + app.db().select("firstname") + " " + app.db().select("lastname") + "</span><br> You are now a Valid User", "success");
            });
        });

        //triggers login popup (the show & hide button in app.js {signInState}
        $("#signIn").click(function() {
            app.SignIn(function() {
                app.alert("Welcome", "<span class='text-capitalize'>" + app.db().select("firstname") + " " + app.db().select("lastname") + "</span>", "success");
            });
        });


        //sign user out and delete session (the show & hide button in app.js {logoutState})
        $("#signOut").click(function() {
            app.Signout();
        });


        //search for the value in the store
        $('#search').click(function(e) {
            e.preventDefault();
            window.location.href = "https://store.payit.ng/catalogsearch/result/?q=" + $('#search-form').find('input[name="search"]').val();
        });


        $('#addMoneyLink').click(function() {
            if (app.isLoggedIn) {
                $('#addMoney').modal({ 
                        backdrop: 'static',
                        keyboard: true, 
                        show: true});
                topup.init();
            } else {
                app.SignIn(function() {
                    $('#addMoney').modal({
                        backdrop: 'static',
                        keyboard: true, 
                        show: true});
                    topup.init();
                });
            }
        });

        $('#sendMoneyLink').click(function() {
            if (app.isLoggedIn) {
                $('#sendMoney').modal({
                        backdrop: 'static',
                        keyboard: true, 
                        show: true});
                sendmoney.init();
            } else {
                app.SignIn(function() {
                    $('#sendMoney').modal({
                        backdrop: 'static',
                        keyboard: true, 
                        show: true});
                    sendmoney.init();
                });
            }

        });

        $('#donateLink').click(function() {
            if (app.isLoggedIn) {
                $('#donate').modal({
                        backdrop: 'static',
                        keyboard: true, 
                        show: true});
                donate.init();
            } else {
                app.SignIn(function() {
                    $('#donate').modal({
                        backdrop: 'static',
                        keyboard: true, 
                        show: true});
                    donate.init();
                });
            }

        });


        $('#addcardLink').click(function() {
            if (app.isLoggedIn) {
                $('#addCard').modal({
                        backdrop: 'static',
                        keyboard: true, 
                        show: true});
                addcard.init();
            } else {
                app.SignIn(function() {
                    $('#addCard').modal({
                        backdrop: 'static',
                        keyboard: true, 
                        show: true});
                    addcard.init();
                });
            }

        });


        $('#profileLink').click(function() {
            if (app.isLoggedIn) {
                $('#profile').modal({
                        backdrop: 'static',
                        keyboard: true, 
                        show: true});
            } else {
                app.SignIn(function() {
                    $('#profile').modal({
                        backdrop: 'static',
                        keyboard: true, 
                        show: true});
                });
            }

        });

        $('a#dismiss').click(function() {

            setTimeout(function() {

                swal({
                    title: 'Are you sure',
                    type: 'warning',
                    html: '<p> Going back will cancel this transaction. You will have to restart the transaction again.</p>',
                    showCloseButton: false,
                    showCancelButton: true,
                    confirmButtonColor: '#ff497c',
                    cancelButtonColor: '#E64270',
                    confirmButtonText: 'Yes, I am Sure',
                    cancelButtonText: 'Cancel',
                    showLoaderOnConfirm: false,
                    preConfirm: function() {
                        $('.iframe-holder').addClass('hide');
                         swal.close();
                    },
                    allowOutsideClick: false

                })

            }, 250);


        });


        $('#changePasswordLink').click(function() {
            if (app.isLoggedIn) {
                $('#changePassword').modal({
                        backdrop: 'static',
                        keyboard: true, 
                        show: true});
                    changepassword.init();
            } else {
                app.SignIn(function() {
                    $('#changePassword').modal({
                        backdrop: 'static',
                        keyboard: true, 
                        show: true});
                    changepassword.init();
                });
            }

        });


        $('#historyLink').click(function() {
            if (app.isLoggedIn) {
                $('#history').modal({
                        backdrop: 'static',
                        keyboard: true, 
                        show: true});
                    txn_history.start();
            } else {
                app.SignIn(function() {
                    $('#history').modal({
                        backdrop: 'static',
                        keyboard: true, 
                        show: true});
                    txn_history.start();
                });
            }

        });
        $('#nextBill').click(function() {
            $('.bills-slider').slick('slickNext');
        });

        $('#prevBill').click(function() {
            $('.bills-slider').slick('slickPrev');
        });

    });

    function loadData(result) {
        if (!app.hasBillStarted) {
            bill.start();
        }
    }

    // script end
});