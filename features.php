<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="author" content="Theme Region">
        <meta name="description" content="">

        <title>Best m-commerce and mobile payment | PAYit Nigeria</title>

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
        
        <?php require_once("header.php"); ?>
        

        <div class="main-wrapper">
            <div class="container">
                
                <div class="row align-items-center features">
                    <div class="col-lg-6 col-xs-12">
                        <h1>Fund your Account</h1>
                        <p class="lead mt-2 text-dark">You can fund your Payit Account via your Bank Current or Savings Account or via other local or foreign card from any bank.</p>
                    </div>
                    <div class="col-lg-6 col-xs-12 text-right">
                        <img src="images/others/addmoney.png" class="img-fluid">
                    </div>
                </div>

                <div class="row align-items-center features">
                    <div class="col-lg-6 col-xs-12">
                        <h1>Make Payment</h1>
                        <ol class="lead mt-2 text-dark">
                            <li>
                                 To pay a bill, choose a biller to pay to from the appropriate category.
                                <ul>
                                    <li>Type your customer ID and wait for your information</li>
                                    <li>Next, choose the account to pay from, click the ‘Pay’ button and type your Payit PIN.</li>
                                </ul>
                            </li>
                            <li> To pay for airtime, click your desired airtime icon to pay to pay for.
                                <ul>
                                    <li>Type your phone number</li>
                                    <li>Then, Type desired amount starting from N100</li>
                                    <li>Next, click on the ‘Pay’ Button and enter your PIN</li>
                                </ul>
                            </li>
                        </ol>
                    </div>
                    <div class="col-lg-6 col-xs-12 text-right">
                        <img src="images/others/airtime-topup.png" class="img-fluid">
                    </div>
                </div>

                <div class="row align-items-center features">
                    <div class="col-lg-6 col-xs-12">
                        <h1>Send Money</h1>
                        <ul class="lead mt-2 text-dark">
                            <li>To send money from your PAYit account, click the ‘Send Money’ button on the ALAT dashboard.</li>
                            <li>Type in the account number of the receiver and select their bank from the options provided.</li>
                            <li>Next, choose the account to send money from, type in your PAYit PIN and click the ‘Send’ button.</li>
                        </ul>
                    </div>
                    <div class="col-lg-6 col-xs-12 text-right">
                        <img src="images/others/sendmoney.png" class="img-fluid">
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


        <script src="https://bills.payit.ng/js/taffy-min.js"></script>
        <script src="js/sweetalert2.min.js"></script>
        <script src="js/app.js"></script>
        <script>
           var data = null;
           app.start();
        </script>
        <script src="js/bill.js"></script>
        <script src="js/airtime.js"></script>
        <script src="js/topup.js"></script>
        <script src="js/sendmoney.js"></script> 
        <script src="js/main.js"></script>
    </body>
</html> 