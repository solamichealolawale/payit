<div id="addMoney" class="modal fade" role="dialog">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="user-account text-center">
            <div class="mb-2 m-image"><img src="images/others/wallet.png" class="img-fluid"></div>

            <h1>Add Money</h1>
            
            <div class="sections-topup" id="section-topup" style="display:none">
              <h5 class="text-info"><small class="bold">- to your payit wallet</small></h5>
              <form class="" autocomplete="off" name="topupTxn" id="topupTxn">
                <!-- <div class="mb-3 hide" id="logoutTopup">
                  NGN: <span id="userBalanceTopup">0<span class="powerDecimals">.00</span></span>
                  <a onclick="app.Signout()" class="border-right">
                    <button class="login-btn btn btn-sm btn-danger">Logout</button>
                  </a>
                </div> -->
                <div class="form-group">
                  <input type="hidden" name="user" id="topup-user" value="">
                  <input type="number" placeholder="Amount" class="form-control" autocomplete="off" required="required" style="cursor: auto" id="amount" name="amount">
                </div>

                <div class="clearfix home-action-bar-1">
                  <div class="col-xs-12 no-padding-left signin-container">
                    <button value="submit" class="btn btn-primary login_button" id="submitPopup">
                     Proceed
                   </button>
                 </div>
                </div>
              </form>
            </div>
            
            <div class="sections-topup" id="section-topup-card-method" style="display:none">
              <h5 class="text-warning px-4"><small class="bold">Choose how you want to pay using your card</small></h5>

              <div class="wave my-4 pl-4 text-left">
                <label><input type="radio" class="option-input radio" value="saved-card" name="topupCardMethod" id="topupSaveCard" checked="checked">
                  Saved Card
                </label>
                <label><input type="radio" class="option-input radio" name="topupCardMethod" id="topupInterswitch">
                  With Interswitch
                </label>
              </div>

              <div class="col-xs-12">
                <a href="javascript:;" onclick="topup.goBack()" class="btn btn-primary mx-1 pull-left">Back</a>
                <button value="" id="btn-topup-card-method" class="btn btn-primary pull-right">
                  Proceed
                </button>
              </div>
            </div>

            <div class="sections-topup" id="section-topup-view-cards" style="display:none">
              <h5 class="text-warning"><small class="bold">Choose a card to pay with</small></h5>

              <table class="table" id="tableSaveCard">
                <tbody class="text-left" id="listSavedCardsOntopup">
                  <tr>
                    <td>Loading ... </td>
                  </tr>
                </tbody>
              </table>
              <div class="row">
                <!-- <div class="col-sm-6">
                  <button value="" id="btn-topup-addcard" class="btn btn-primary px-3 py-3">
                    Add Card
                  </button>
                </div> -->
                <div class="col-sm-12">
                  <a href="javascript:;" onclick="topup.goBack()" class="btn btn-primary mx-1 pull-left">Back</a>
                  <button value="" id="btn-topup-use-savecard" class="btn btn-primary px-3 py-3 pull-right" style="display: none;">
                    Use Card
                  </button>
                </div>
              </div>
            </div> 
<!-- 
            <div class="sections-topup" id="section-bank-transfer-card-info-topup" style="display:none">
              <h5 class="mb-3"><small class="bold text-warning">Please enter your card info here</small></h5>

              <form class="" autocomplete="off" name="card_info" id="card_info-topup">
                <div class="form-group">
                  <input type="text" class="form-control cc-number-topup" id="card-topup" name="card-number-topup" required="required" placeholder="0000 0000 0000 0000" maxlength="19" autocomplete="off" data-numeric >
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <input type="text" class="form-control cc-exp-topup" id="card_expiry-topup" required="required" placeholder="01 / 22" autocomplete="off" data-numeric name="card-expiration-topup" maxlength="7">
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="form-group">
                      <input type="password" class="form-control cc-cvc-topup" id="cvv-topup" required="required" placeholder="123" autocomplete="off" maxlength="3" data-numeric autocomplete="off" name="card-cvv-topup">
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <input type="number" placeholder="Card Pin" class="form-control" autocomplete="off" required="required" maxlength="4" style="-webkit-text-security:disc;" id="card-pin-topup" name="card-pin-topup" oninput="this.value=this.value.slice(0,this.maxLength)">
                </div>

                <div class="col-xs-12 text">
                  <button value="" class="btn btn-primary" id="validate-cardInfo-topup">
                    Proceed
                  </button>
                </div>
              </form>
            </div> 

            <div class="sections-topup" id="section-topup-bank-transfer-card-otp" style="display:none">
              <h5>(One-time Password Authentication)</h5>
              <p class="lead">Please enter the OTP that was sent to your mobile phone and/or email address below</p>

              <form class="" autocomplete="off" name="OTP-topup" id="form-OTP-topup">
                <div class="form-group">
                  <input type="number" placeholder="Enter OTP Here" class="form-control" maxlength="6" autocomplete="off" oninput="this.value=this.value.slice(0,this.maxLength)" style="-webkit-text-security:disc;" required="required" id="OTP-topup" name="OTP-topup">
                </div>

                <div class="col-xs-12 text">
                  <button value="" class="btn btn-primary" id="validate-OTP-topup">
                    Submit
                  </button>
                </div>
              </form>
            </div>
 -->
         </div>
       </div>
     </div>
   </div>
  </div><!-- /.modal-addMoney -->