var addcard = {
isLive: app.isLiveApp,
txnRef: null,
maskcard: null,
start: function () {
	app.element('card-addcard').focus();
	document.getElementById("validate-cardInfo-addcard").addEventListener("click", function (event) {
		event.preventDefault()

		if ($("#card-addcard").val() == '') {
			return app.alert('Error', 'Kindly Enter a Valid Card Number.', 'error');
		} else if ($("#card_expiry-addcard").val() == '') {
			return app.alert('Error', 'Kindly Enter a Valid Card Expiry Number.', 'error');
		} else if ($("#cvv-addcard").val() == '') {
			return app.alert('Error', 'Kindly Enter a Valid Card CVV.', 'error');
		} else if ($("#card-pin-addcard").val() == '') {
			return app.alert('Error', 'Kindly Enter your Card PIN', 'error');
		} else {
			$(this).text("Loading...");
			var cardInfo = app.formData('card_info-addcard');
			addcard.processCardInfo(cardInfo);
		}

	});

	//accept certain pattern when input
	Payment.restrictNumeric(document.querySelector('[data-numeric]'));
	Payment.formatCardNumber(document.querySelector('.cc-number-addcard'));
	//Payment.formatCardExpiry(document.querySelector('.cc-exp'));
	Payment.formatCardCVC(document.querySelector('.cc-cvc-addcard'));
	// var cardType = Payment.fns.cardType(_this.J.val(_this.number));


	//card number validation when user are entering info
	$('#card-addcard').keyup(function () {
		//once the card status / validity has been clearified jump to the next tab
		if (Payment.fns.validateCardNumber(Payment.J.val(document.querySelector('.cc-number-addcard')))) {
			//jump to the next tab if its valid input
			$('#card_expiry-addcard').focus();
		}
	});

	//card expiry validation on user input
	$('#card_expiry-addcard').keyup(function () {
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
			$('input[name="card-cvv-addcard"]').focus();
		}
	});

	//card cvv validation on user input
	$('#cvv-addcard').keyup(function () {
		var length = $(this).val().length;
		if (length == 3) {
			$('input[name="card-pin-addcard"]').focus();
		}
	});

	$('#validate-OTP-addcard').on('click', function (e) {
		e.preventDefault();
		$(this).text("Loading...");
		var userOTP = $('#OTP-addcard').val();
		addcard.processOTP(userOTP);
	});


	//Handle response coming from 3descure or any redirection
	window.addEventListener("message", function (e) {

		if (e.data.name == "complete") {
			$('.iframe-holder').addClass('hide');
			$('.iframe-3dsec').html("");

			//display the state of the transaction to the user as well
			app.alert(e.data.title, e.data.msg, e.data.status);
		}
	});


},
processOTP: function (otp) {
	var data = {
		txnRef: addcard.txnRef,
		otp: otp,
		maskcard: addcard.maskcard,
		'user': app.db().select("id")
	};

	//connect to the server and process as needed
	$.post(app.API + '/web/process/save/card/otp', {
			'data': data
		})
		.done(function (response) {
			//return the data
			if (response.status == 200) {

				app.alert(
					response.title,
					response.msg,
					'success'
				)

			} else {
				//display error message
				app.alert(
					response.title,
					response.msg, 'error')
			}
		});
},

switchSection: function (section) {
	//hide all the section 
	$('.sections-addcard').hide();

	//enable the active section  
	$('#section-' + section).show();
},

init: function () {
	addcard.switchSection('addcard');
	$('#form-OTP-addcard,#card_info-addcard')[0].reset();
	addcard.txnRef = null;
	$("#validate-cardInfo-addcard").text("Save");
},

processCardInfo: function (cardInfo) {

	$.post(app.API + '/web/process/save/card', {
			'user': app.db().select("id"),
			'cardInfo': cardInfo,
		})
		.done(function (response) {
			//return the data
			if (response.status == 200) {
				if (response.validation) {
					if (response.type == '3dsecure') {
						var iframe = document.createElement('iframe');
						// iframe.setAttribute('style', 'z-index:9999;');
						// iframe.setAttribute('width', '100%');
						// iframe.setAttribute('height', '100%');
						iframe.setAttribute('id', 'iframe');
						iframe.src = response.url;
						iframe.onload = function () {
							$(".loadingtext").hide();
						}
						$('.iframe-holder').removeClass('hide');
						$('.iframe-3dsec').append(iframe);
						$("#addCard").modal('hide');
					} else {
						addcard.txnRef = response.txnRef;
						addcard.maskcard = response.maskcard;
						addcard.switchSection('addcard-bank-transfer-card-otp');
					}

				} else {
					app.alert(
						response.title,
						response.msg,
						'success'
					);
				}
			} else {
				//display error message
				app.alert(
					response.title,
					response.msg, 'error')

				$("#validate-cardInfo-addcard").text("Try Again");
			}
		});

}

	}
	addcard.start();
