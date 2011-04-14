<?php
/**
 * @author Elmor
 * @copyright 2011
 * @class generalView
 * General view class - is used to grab information from
 * buffer and output the result
 * 
 * @var private $arr - array of all variables
 * 
 * @method public __construct - magic method that sets $arr['content'] variable
 * @method public  __set  - magic method that lets you set the variables
 * @method public  __get -  magic method that returns variables if they're defined
 * @method public  __toString  - magic method that sets the string representation of the class 
 */
    class generalView
    {
        private $arr = array();
        
        public function __construct($content)
        {
            $this->arr['content'] = $content;
        }
        
        public function __set($name,$value)
        {
            $this->arr[$name] = $value;
        }
        
        public function __get($name)
        {
            if(array_key_exists($name, $this->arr))
                return $this->arr[$name];
            
            $trace = debug_backtrace();
            trigger_error(
                    'Undefined property via __get(): ' . $name .
                    ' in ' . $trace[0]['file'] .
                    ' on line ' . $trace[0]['line'],
                    E_USER_NOTICE);
            return null;        
        }
        
        public function __toString()
        {
            return $this->arr['content'];
            
        }
    }
?>