<div class="tr-topbar">
    <div class="container clearfix">
        <div class="topbar-right">
            <ul class="tr-list">
                <li><span><a href="javascript:void(0)">Accept Payments</a></span></li>  
                <li><a href="https://xpress.payit.ng/">Track Order</a></li>
                <li><span><a href="https://sell.payit.ng/">Sell on payit</a></span></li> 
                <li><span><a href="https://store.payit.ng/contact-us">Contact Us</a></span></li> 
            </ul>                
        </div>
    </div><!-- /.container -->
</div><!-- /.tr-topbar -->

<div class="topbar-middle">
    <div class="container clearfix">
        <a class="tr-logo logo" href="index.php"><img class="img-fluid" src="images/payit.png" alt="Payit"></a>
        <a class="tr-logo tr-logo-2" href="index.php"><img class="img-fluid" src="images/payit_white.png" style="width:110px" alt="Payit"></a>
        <form class="search-form" id="search-form">
            <input class="form-control" name="search" type="text" placeholder="Search for a Product, Brand or Category">
            <button type="submit" id="search"><i class="fa fa-search"></i></button>
        </form><!-- /.form -->
        <div class="right-content">
            <a class="btn btn-primary" href="javascript:;" id="signUp">Sign Up</a>
            <a style="display: none" id="balanceCon" class="btn pt-0 pb-0">
                <small>Your Balance:</small><br>
                NGN: <span id="balance">0<span class="powerDecimals">.00</span>
            </span>
            
            <!-- <a class="btn px-2 py-0" href="javascript:;"  id="settings" style="display: none"><i class="fa fa-cog fa-2x"></i></a> -->

            <a class="btn btn-primary" href="javascript:void(0)" id="signIn">Login</a>
            <a class="btn btn-primary" style="display: none" href="javascript:void(0)" id="signOut">Logout</a>

            <span class="dropdown" style="display: none;" id="cog">
              <a class="btn px-2 py-0 dropdown-toggle" id="settings" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="javascript:;">
                <i class="fa fa-cog fa-2x"></i>
              </a>
              <span class="dropdown-menu dropdown-menu-right"" aria-labelledby="settings">
                <h3 class="dropdown-header bold text-black">Account Settings</h3>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="javascript:;" id="profileLink">Profile</a>
                <a class="dropdown-item" href="javascript:;" id="addcardLink">Add New Card</a>
                <a class="dropdown-item" href="javascript:;" id="historyLink">Transaction History</a>
                <a class="dropdown-item" href="javascript:;" id="changePasswordLink">Change Password</a>
              </span>
            </span>

        </div>                 
    </div><!-- /.container -->
</div><!-- /.topbar-middle -->         

<div class="tr-menu">
    <nav class="navbar navbar-toggleable-md">
        <div class="container">
            <div class="menu-content">
                <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav"  style="margin:0 auto;">
                        <li class="nav-item">
                            <a class="nav-link" href="index.php#sectionAirtime">Airtime</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="index.php#sectionBill">Bills Payment</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="https://ticket.payit.ng/">Event Tickets</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="https://store.payit.ng/">Shopping</a>      
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="addMoneyLink" href="javascript:;">Add Money</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="sendMoneyLink" href="javascript:;">Send Money</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="donateLink" href="javascript:;">Donate</a>                
                        </li>
                        <li class="nav-item ">
                            <a class="nav-link" href="javascript:void(0)">Media</a>                
                        </li>
                    </ul>
                </div>                         
            </div><!-- /.menu-content -->                   
        </div><!-- /.container -->
    </nav>                                    
        </div><!-- /.tr-menu -->