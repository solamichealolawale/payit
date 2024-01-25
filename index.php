<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="author" content="">
        <meta name="description" content="">

        <title>Nigeria’s most convenient cashback m-commerce and payment platform | Payit Nigeria</title>

        <!-- CSS -->
        <link rel="stylesheet" href="css/bootstrap.min.css" >
        <link rel="stylesheet" href="css/font-awesome.min.css">
        <link rel="stylesheet" href="css/animate.css">
        <link rel="stylesheet" href="css/fonts.css">
        <link rel="stylesheet" href="css/slick.css">
        <link rel="stylesheet" href="css/main.css">
        <link rel="stylesheet" href="css/responsive.css">
        <link rel="stylesheet" href="css/pin.css">
        <link rel="stylesheet" href="css/sweetalert2.min.css">

        <!-- font -->
        <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400" rel="stylesheet">

        <!-- icons -->
        <link rel="icon" href="images/ico/favicon.png"> 
        <!-- icons -->

        <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
          <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
          <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->
        
    </head>
    <body>
        <div class="iframe-holder hide">
            <div class="iframe-3dsec">
                <a class="close" id="dismiss">&times;</a>
                <p class="loadingtext mb-0 bold">Please wait.... redirecting to your bank</p>
            </div>
        </div>
        
        <?php require_once("header.php"); ?>

        <?php require_once("banner.php"); ?>

        

        <div class="main-wrapper">
            <div class="container">
                
                <?php require_once("promotion.php"); ?>

                <?php require_once("airtime.php"); ?>

                
                <div class="event-bills">
                    <div class="container">
                        <div class="row">
                            
                            <?php require_once("events.php"); ?>

                            <?php require_once("bills.php"); ?>

                        </div>
                    </div>
                </div>
                
                
            </div><!-- /.container -->   
        </div><!-- /.main-wrapper -->

        <?php require_once("convenience.php"); ?>

        <?php require_once("footer.php"); ?>

        <?php require_once("modals.php"); ?>
                 

        <!-- JS -->
        <script src="js/jquery.min.js"></script>
        <script src="js/tether.min.js"></script>
        <script src="js/bootstrap.min.js"></script>
        <script src="js/slick.min.js"></script>
        <script src="js/jquery-ui-min.js"></script>
        <script src="js/jquery.spinner.min.js"></script>


        <script src="js/taffy.min.js"></script>
        <script src="js/sweetalert2.min.js"></script>
        <script src="js/payment.js"></script>
        <script src="js/app.js"></script>
        <script src="js/bill.js"></script>
        <script>
           var billsData =  localStorage.getItem('billsData');
           var data = null;

           if(billsData == null){
                data = null;
           }else{
                //load bills data into the data variable
                data = JSON.parse(billsData);

                //activate it for view while new data is been cache on the client browser
                if(!app.hasBillStarted){
                    bill.start();
                }

                $("#loader").fadeOut("slow");
                $("#bImageContainer").fadeIn();

                $('.bills-slider').slick('setPosition');
           }
           
           app.start();
        </script>
        <script src="js/history.js"></script> 
        <script src="js/addcard.js"></script>
        <script src="js/airtime.js"></script>
        <script src="js/topup.js"></script>
        <script src="js/sendmoney.js"></script> 
        <script src="js/donate.js"></script> 
        <script src="js/profile.js"></script> 
        <script src="js/changepassword.js"></script> 
        
        <script src="js/main.js"></script>

        <?php
            if(isset($_GET['txn_id'])){
                //process output of transaction
        ?>
        <script>
           var type = "<?php echo $_GET['type']; ?>",
             status = <?php echo $_GET['status']; ?>,
             txn_id = "<?php echo $_GET['txn_id']; ?>",
             token = "<?php echo $_GET['token']; ?>",
             unit = "<?php echo $_GET['unit']; ?>"

             if((status == 1) && ((token!="") && (unit!=""))){
                app.alert("Transaction Successful", "Your " + type +" transaction ID is : " + txn_id + " token is: "+token+" and your unit is "+unit , 'success')
             }else if((status == 0) && ((token!="") && (unit!=""))){
                app.alert("Transaction Failed", "Your " + type +" transaction ID is : " + txn_id + " token is: "+token+" and your unit is "+unit , 'error')
             }else if(status == 1){
                app.alert("Transaction Successful", "Your " + type +" transaction is successful with <br>Transaction ID: " + txn_id , 'success')
             }else{
                app.alert("Transaction Failed", "Your " + type +" transaction failed with <br>Transaction ID: " + txn_id, 'error')
             }

           
        </script>

        <?php

            }
        ?>
    </body>
</html> 