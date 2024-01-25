var profile = {
    isLive: app.isLiveApp,
    userImage: null,

    start: function() {
        document.getElementById("update-profile").addEventListener("click", function(event) {
            event.preventDefault()
            $(this).text("Loading...");
            profile.updateProfile();
        });

        function toDataURL(src, callback, outputFormat) {
          var img = new Image();
          img.crossOrigin = 'Anonymous';
          img.onload = function() {
            var canvas = document.createElement('CANVAS');
            var ctx = canvas.getContext('2d');
            canvas.height = this.naturalHeight;
            canvas.width = this.naturalWidth;
            ctx.drawImage(this, 0, 0);
            var dataURL = canvas.toDataURL(outputFormat);
            callback(dataURL);
          };
          img.src = src;
          // if (img.complete || img.complete === undefined) {
          //   // img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
          //   img.src = src;
          // }
        }

        app.element('profile-fn').value = app.db().select("firstname");
        app.element('profile-ln').value = app.db().select("lastname");
        app.element('profile-em').value = app.db().select("email");
        app.element('profile-ph').value = app.db().select("phone");
        var proSrc = app.API + '/storage/' + app.db().select("avatar")
        $('#img-upload').attr('src', proSrc);

         toDataURL(proSrc,  function(dataImg){ 
                                userImage = dataImg
                            })


        //read URL to preview the image
        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('#img-upload').attr('src', e.target.result);
                    // console.log(reader.result);
                    userImage = reader.result;
                }
                reader.readAsDataURL(input.files[0]);
            }
        }

        // on change of the input type file
        $("#imgInp").change(function(){
            //if the image selected is greater than 500Kb ignore the image and reset the image placeholder
            if (Math.round(this.files[0].size/1024) >= 512){
                app.alert('Oops','Image size is greater than 500kb Please reduce the size and try again', 'warning');
                $(this).val("");
                return false;
            }else{
                //preview the image
                readURL(this);
            }
        });


    },
    updateProfile: function(e) {
        $.post(app.API + '/web/edit/profile', {
            'user': app.db().select("id"),
            'firstname': app.value('profile-fn'),
            'lastname': app.value('profile-ln'),
            'email': app.value('profile-em'),
            'phone': app.value('profile-ph'),
            'avatar': userImage
        })
        .done(function(data) {

            if (data.status == 200) {
                //update the user details in the db
                /*app.db().update({
                    'firstname':data.info.firstname,
                    'lastname': data.info.lastname,
                    'email': data.info.email,
                    'phone': data.info.phone,
                    'avatar': data.info.avatar
                }); */

                app.db().remove();
                //save the user details
                
                app.db.insert(data.info);

                app.alert(
                    data.title,
                    data.msg, 'success');

                $('#profile').modal('hide');
                // $('#user-profile')[0].reset();

            } else if (data.status == 300) {
                app.alert(
                    data.title,
                    data.msg, 'error');
                $("#update-profile").text("Try Again");
            } else if (data.status == 400) {
                app.alert(
                    data.title,
                    data.msg, 'error');
                $("#update-profile").text("Try Again");
            }

        })
        .fail(function(data) {
            app.alert('Oops...', 'Something went wrong! Please try again later', 'error');
            $('#profile').modal('hide');
        })
    }
}
profile.start();