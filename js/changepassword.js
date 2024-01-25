var changepassword = {
    isLive: app.isLiveApp,

    start: function() {
        document.getElementById("change-password").addEventListener("click", function(event) {
            event.preventDefault();

            if ( (!changepassword.validatePassword(app.value('current-pass'))) || (!changepassword.validatePassword(app.value('new-pass'))) || (!changepassword.validatePassword(app.value('re-new-pass'))) ){
                app.alert('Error', 'Empty or Invalid password detected, Minimum of 6 character is accepted','error')
            } else if (!changepassword.validateConfirmation(app.value('new-pass'), app.value('re-new-pass'))) {
                app.alert('Password Mismatch', 'Your new password do not match','warning')
            }else{
                changepassword.updatePassword();
            }
            
        });

    },
    updatePassword: function(e) {
        $.post(app.API + '/web/edit/password', {
            'user': app.db().select("id"),
            'currentpassword': app.value('current-pass'),
            'newpassword': app.value('new-pass'),

        })
        .done(function(data) {

            if (data.status == 200) {
                //clear the database and store with new details
                app.alert(
                    data.title,
                    data.msg, 'success');
                $('#changePassword').modal('hide');
            } else if (data.status == 300) {
                app.alert(
                    data.title,
                    data.msg, 'error')
                $('#change-password').text('Try Again');

            } else if (data.status == 400) {
                app.alert(
                    data.title,
                    data.msg, 'error')
                $('#change-password').text('Try Again');

            }

        })
        .fail(function(data) {
            app.alert('Oops...', 'Something went wrong! Please try again later', 'error');
            $('#changePassword').modal('hide');
        })
    },

    validatePassword: function(password) {
        if (password.length > 5) {
            return true;
        } else {
            return false;
        }
    },

    validateConfirmation: function(value, confirm) {
        if (value == confirm || value === confirm) {
            return true;
        } else {
            return false;
        }
    },

    validateValue: function(value) {
        if (value == "") {
            return false;
        } else {
            return true;
        }
    },

    init: function(){
        $('#user-password')[0].reset()
        $("#change-password").text("Save");
    }
}
changepassword.start();