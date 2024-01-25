<div id="changePassword" class="modal fade" role="dialog">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="user-account text-center">
            <div class="mb-2 m-image">
              <img src="images/others/edit.png" class="img-fluid">
            </div>

            <h1>Change Password</h1>
            
            <div>
              <h5 class="mb-3"><small class="bold text-warning">You can edit your account's password here</small></h5>

              <form class="text-left" name="user-password" id="user-password">

                <div class="form-group">
                  <label class="bold">Current Password:</label>
                  <input type="password" class="form-control" id="current-pass" name="current-pass" required>
                </div>

                <div class="form-group">
                  <label class="bold">New Password:</label>
                  <input type="password" class="form-control" id="new-pass" name="new-pass" required>
                </div>

                <div class="form-group">
                  <label class="bold">Retype New Password:</label>
                  <input type="password" class="form-control" id="re-new-pass" name="re-new-pass" required>
                </div>
                
                <div class="col-xs-12 text">
                  <button value="" class="btn btn-primary" id="change-password">
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