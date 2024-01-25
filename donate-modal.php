  <div id="donate" class="modal fade" role="dialog">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        
        <div class="modal-body">
          <div class="user-account text-center">
            <div class="mb-2 m-image"><img src="images/others/donate.png" class="img-fluid"></div>
            <h1>Donate</h1>
            
            <div class="sections-donate" id="section-create-NGO">
              <h5 class="mb-3"><small class="bold text-warning">Register as a new NGO</small></h5>

              <form class="text-left" name="ngo-info" id="ngo-info" action="https://bills.payit.ng/web/donation/create" method="post" enctype="multipart/form-data">
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <input type="text" class="form-control" id="ngo-fn" name="firstname" required placeholder="First Name" autocomplete="off">
                    </div>
                    <div class="form-group">
                      <input type="text" class="form-control input-sm" id="ngo-ln" name="lastname" required placeholder="Last Name" autocomplete="off">
                    </div>
                    <div class="form-group">
                      <input type="email" class="form-control input-sm" id="ngo-em" name="email" required placeholder="Email" autocomplete="off">
                    </div>
                     <div class="form-group  input-sm">
                      <input type="tel" class="form-control" id="ngo-ph" name="phone" required placeholder="Phone Number" pattern="\d*" autocomplete="off" maxlength="11" oninput="this.value=this.value.replace(/[^0-9]/g,'');">
                    </div>
                    <div class="form-group">
                      <textarea class="form-control" placeholder="Address" id="ngo-add" name="address"></textarea>
                    </div>
                    <div class="form-group input-sm">
                      <input type="text" class="form-control" id="ngo-title" name="title" required placeholder="Organization Name" autocomplete="off">
                    </div>
                    <div class="form-group input-sm">
                      <textarea class="form-control" placeholder="Organization Description" id="ngo-desc" name="description"></textarea>
                    </div>
                    <div class="form-group">
                      <label class="bold">Profile Cover Image<br><small class="text-warning lh-10">Max. Size Allowed: 500Kb</small></label>
                      <img src="images/cover.jpg" class="d-block img-fluid" alt="Cover Image" id="coverImg" />
                      <span class="btn-file d-block mb-1">
                        <input type="file" id="ngo-cimg" style="width: 100%;" accept="image/*" required>
                      </span>
                    </div>

                    <div class="form-group">
                      <label class="bold">Organization Logo<br><small class="text-warning lh-10">Max. Size Allowed: 500Kb</small></label>
                      <img src="images/logo-test.png" class="d-block" style="width:100px; height:100px; object-fit:contain" alt="Your Pix"/>
                      <span class="btn-file d-block mb-1">
                        <input type="file" id="ngo-logo" style="width: 100%;" accept="image/*" required>
                      </span>
                    </div>

                    <div class="form-group">
                      <label class="bold">C.A.C<br><small class="text-warning lh-10">Max. Size: 2MB; JPG, PNG &amp; PDF is allowed</small></label>
                      <span class="btn-file d-block mb-1">
                        <input type="file" id=ngo-cac"" style="width: 100%;" accept=".pdf,application/pdf, image/*" required>
                      </span>
                    </div>
                    
                  </div>
                </div>
                
                <div class="col-xs-12 text">
                  <a href="javascript:;" onclick="donate.goBack()" class="btn btn-primary mx-1 pull-left">Back</a>
                  <button value="" class="btn btn-primary pull-right" id="btn-create-ngo">
                    Register
                  </button>
                </div>
              </form>
            </div>


            <div class="sections-donate" id="section-choose-donate" style="display:none">
              <h5 class="text-info"><small class="bold">Choose Donate Option</small></h5>

              <div class="wave my-3 text-left bold">
                <label class="mb-2"><input type="radio" class="option-input radio" value="bank" name="donateOption" id="optionDonate" checked="checked">
                 Donate Money <br> 
                  <small class="text-warning d-block pl-4 ml-1 lh-1 bold text-italic">Donate to the cause of registered and Valid NGO</small>
                </label>
                <label class="mb-4"><input type="radio" class="option-input radio" name="donateOption" id="optionNGO" value="account">
                  Register as N.G.O
                  <small class="text-warning d-block pl-4 ml-1 lh-1 bold text-italic">Register as an NGO with us and let people donate to your cause</small>
                </label>
              </div>

              <div class="col-xs-12 text">
                <button value="" id="choose-donate-option" class="btn btn-primary">Proceed</button>
              </div>
            </div>

            <div class="sections-donate" id="section-list-NGO" style="display:none">
              <h5 class="text-info mb-2"><small class="bold">Please choose whom you wish to donate to</small></h5>
              <div class="table-responsive" style="height: 300px">
                <table class="table table-hover" id="tableNGO">
                  <tbody class="text-left" id="listNGO">

                  </tbody>
                </table>
              </div>
              <div class="text-left mt-2">
                <button class="btn btn-primary btn-sm pull-left" onclick="donate.goBack()">Back</button>
              </div>
            </div>

            <div class="sections-donate" id="section-NGO-details" style="display:none">
              <!-- <h5 class="text-info mb-2">Please choose whom you wish to donate to</small></h5> -->  
            </div>

            <div class="sections-donate" id="section-NGO-form" style="display:none">
              <!-- <h5 class="text-info mb-2">Please choose whom you wish to donate to</small></h5> -->
                  <img alt='NGOLogo' class='img-fluid my-2' src='images/others/user.png' width="100" id="logo-NGO">
                  <h4 class='card-title' id="name-NGO">The Albino Foundation</h4>

                  <form class="" name="donateTxn" id="donateTxn">
                    <div class="form-group">
                      <input type="number" placeholder="Enter Amount to Donate" class="form-control" autocomplete="off" required="required" id="amount" name="amount">
                      <input type="hidden" name="user" id="donate-user" value="">
                      <input type="hidden" name="donateId" id="donateId" value="">
                    </div>
                    <div class="form-group">
                      <textarea placeholder="Comments" rows="2" class="form-control" autocomplete="off" required="required" id="comment" name="comment"></textarea>
                    </div>
                    <div class="wave text-left">
                      <label><input type="radio" class="option-input radio" name="paymentMethod" id="cardPayment3" value="card" checked="checked">
                      Debit / Credit Card</label>
                      <label><input type="radio" class="option-input radio" value="wallet" name="paymentMethod" id="walletPayment3">
                      Wallet</label>
                    </div>
                    <div class="col-xs-12">
                      <button class="btn btn-primary mx-1 pull-left" onclick="donate.goBack()">Back</button>
                      <button class="btn btn-primary pull-right" id="submitDonations">Make Donation</button>
                    </div>
                  </form>  
            </div>

            <div class="sections-donate" id="section-donate-card-method" style="display:none">
              <h5 class="text-warning px-4"><small class="bold">Choose how you want to pay using your card</small></h5>

              <div class="wave my-4 pl-4 text-left">
                <label><input type="radio" class="option-input radio" value="saved-card" name="donateCardMethod" id="donateSaveCard" checked="checked">
                  Saved Card
                </label>
                <label><input type="radio" class="option-input radio" name="donateCardMethod" id="donateInterswitch">
                  With Interswitch
                </label>
              </div>

              <div class="col-xs-12">
                <button class="btn btn-primary mx-1 pull-left" onclick="donate.goBack()">Back</button>
                <button value="" id="btn-donate-card-method" class="btn btn-primary pull-right">
                  Proceed
                </button>
              </div>
            </div>

            <div class="sections-donate" id="section-donate-view-cards" style="display:none">
              <h5 class="text-warning"><small class="bold">Choose a card to pay with</small></h5>

              <table class="table" id="tableSaveCard">
                <tbody class="text-left" id="listSavedCardsOnDonate">
                  <tr>
                    <td>Loading ... </td>
                  </tr>
                </tbody>
              </table>
              <div class="row">
                <div class="col-sm-12">
                  <button class="btn btn-primary mx-1 pull-left" onclick="donate.goBack()">Back</button>
                  <button value="" id="btn-donate-use-savecard" class="btn btn-primary px-3 py-3 pull-right" style="display: none;">
                    Use Card
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>