<div id="addCard" class="modal fade" role="dialog">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="user-account text-center">
            <div class="mb-2 m-image"><img src="images/others/cc.png" class="img-fluid"></div>

            <h1>Add a New Card</h1>
            
            <div class="sections-addcard" id="section-addcard" style="display: none;">
              <h5 class="mb-3"><small class="bold text-warning">Please enter your card info here</small></h5>

              <form class="" autocomplete="off" name="addcard" id="card_info-addcard">
                <div class="form-group">
                  <input type="text" class="form-control card cc-number-addcard" id="card-addcard" name="card-number-addcard" required="required" placeholder="0000 0000 0000 0000" maxlength="19" autocomplete="off" data-numeric >
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <input type="text" class="form-control cc-exp-addcard" id="card_expiry-addcard" required="required" placeholder="01 / 22" autocomplete="off" data-numeric name="card-expiration-addcard" maxlength="7">
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="form-group">
                      <input type="password" class="form-control cc-cvc-addcard" id="cvv-addcard" required="required" placeholder="123" autocomplete="off" maxlength="3" data-numeric autocomplete="off" name="card-cvv-addcard">
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <input type="number" placeholder="Card Pin" class="form-control" autocomplete="off" required="required" maxlength="4" style="-webkit-text-security:disc;" id="card-pin-addcard" name="card-pin-addcard" oninput="this.value=this.value.slice(0,this.maxLength)">
                </div>

                <div class="col-xs-12 text">
                  <button value="" class="btn btn-primary" id="validate-cardInfo-addcard">
                    Proceed
                  </button>
                </div>
              </form>
            </div>


            <div class="sections-addcard" id="section-addcard-bank-transfer-card-otp" style="display:none">
              <h5>(One-time Password Authentication)</h5>
              <p class="lead">Please enter the OTP that was sent to your mobile phone and/or email address below</p>

              <form class="" autocomplete="off" name="OTP-addcard" id="form-OTP-addcard">
                <div class="form-group">
                  <input type="number" placeholder="Enter OTP Here" class="form-control" maxlength="6" autocomplete="off" oninput="this.value=this.value.slice(0,this.maxLength)" style="-webkit-text-security:disc;" required="required" id="OTP-addcard" name="OTP-addcard">
                </div>

                <div class="col-xs-12 text">
                  <button value="" class="btn btn-primary" id="validate-OTP-addcard">
                    Submit
                  </button>
                </div>
              </form>
            </div>


         </div>
       </div>
     </div>
   </div>
  </div><!-- /.modal-addMoney -->