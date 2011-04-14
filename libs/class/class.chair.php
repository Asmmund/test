<?php
/**
 * @author Elmor
 * @copyright 2011
 * @class chair
 * represents the seating place in the hall
 * 
 * @var private $number - number of a chair in a row
 * @var private $row - number of a row
 * @var private $category - category of a seat
 * @var private $label - label of the chair 
 * 
 * @method public __construct   - magic method expects 4 vars: $number, $row, $category, $label
 * @method public __get - magic method, get the value of the variable
 * @method public __isset - magic method, checks for existanse the variable in a class
 * @method public __set -  magic method,  sets up a variable's value
 * @method public  Draw() - method of drawing a chair where it's called
*/
    class Chair
    {
        protected $number;
        protected $row;
        protected $category;
        protected $label;
        protected $is_selected=false;
        
        
        
        public function __construct( $number, $row, $category, $label)
        {
            $this->number = mysql_escape_string($number);
            $this->row = mysql_escape_string($row);
            $this->category = mysql_escape_string($category);
            $this->label = mysql_escape_string($label);
            
        }
        
        public function __get($variable)
        {
            if(isset($variable))
            {
                return $this->$variable;
            }
            
            $trace = debug_backtrace();
            trigger_error(
                    'Undefined property via __get(): ' . $variable .
                    ' in ' . $trace[0]['file'] .
                    ' on line ' . $trace[0]['line'],
                    E_USER_ERROR );
            return null;
                     
        }
        

        
        public function __set($variable,$value)
        {
            $this->$variable = mysql_escape_string($value);
        }
        
        
        public function __isset($name)
        {
            return isset($this->$name);
        }
        
        
        public function Draw($number, $row, $label)
        {
            echo '<img class="chair_seat" src="' . SITE_HOST . 'skins/images/blue_chair.jpg" title="Ch:' 
                 .$number . ' Row:'. $row .' L:' . $label . '" 
                 alt="Ch:' 
                 .$number . ' Row:'. $row .' L:' . $label . '" />';
        }
        
    }

?>