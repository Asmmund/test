<?php
/**
 * @author Elmor
 * @copyright 2011
 */
    class Hall
    {
        // array of seat objects
        public $seats = array();
        
        public $hallid;
        
        public $label;
        

        public function __isset($name)
        {
            return isset($this->$name);
        }
        
        
        public function __construct($id)
        {
            $this->hallid = $id;
            
            $this->LoadSeats();
            
        }
        
        private function LoadSeats()
        {
            $repo = new SeatRepository;
            $this->seats = $repo->LoadSeats($this->hallid);
        }
        
    }
?>