<?php
/**
 * @author Elmor
 * @copyright 2011
 * @class chair
 * represents the chair in the hall
 * @implements Sitting
 * 
 * @var private $arr - array for all variables
 * 
 * @method public __construct   - magic method expects 4 vars: $number, $row, $category, $label
 * @method public __get - magic method, get the value of the variable
 * @method public __isset - magic method, checks for existanse the variable in a class
 * @method public __set -  magic method,  sets up a variable's value
*/
    class Seat  
    {
        protected $arr = array();
        
        public function __get($variable)
        {
            if(isset($variable))
            {
                return $this->arr[$variable];
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
            $this->arr[$variable] = $value;
        }
        
        
        public function __isset($name)
        {
            return isset($this->arr[$name]);
        }
        
        
        public function __construct( $r,$number, $hallid)
        {
                $this->row = $r;
                $this->number = $number;
                $this->hallid = $hallid;
        
                $this->id = NULL;
                $this->x = NULL;
                $this->y = NULL;
                $this->label = NULL;
                $this->delimiter = NULL;
                $this->categoryID = NULL;
            
        }
        
         
        
    }
?>