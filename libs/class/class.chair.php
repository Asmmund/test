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
 * @method public  Draw() - method of drawing a chair where it's called
*/
    class Chair implements Sitting
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
            $this->Load($r,$number,$hallid);
            
        }
        
        public function Load($r,$number, $hallid)
        {
            try
            {
                if(!$connect = new PDO('mysql:host=' . MYSQL_SERVER . ';dbname=' . MYSQL_DB,MYSQL_USER, MYSQL_PASS))
                    throw new Exception('Error connecting to the Database!');
                
                $query = "SELECT `seatID`, `x`, `y`,
                          `label`, `delimiter`, `categoryID`
                          FROM `seat`
                          WHERE (`row` = " . $r . " ) 
                              AND (`number` = " . $number . ") 
                              AND (`hallid` = " . $hallid .")
                          LIMIT 1;";
                
                if(!$res = $connect->query($query))
                    throw new Exception('Error processing the query!');
                    
                $row = $res->fetch(PDO::FETCH_ASSOC);
        
                $this->row = $r;
                $this->number = $number;
                $this->hallid = $hallid;
        
                $this->id = $row['seatID'];
                $this->x = $row['x'];
                $this->y = $row['y'];
                $this->label = $row['label'];
                $this->delimiter = $row['delimiter'];
                $this->categoryID = $row['categoryID'];
                
                
                $connect = null;
            }
            catch(PDOException $e)
            {
                echo  $e->getMessage();
            }
            
            
        }
        
        protected function Image()
        {
            $image = '<img  class="chair_seat" id="' .$this->id . '"
                      src="' . SITE_HOST .  'skins/images/blue_chair.jpg" title="Seat:'
                      . $this->row .$this->delimiter . ''  . $this->number .' L:' . $this->label . '"
                      alt="" />';
                      
            return $image;
        }
        
        public function Draw()
        {
            return $this->Image();
        }
        
        
    }
?>