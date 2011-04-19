<?php
/**
 * @author Elmor
 * @copyright 2011
 * interface represents Hall
*/
    interface hallInt
    {
        public function __set($variable,$value);
        public function __isset($name);
        public function __get($variable);
        public function Draw();
        public function Load($hallid);
        public function buildHall();
    
    }
 

?>