  <div id="sendMoney" class="modal fade" role="dialog">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        
        <div class="modal-body">
          <div class="user-account text-center">
            <div class="mb-2 m-image"><img src="images/others/wallet.png" class="img-fluid"></div>
            <h1>Send Money</h1>

            <div class="sections-sendmoney" id="section-choose-country" style="display:none">
              <h5 class="text-info mb-2"><small class="bold">Please select your country</small></h5>
              <form name="country" id="country">
                <select class="form-control mb-4" id="country-lists" required>
                  <option selected>Nigeria</option>
                  <option>Kenya</option>
                  <option>Ghana</option>
                  <option>Niger</option>
                  <option>South Africa</option>
                </select>

                <div class="col-xs-12 text">
                  <button id="country-name" type="submit" class="btn btn-primary">Proceed</button>
                </div>
              </form>
            </div>

            <div class="sections-sendmoney" id="section-choose-transfer" style="display:none">
              <h5 class="text-info"><small class="bold">Choose Transfer Method</small></h5>

              <div class="wave my-3 text-left bold">
                <label class="mb-4"><input type="radio" class="option-input radio" name="transferMethod" id="accountTransfer" value="account" checked="checked">
                  Bank Transfer
                  <small class="text-warning d-block pl-4 ml-1 lh-1 bold text-italic">Tranfer from your bank account to another bank account</small>
                </label>

                <label class="mb-2"><input type="radio" class="option-input radio" value="bank" name="transferMethod" id="walletTransfer">
                  Wallet Transfer <br> 
                  <small class="text-warning d-block pl-4 ml-1 lh-1 bold text-italic">Transfer from your payit wallet to another payit wallet</small>
                </label>
              </div>

              <div class="col-xs-12 text">
                <button class="btn btn-primary mx-1 pull-left" onclick="sendmoney.goBack()">Back</button>
                <button value="" id="transfer-method" class="btn btn-primary pull-right">Proceed</button>
              </div>
            </div>

            <div class="sections-sendmoney" id="section-wallet-transfer" style="display:none">
              <h5 class="text-info mb-3"><small class="bold">- from your wallet to another wallet</small></h5>
              <form class="" autocomplete="off" name="wallet_transfer_form" id="wallet_transfer_form">
                <div class="form-group">
                  <input type="hidden" name="user" id="wallet-user" value="">
                  <input type="number" placeholder="Phone Number" class="form-control" autocomplete="off" required="required" style="cursor: auto" id="wallet-transfer-phone" name="wallet-transfer-phone">
                </div>

                <div class="form-group">
                  <input type="number" placeholder="Amount" class="form-control" autocomplete="off" required="required" id="wallet-transfer-amount" name="wallet-transfer-amount">
                </div>


                <div class="col-xs-12 text">
                  <button class="btn btn-primary mx-1 pull-left" onclick="sendmoney.goBack()">Back</button>
                  <button value="" class="btn btn-primary pull-right" id="validate-wallet">
                   Connect
                 </button>
               </div>
             </form>
            </div>

            <div class="sections-sendmoney" id="section-wallet-summary" style="display:none">
              <h5 class="text-warning mb-4"><small class="bold">-Please make sure you confirm the below details before you proceed </small></h5>

              <img id="user_profile_img" width="120px"/>

              <div class="text-capitalize mt-3 mb-1 px-2 text-left">
                <span><b>NAME: </b></span><span id="user_fullname" class="text-success bold"></span>
              </div>
              <div class="text-capitalize text-left mt-1 mb-4 px-2">
                <span><b>AMOUNT: </b></span><span id="user_amount"  class="text-success bold"></span>
              </div>

              <div class="col-xs-12 text">
                <button class="btn btn-primary mx-1 pull-left" onclick="sendmoney.goBack()">Back</button>
                <button value="" class="btn btn-primary pull-right" id="commit-transfer-wallet">
                  Transfer
                </button>
              </div>
            </div>
            
            <div class="sections-sendmoney" id="section-bank-transfer-info" style="display:none">
              <h5 class="text-warning mb-3 choice"><small class="bold">Please fill in the necessary fields</small></h5>
              <div class="form-group">
                <select class="form-control" id="bank-lists">
                  <option value="" disabled selected>Loading...</option>
                </select>
              </div>

              <div class="form-group">
                <input type="number" onfocusout="sendmoney.getAccountName()" placeholder="Account Number" class="form-control" autocomplete="off" required="required" id="accNo" name="accNo">
              </div>

              <h5 id="bank_account_name"></h5>

              <div class="form-group">
                <input type="number" placeholder="Amount" class="form-control" autocomplete="off" required="required" id="tAmount" name="amount">
              </div>

              <div class="col-xs-12 text">
                <button class="btn btn-primary mx-1 pull-left" onclick="sendmoney.goBack()">Back</button>
                <button value="" id="transfer-bank-process" class="btn btn-primary pull-right" disabled>
                  Proceed
                </button>
              </div>
            </div> 

            <div class="sections-sendmoney" id="section-bank-transfer" style="display:none">
              <h5 class="text-info"><small class="bold">Choose Payment Method</small></h5>
              <div class="wave my-4">
                <label><input type="radio" class="option-input radio" name="useMethod" id="cardMethod" value="card-sendmoney" checked="checked">
                  Use Card
                </label>
                <label><input type="radio" class="option-input radio" value="wallet" name="useMethod" id="walletMethod">
                  Use Wallet
                </label>
              </div>

              <div class="col-xs-12 text">
                <button class="btn btn-primary mx-1 pull-left" onclick="sendmoney.goBack()">Back</button>
                <button value="" id="transfer-bank-method" class="btn btn-primary pull-right">
                  Proceed
                </button>
              </div>
            </div>

            <div class="sections-sendmoney" id="section-sendmoney-card-method" style="display:none">
              <h5 class="text-warning px-4"><small class="bold">Choose how you want to pay using your card</small></h5>

              <div class="wave my-4 pl-4 text-left">
                <label><input type="radio" class="option-input radio" value="saved-card" name="sendmoneyCardMethod" id="sendmoneySaveCard" checked="checked">
                  Saved Card
                </label>
                <label><input type="radio" class="option-input radio" name="sendmoneyCardMethod" id="sendmoneyOtherCard" value="OtherCard">
                  Use Another Card
                </label>
              </div>

              <div class="col-xs-12">
                <button class="btn btn-primary mx-1 pull-left" onclick="sendmoney.goBack()">Back</button>
                <button value="" id="btn-sendmoney-card-method" class="btn btn-primary pull-right">
                  Proceed
                </button>
              </div>
            </div>

            <div class="sections-sendmoney" id="section-sendmoney-view-cards" style="display:none">
              <h5 class="text-warning"><small class="bold">Choose a card to pay with</small></h5>

              <table class="table" id="tableSaveCard">
                <tbody class="text-left" id="listSavedCardsOnSendMoney">
                  <tr>
                    <td>Loading... </td>
                  </tr>
                </tbody>
              </table>
              <div class="row">
                <!-- <div class="col-sm-6">
                  <button value="" id="btn-sendmoney-addcard" class="btn btn-primary px-3 py-3">
                    Add Card
                  </button>
                </div> -->
                <div class="col-sm-12">
                  <button class="btn btn-primary mx-1 pull-left" onclick="sendmoney.goBack()">Back</button>
                  <button value="" id="btn-sendmoney-use-savecard" class="btn btn-primary px-3 py-3 pull-right" style="display: none;">
                    Use Card
                  </button>
                </div>
              </div>
            </div>

            <div class="sections-sendmoney" id="section-bank-transfer-card-info" style="display:none">
              <h5 class="mb-3"><small class="bold text-warning">Please enter your new card info here</small></h5>

              <form class="" autocomplete="off" name="card_info" id="card_info">
                <div class="form-group">
                  <input type="text" class="form-control card cc-number-send" id="card-send" name="card-number-send" required="required" placeholder="0000 0000 0000 0000" maxlength="19" autocomplete="off" data-numeric >
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <input type="text" class="form-control cc-exp-send" id="card_expiry-send" required="required" placeholder="01 / 22" autocomplete="off" data-numeric name="card-expiration-send" maxlength="7">
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="form-group">
                      <input type="password" class="form-control cc-cvc-send" id="cvv-send" required="required" placeholder="123" autocomplete="off" maxlength="3" data-numeric autocomplete="off" name="card-cvv-send">
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <input type="number" placeholder="Card Pin" class="form-control" autocomplete="off" required="required" maxlength="4" style="-webkit-text-security:disc;" id="card-pin-send" name="card-pin-send" oninput="this.value=this.value.slice(0,this.maxLength)">
                </div>

                <div class="col-xs-12 text">
                  <button class="btn btn-primary mx-1 pull-left" onclick="sendmoney.goBack()">Back</button>
                  <button value="" class="btn btn-primary pull-right" id="validate-cardInfo">
                    Send Money
                  </button>
                </div>
              </form>
            </div> 

            <div class="sections-sendmoney" id="section-bank-transfer-card-otp" style="display:none">
              <h5>(One-time Password Authentication)</h5>
              <p class="lead">Please enter the OTP that was sent to your mobile phone and/or email address below</p>

              <form class="" autocomplete="off" name="OTP" id="form-OTP">
                <div class="form-group">
                  <input type="number" placeholder="Enter OTP Here" class="form-control" maxlength="6" autocomplete="off" oninput="this.value=this.value.slice(0,this.maxLength)" style="-webkit-text-security:disc;" required="required" id="OTP" name="OTP">
                </div>

                <div class="col-xs-12 text">

                  <button value="" class="btn btn-primary" id="validate-OTP">
                    Submit
                  </button>
                </div>
              </form>
            </div> 

          </div>
        </div>

      </div>
    </div>
  </div>