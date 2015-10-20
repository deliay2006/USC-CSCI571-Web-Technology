<?php

    class AddOrder extends CI_Controller {
        public function __construct() {
            parent::__construct();
            session_save_path("/home/scf-33/juncheny");
            session_start();

            $GLOBALS['errorMsg'] = "";
            $sessionTime = $_SESSION['ACCESSTIME'];
            $t = time();
            
            if($sessionTime!=null && $t - $sessionTime > 1200) {
                $GLOBALS['errorMsg'] = "TIMEOUT";
                $_SESSION['ACCESSTIME'] = null;
                $_SESSION['ACCESSTIME'] = null;
                $_SESSION['USERID'] = null;
                $_SESSION['USERTYPE'] = null;
                $_SESSION['CUSTOMERID'] = null;
            } else {
                $type = $_SESSION['USERTYPE'];
                if($type."" != "4" ) {
                    $GLOBALS['errorMsg'] = "NOPERMISSION";
                }
            }
        }

        public function index() {
            if(strlen($GLOBALS['errorMsg']) > 0) {
                $this->load->view('AjaxResponseView', array("data"=>$GLOBALS['errorMsg']));
                return;
            }

            $customerId = $_SESSION['CUSTOMERID'];
            $items = $_SESSION['CARTS'];
            $N = count($items);
            
            if($N<1) {
                $GLOBALS['errorMsg'] = "There is no item in your shopping cart.";
            }

            if($customerId<=0) {
                $GLOBALS['errorMsg'] = "Invalid Customer";
            }
        
            if(strlen($GLOBALS['errorMsg']) > 0) {
                $this->load->view('AjaxResponseView', array("data"=>$GLOBALS['errorMsg']));
                return;
            }
            
            $this->load->model("Orders_model", "model");
            $result = $this->model->addOrder($customerId, $items);
            if($result == "success") {
                $_SESSION['CARTS']=null;
            }
            $this->load->view('AjaxResponseView', array("data"=>$result));
        } 
    }
?>