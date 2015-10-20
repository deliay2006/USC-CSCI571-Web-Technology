<?php
    class EditProfile extends CI_Controller {
        public function __construct() {
            parent::__construct();
            session_save_path("/home/scf-33/juncheny");
            session_start();

            $sessionTime = $_SESSION['ACCESSTIME'];
            $t = time();
            $GLOBALS['errorMsg'] = "";

            if($sessionTime!=null && $t - $sessionTime > 1200) {
                $errorMsg = "TIMEOUT";
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
            $this->load->view('EditProfileView');
        } 

        public function editProfile() {
            if(strlen($GLOBALS['errorMsg']) > 0) {
                $this->load->view('AjaxResponseView', array("data"=>$GLOBALS['errorMsg']));
                return;
            }
            
            $userId = $_SESSION['USERID'];
            $this->load->model("Profile_model", "model");
            $result = $this->model->index($userId);
            $this->load->view('AjaxResponseView', array("data"=>$result));
        }
    }
?>