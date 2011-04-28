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
            try
            {
               if(!$connect = new PDO('mysql:host=' . MYSQL_SERVER . ';dbname=' . MYSQL_DB,MYSQL_USER, MYSQL_PASS))
                    throw new Exception('Error connecting to the Database!');
  
                $query = "SELECT `seat_id`,`row`, `number`,  `x`, `y`,
                                `label`, `delimiter`, `category_id`
                           FROM `seat`
                           WHERE `hall_id` =" . $hallid . "
                           ORDER BY `row`, `number`;";
                
                if(!$res = $connect->query($query))
                    throw new Exception('Error processing the query!');
                    
                while($row = $res->fetch(PDO::FETCH_ASSOC))
                {
                    $this->array_object[] = new Seat($row['seat_id'],$row['row'],$row['number'], 
                                      $hallid, $row['x'],$row['y'],$row['label'],
                                      $row['delimiter'],$row['category_id']);
                }
                
                $connect = null;
              }
              catch(PDOException $e)
              {
                   echo '<b>' . $e->getMessage() . '</b>';
              }
             return $this->array_object;
        }
        


        static public function addSeat($hallid, $params)
        {
            try
            {
               if(!$connect = new PDO('mysql:host=' . MYSQL_SERVER . ';dbname=' . MYSQL_DB,MYSQL_USER, MYSQL_PASS))
                    throw new Exception('Error connecting to the Database!');
                    
  
                $query = "INSERT INTO `seat`( `hall_id`,`x`, `y`, 
                         `label`,`row`,`number`,`delimiter`, `category_id`)
                          VALUES (" . $hallid ."," . $params['x'] .",
                          " . $params['y'] .",'" . $params['label'] ."'," . $params['row'] .",
                          " . $params['number'] .",'" . $params['delimiter'] ."'," 
                          . $params['categoryID'] ." );";
                          
                if(!$result = $connect->exec($query))
                    throw new Exception('Error inserting the row!!');
                    
               echo '{"success":"true", "id":"' .$connect->lastInsertId() . '", "hallid":"' . $hallid . '"}' ;
                
               $connect = null;
           }
           catch(PDOException $e)
           {
               echo '<b>' . $e->getMessage() . '</b>';
           }           
                
    
        }
        
        static public function removeSeat($hallid, $params)
        {
            try
            {
               if(!$connect = new PDO('mysql:host=' . MYSQL_SERVER . ';dbname=' . MYSQL_DB,MYSQL_USER, MYSQL_PASS))
                    throw new Exception('Error connecting to the Database!');
                    
               preg_match('/([0-9]+?)\|([0-9]+?)/s',$params['title'],$matches);
  
                $query = "DELETE 
                          FROM `seat`
                          WHERE `seat_id` =" . (int)$params['id']. " AND `hall_id`= " . (int)$hallid . ";";
                
                if(!$result = $connect->exec($query))
                    throw new Exception('Error deleting the row!');
                    
                echo '{"success":"true", "title":"' . $matches[1] . '|'. $matches[2]. '"}';
                    
                
                $connect = null;
           }
           catch(PDOException $e)
           {
               echo '<b>' . $e->getMessage() . '</b>';
           }           
            
        }
        
        //function of editing info
       
        static public function editInfo($hallid,$params)
        {
            try
            {
               if(!$connect = new PDO('mysql:host=' . MYSQL_SERVER . ';dbname=' . MYSQL_DB,MYSQL_USER, MYSQL_PASS))
                    throw new Exception('Error connecting to the Database!');

                    
  
                $query = "UPDATE `seat` 
                          SET `label` = '" . $params['label'] ."',
                          `row` = " . $params['row'] . " ,
                          `number` = '" . $params['number'] ."'
                          WHERE `seat_id` = 54 AND `hall_id`= 1;";
                
                if(!$result = $connect->exec($query))
                    throw new Exception('Error updating row!');
                    
                echo '{"success":"true", "title":"' . $params['row'] . '|'. $params['number']. 'L:' 
                      . $params['label'] .'"}';
                    
                
                $connect = null;
           }
           catch(PDOException $e)
           {
               echo '<b>' . $e->getMessage() . '</b>';
           }           
            
        }
        

    }   
?>