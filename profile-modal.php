<div id="profile" class="modal fade" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="user-account text-center">
            <div class="mb-2 m-image">
              <img src="images/others/avatar.png" class="img-fluid">
            </div>

            <h1>Your Profile</h1>
            
            <div class="sections-profile" id="section-profile">
              <h5 class="mb-3"><small class="bold text-warning">You can edit your account information here</small></h5>

              <form class="text-left" name="user-profile" id="user-profile">
                <div class="row">
                  <div class="col-md-5">
                    
                    <div class="form-group">
                      <label class="bold">Your Picture<br><small class="text-warning lh-10">Max. Size Allowed: 500Kb</small></label>
                      <img id='img-upload' class="d-block" style="width:100px; height:100px; object-fit:contain" alt="Your Pix"/>
                      <span class="btn-file d-block mb-1">
                        <input type="file" id="imgInp" style="width: 100%;" accept="image/*">
                      </span>
                    </div>
                    
                    <div class="form-group  input-sm">
                      <label class="bold">Phone Number:</label>
                      <input type="tel" class="form-control" id="profile-ph" name="phone number" required placeholder="Phone Number" autocomplete="off" oninput="this.value=this.value.replace(/[^0-9]/g,'');" maxlength="11">
                    </div>

                  </div>

                  <div class="col-md-7">
                    <div class="form-group">
                      <label class="bold">First Name:</label>
                      <input type="text" class="form-control" id="profile-fn" name="first-name" required placeholder="First Name" autocomplete="off">
                    </div>

                    <div class="form-group">
                      <label class="bold">Last Name:</label>
                      <input type="text" class="form-control input-sm" id="profile-ln" name="last-name" required placeholder="Last Name" autocomplete="off">
                    </div>

                    <div class="form-group">
                      <label class="bold">Email:</label>
                      <input type="text" class="form-control input-sm" id="profile-em" name="email" required placeholder="Email" autocomplete="off">
                    </div>

                  </div>
                </div>
                
                <div class="col-xs-12 text">
                  <button value="" class="btn btn-primary" id="update-profile">
                    Save
                  </button>
                </div>
              </form>
            </div>

         </div>
       </div>
     </div>
   </div>
  </div><!-- /.modal-addMoney -->