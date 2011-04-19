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
            $this->$variable = $value;
        }

        public function __isset($name)
        {
            return isset($this->$name);
        }
        
        
        public function __construct( $id)
        {
            $seats = NULL;
            $hallid = (!empty($id)) ? $id : NULL;
            $label = NULL; 
        }
        
    }
?>