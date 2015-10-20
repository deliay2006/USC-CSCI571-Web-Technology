<?php
    class Advertisments extends CI_Controller {
        public function __construct() {
            parent::__construct();
        }

        public function index() {
            $date = time()*1000;
            $this->load->model("Adverts_model", "model");
            $result = $this->model->index($date);
            $this->load->view('AjaxResponseView', array("data"=>$result));
        }
    }
?>