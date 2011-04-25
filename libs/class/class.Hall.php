<?php
/**
 * @author Elmor
 * @copyright 2011
 * @class Hall
 * @var $hallid - the unique id for every hall
 * @var $seats - array of Seat (obj) content of the hall
 * @var $label - the label of the hall... for future
 */
    class Hall
    {
        // array of seat objects
        public $seats = array();
        
        public $hallid;
        
        public $label;
        
        
        
        public function __construct($id)
        {
            //getting the unique key at the start
            $this->hallid = $id;
            
            //load seats for this hall
            $this->LoadSeats();
            
        }
                //function getting number of rows of the hall
        public function GetRows()
        {
            return 5;
        }
        
        //function getting number of chairs per row
        public function GetNumber()
        {
            return 6;
        }
        private function LoadSeats()
        {
            //create object for obtaining info from mysql table
            $repo = new SeatRepository;
            //get the array of objects via the SeatRepository class
            $this->seats = $repo->LoadSeats($this->hallid);
        }
        
    }
?>