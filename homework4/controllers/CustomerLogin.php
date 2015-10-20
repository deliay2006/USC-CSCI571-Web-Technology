<?php
    
    class CustomerLogin extends CI_Controller {
        public function __construct() {
            parent::__construct();
            // $this->load->library('session');
            session_save_path("/home/scf-33/juncheny");
            session_start();

            $sessionTime = $_SESSION['ACCESSTIME'];
            $t = time();
            $GLOBALS['errorMsg'] = "";

            if($sessionTime!=null && $t - $sessionTime > 1200) {
                $GLOBALS['errorMsg'] = "TIMEOUT";
                $_SESSION['ACCESSTIME'] = null;
                $_SESSION['ACCESSTIME'] = null;
                $_SESSION['USERID'] = null;
                $_SESSION['USERTYPE'] = null;
                $_SESSION['CUSTOMERID'] = null;
            }
        }

        public function index() {
            if(!$_SESSION["USERID"] == null) {
                $this->load->view('customerLoginView');
            } else {
                if(strlen($GLOBALS['errorMsg']) > 0) {
                    $this->load->view('AjaxResponseView', array("data"=>$GLOBALS['errorMsg']));
                    return;
                }

                if($_SESSION["USERTYPE"] == 4) {
                    require('ShopProducts.php');
                    $spController = new ShopProducts();
                    $spController->index();
                } else {
                    $this->load->view('customerLoginView');
                }
            }
        }

        public function showLogin() {
            $this->load->view('customerLoginView');
        }

        public function login() {
            $un = htmlentities($_POST['username']);
            $pw = htmlentities($_POST['password']);

             if(strlen($un) == 0) {
                 $GLOBALS['errorMsg'] = "Invalid Login.";
             }

             if(strlen($pw) == 0) {
                 $GLOBALS['errorMsg'] = "Invalid Login.";
             }

             if(strlen($un) == 0 && strlen($pw) == 0) {
                $GLOBALS['errorMsg'] = "";
             }

            if(strlen($un) > 0 && strlen($pw) > 0) {
                $this->load->model("Login_model", "model");
                $row = $this->model->index($un, $pw);
                // $this->load->view('AjaxResponseView', array("data"=>$result));

                if($row == 'Invalid Login') {
                    $row = $this->model->managerLogin($un, $pw);
                    // echo $un;
                    // return;
                    if($row == 'Invalid Login') {
                        $this->load->view('AjaxResponseView', array("data"=>$row));
                        return;
                    } else {
                        $_SESSION['ACCESSTIME'] = time();
                        $_SESSION['USERNAME'] = $un;
                        $_SESSION['USERTYPE'] = 2;
                        $_SESSION['USERID'] = $row['USERID'];
                        $_SESSION['CUSTOMERID'] = 0;
                        $this->load->view('AjaxResponseView', array("data"=>$row));
                        return;
                    }
                } else if($row['USERTYPE'] == 4) {
                    $_SESSION['ACCESSTIME'] = time();
                    $_SESSION['USERID'] = $row['USERID'];
                    $_SESSION['USERTYPE'] = 4;
                    $_SESSION['CUSTOMERID'] = $row['CUSTOMERID'];
                    $this->load->view('AjaxResponseView', array("data"=>$row));
                    return;
                } else {
                    $this->load->view('AjaxResponseView', array("data"=>'Invalid Login'));
                }
            } else {
                $this->load->view('customerLoginView');
            }
        }//login

        public function logout() {
            $_SESSION['USERID']=null;
            $_SESSION['ACCESSTIME']=null;
            $_SESSION['USERTYPE']=null;
            $_SESSION['CUSTOMERID']=null;
            $_SESSION['CARTS']=null;
            $this->load->view('AjaxResponseView', array("data"=>'success'));
        }//logout
    }
?>