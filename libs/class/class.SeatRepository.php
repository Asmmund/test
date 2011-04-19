<?php
/**
 * @author Elmor
 * @copyright 2011
 * @class SeatRepository
 * @var $array_object - array of objects
 * @method public function LoadSeats($hallid) - returns an array of Seat objects 
 * based on data from mysql table
 * 
 */
    class SeatRepository
    {
        private $array_object = array();
        
        public function LoadSeats($hallid)
        {
               if(!$connect = new PDO('mysql:host=' . MYSQL_SERVER . ';dbname=' . MYSQL_DB,MYSQL_USER, MYSQL_PASS))
                    throw new Exception('Error connecting to the Database!');
  
                $query = "SELECT `row`, `number`, `seatID`, `x`, `y`,
                                `label`, `delimiter`, `categoryID`
                           FROM `seat`
                           WHERE `hallID` =" . $hallid . "
                           ORDER BY `row`, `number`;";
                
                if(!$res = $connect->query($query))
                    throw new Exception('Error processing the query!');
                    
                while($row = $res->fetch(PDO::FETCH_ASSOC))
                {
                    $array_object[] = new Seat($row['row'],$row['number'], 
                                      $hallid, $row['x'],$row['y'],$row['label'],
                                      $row['delimiter'],$row['categoryID']);
                }
                
                $connect = null;
                return $array_object;
                      
            
        }
    }   
?>