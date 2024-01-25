<div id="paybills" class="modal fade" role="dialog">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="user-account text-center">
            <div class="mb-2 m-image"></div>
            <h1></h1>

            <!-- <div class="hide" id="logout">
              NGN: <span id="userBalance">0<span class="powerDecimals">.00</span></span>
              <a style="padding-top: 6px;display: inline-block;" onclick="app.Signout()" class="border-right">
                <button class="login-btn btn btn-sm btn-danger">Logout</button>
              </a>
            </div> -->

            <div class="sections-bill" id="section-pay-bills" style="display:none;">
              <form class="tr-form" name="billTxn" id="billTxn">

                <div class="form-group">
                  <select class="form-control" id="billers" name="billers" style="display:none">

                  </select>
                </div>

                <div class="form-group">
                  <select class="form-control" id="biller_items" name="biller_items">

                  </select>
                </div>

                <div class="form-group">
                  <div id="customer_name"></div>
                </div>

                <div class="form-group">
                  <input type="text" class="form-control" placeholder="IUC Number" name="custID" id="custID" required="" autocomplete="off" onfocusout="bill.getCustomerName()">
                </div>

                <div class="form-group">
                  <input type="number" placeholder="Amount" class="form-control" name="amount" id="amount" autocomplete="off" required >
                </div>

                <div class="form-group">
                  <input type="email" placeholder="Email" class="form-control" name="email" id="email" autocomplete="off" required >
                </div>

                <div class="form-group">
                  <input type="number" placeholder="Phone Number" class="form-control" name="phone" id="phone" autocomplete="off" required>
                </div>

                <div class="wave text-left">
                  <label><input type="radio" class="option-input radio" name="paymentMethod" id="cardPayment" value="card" checked="checked" >Debit / Credit Card</label>
                  <label><input type="radio" class="option-input radio" name="paymentMethod" id="walletPayment" value="wallet">Wallet</label>
                </div> 

                <div class="row">
                  <div class="col-md-12 col-xs-12 signin-container text-left">
                    <h4 class="text-black pb-3" id="totalP" style="display: inline-block;">&#8358 <span id="total"></span></h4>
                    <p class="pb-1 text-success pull-right" id="cardCharges" style="line-height:10px;display:inline;">+ <b>&#8358 <span id="totalCharges" class="text-success"></span></b><br><small class="text-black">card Charges</small></p>
                  </div>
                  <div class="col-md-12 col-xs-12">
                    <button type="submit" value="submit" class="btn btn-primary login_button" id="submitBill" >
                      Pay Bill
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div class="sections-bill" id="section-bills-card-method" style="display:none">
              <h5 class="text-warning px-4"><small class="bold">Choose how you want to pay using your card</small></h5>

              <div class="wave my-4 pl-4 text-left">
                <label><input type="radio" class="option-input radio" value="saved-card" name="billCardMethod" id="billSaveCard" checked="checked">
                  Saved Card
                </label>
                <label><input type="radio" class="option-input radio" name="billCardMethod" id="billInterswitch">
                  With Interswitch
                </label>
              </div>

              <div class="col-xs-12">
                <a href="javascript:;" onclick="bill.goBack()" class="btn btn-primary mx-1 pull-left">Back</a>
                <button value="" id="btn-bills-card-method" class="btn btn-primary pull-right">
                  Proceed
                </button>
              </div>
            </div>

            <div class="sections-bill" id="section-bills-view-cards" style="display:none">
              <h5 class="text-warning"><small class="bold">Choose a card to pay with</small></h5>

              <table class="table" id="tableSaveCard">
                <tbody class="text-left" id="listSavedCardsOnBills">
                  <tr>
                    <td>Loading ... </td>
                  </tr>
                </tbody>
              </table>
              <div class="row">
                <!-- <div class="col-sm-6">
                  <button value="" id="btn-bill-addcard" class="btn btn-primary px-3 py-3">
                    Add Card
                  </button>
                </div> -->
                <div class="col-sm-12">
                  <a href="javascript:;" onclick="bill.goBack()" class="btn btn-primary mx-1 pull-left">Back</a>
                  <button value="" id="btn-bill-use-savecard" class="btn btn-primary px-3 py-3 pull-right" style="display: none;">
                    Use Card
                  </button>
                </div>
              </div>
            </div>

            <!--last-place-->
           <!--  <div class="sections-bill" id="section-bank-transfer-card-info-bill" style="display:none">
              <h5 class="mb-3"><small class="bold text-warning">Please enter your card info here</small></h5>

              <form class="" autocomplete="off" name="card_info" id="card_info-bill">
                <div class="form-group">
                  <input type="text" class="form-control cc-number" id="card-bill" name="card-number-bill" required="required" placeholder="0000 0000 0000 0000" maxlength="19" autocomplete="off" data-numeric >
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <input type="text" class="form-control cc-exp" id="card_expiry-bill" required="required" placeholder="01 / 22" autocomplete="off" data-numeric name="card-expiration-bill" maxlength="7"> 
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="form-group">
                      <input type="password" class="form-control cc-cvc" id="cvv-bill" required="required" placeholder="123" autocomplete="off" maxlength="3" data-numeric autocomplete="off" name="card-cvv-bill">
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <input type="number" placeholder="Card Pin" class="form-control" autocomplete="off" required="required" maxlength="4" style="-webkit-text-security:disc;" id="card-pin-bill" name="card-pin-bill" oninput="this.value=this.value.slice(0,this.maxLength)">
                </div>

                <div class="col-xs-12 text">
                  <button value="" class="btn btn-primary" id="validate-cardInfo-bill">
                    Proceed
                  </button>
                </div>
              </form>
            </div> 

            <div class="sections-bill" id="section-bill-bank-transfer-card-otp" style="display:none">
              <h5>(One-time Password Authentication)</h5>
              <p class="lead">Please enter the OTP that was sent to your mobile phone and/or email address below</p>

              <form class="" autocomplete="off" name="OTP-bill" id="form-OTP-bill">
                <div class="form-group">
                  <input type="number" placeholder="Enter OTP Here" class="form-control" maxlength="6" autocomplete="off" oninput="this.value=this.value.slice(0,this.maxLength)" style="-webkit-text-security:disc;" required="required" id="OTP-bill" name="OTP-bill">
                </div>

                <div class="col-xs-12 text">
                  <button value="" class="btn btn-primary" id="validate-OTP-bill">
                    Submit
                  </button>
                </div>
              </form>
            </div> -->


          </div>
        </div>
      </div>
    </div>
  </div><!-- /.modal-paybills -->