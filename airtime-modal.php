<div id="payairtime" class="modal fade" role="dialog">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="user-account text-center">
            <div class="mb-2 m-image"></div>
            <h1>Top Up Airtime</h1>
            
            <div class="sections-airtime" id="section-airtime" style="display: none;">
              <form class="" autocomplete="off" name="airtimeTxn" id="airtimeTxn">

                <div class="descriptiveItem">
                  <div class="networks mb-4">
                    <img id="atMTN" src="images/airtime/mtn.png" class="network end" onclick="airtime.setNetwork('MTN')">
                    <img id="atGLO" src="images/airtime/glo.png" class="network" onclick="airtime.setNetwork('GLO')">
                    <img id="atATL" src="images/airtime/airtel.png" class="network" onclick="airtime.setNetwork('ATL')">
                    <img id="atETI" src="images/airtime/9mobile.png" class="network" onclick="airtime.setNetwork('ETI')">
                  </div>
                </div>

                <!-- <div class="mb-3 hide" id="logoutAirtime">
                  NGN: <span id="userBalanceAirtime">0<span class="powerDecimals">.00</span></span>
                  <a onclick="app.Signout()" class="border-right">
                    <button class="login-btn btn btn-sm btn-danger">Logout</button>
                  </a>
                </div> -->

                <div class="form-group">
                  <input type="number" class="form-control" placeholder="Mobile Number" required="" autocomplete="off" style="cursor: auto;" id='number' name="number" />
                </div>

                <div class="form-group">
                  <input type="number" placeholder="Amount" class="form-control" autocomplete="off" required="" style="cursor: auto;" id="amount" name="amount">
                </div>

                <div class="wave text-left">
                  <label><input type="radio" class="option-input radio" name="paymentMethod" id="cardPayment2" value="card" checked="checked">
                  Debit / Credit Card</label>
                  <label><input type="radio" class="option-input radio" value="wallet" name="paymentMethod" id="walletPayment2">
                  Wallet</label>
                  <input type="hidden" name="network" id="network">
                </div>

                <div class="clearfix home-action-bar-1">
                  <div class="col-md-12 col-xs-12 no-padding-left signin-container">
                    <button value="submit" class="btn btn-primary login_button" id="submitAirtime">
                     Pay
                   </button>
                 </div>

               </div>

             </form>
            </div>

            <div class="sections-airtime" id="section-airtime-card-method" style="display:none">
              <h5 class="text-warning px-4"><small class="bold">Choose how you want to pay using your card</small></h5>

              <div class="wave my-4 pl-4 text-left">
                <label><input type="radio" class="option-input radio" value="saved-card" name="airtimeCardMethod" id="airtimeSaveCard" checked="checked">
                  Saved Card
                </label>
                <label><input type="radio" class="option-input radio" name="airtimeCardMethod" id="airtimeInterswitch">
                  With Interswitch
                </label>
              </div>

              <div class="col-xs-12">
                <a href="javascript:;" onclick="airtime.goBack()" class="btn btn-primary mx-1 pull-left">Back</a>
                <button value="" id="btn-airtime-card-method" class="btn btn-primary pull-right">
                  Proceed
                </button>
              </div>
            </div>

            <div class="sections-airtime" id="section-airtime-view-cards" style="display:none">
              <h5 class="text-warning"><small class="bold">Choose a card to pay with</small></h5>

              <table class="table" id="tableSaveCard">
                <tbody class="text-left" id="listSavedCardsOnAirtime">
                  <tr>
                    <td>Loading ... </td>
                  </tr>
                </tbody>
              </table>
              <div class="row">
               <!--  <div class="col-sm-6">
                  <button value="" id="btn-airtime-addcard" class="btn btn-primary px-3 py-3">
                    Add Card
                  </button>
                </div> -->
                <div class="col-sm-12">
                  <a href="javascript:;" onclick="airtime.goBack()" class="btn btn-primary mx-1 pull-left">Back</a>
                  <button value="" id="btn-airtime-use-savecard" class="btn btn-primary px-3 py-3 pull-right" style="display: none;">
                    Use Card
                  </button>
                </div>
              </div>
            </div> 

            <!-- <div class="sections-airtime" id="section-bank-transfer-card-info-airtime" style="display:none">
              <h5 class="mb-3"><small class="bold text-warning">Please enter your card info here</small></h5>

              <form class="" autocomplete="off" name="card_info" id="card_info-airtime">
                <div class="form-group">
                  <input type="text" class="form-control cc-number-airtime" id="card-airtime" name="card-number-airtime" required="required" placeholder="0000 0000 0000 0000" maxlength="19" autocomplete="off" data-numeric >
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <input type="text" class="form-control cc-exp-airtime" id="card_expiry-airtime" required="required" placeholder="01 / 22" autocomplete="off" data-numeric name="card-expiration-airtime" maxlength="7">
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="form-group">
                      <input type="password" class="form-control cc-cvc-airtime" id="cvv-airtime" required="required" placeholder="123" autocomplete="off" maxlength="3" data-numeric autocomplete="off" name="card-cvv-airtime">
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <input type="number" placeholder="Card Pin" class="form-control" autocomplete="off" required="required" maxlength="4" style="-webkit-text-security:disc;" id="card-pin-airtime" name="card-pin-airtime" oninput="this.value=this.value.slice(0,this.maxLength)">
                </div>

                <div class="col-xs-12 text">
                  <button value="" class="btn btn-primary" id="validate-cardInfo-airtime">
                    Proceed
                  </button>
                </div>
              </form>
            </div> 

            <div class="sections-airtime" id="section-airtime-bank-transfer-card-otp" style="display:none">
              <h5>(One-time Password Authentication)</h5>
              <p class="lead">Please enter the OTP that was sent to your mobile phone and/or email address below</p>

              <form class="" autocomplete="off" name="OTP-airtime" id="form-OTP-airtime">
                <div class="form-group">
                  <input type="number" placeholder="Enter OTP Here" class="form-control" maxlength="6" autocomplete="off" oninput="this.value=this.value.slice(0,this.maxLength)" style="-webkit-text-security:disc;" required="required" id="OTP-airtime" name="OTP-airtime">
                </div>

                <div class="col-xs-12 text">
                  <button value="" class="btn btn-primary" id="validate-OTP-airtime">
                    Submit
                  </button>
                </div>
              </form>
            </div> -->


         </div>
       </div>
     </div>
   </div>
  </div><!-- /.modal-payairtime -->