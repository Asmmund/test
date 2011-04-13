<?php
/**
 * @author Elmor
 * @copyright 2011
 * @class generalView
 * General view class - is used to grab information from
 * buffer and output the result
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