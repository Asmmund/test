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
  
                $query = "SELECT `seat`.`seat_id`,`seat`.`row`, `seat`.`number`,  `seat`.`x`, `seat`.`y`,
                                `seat`.`label`, `seat`.`delimiter`, `seat`.`category_id`,
                                `seatcategory`.`name`, `seatcategory`.`seatcolor`
                           FROM `seat` JOIN `seatcategory`
                           WHERE `seat`.`hall_id` =" . $hallid . " 
                               AND `seat`.`category_id` = `seatcategory`.`seatcategory_id`
                           ORDER BY `row`, `number`;";
                
                if(!$res = $connect->query($query))
                    throw new Exception('Error selecting the seats!');
                    
                while($row = $res->fetch(PDO::FETCH_ASSOC))
                {
                    $this->array_object[] = new Seat($row['seat_id'],$row['row'],$row['number'], 
                                      $hallid, $row['x'],$row['y'],$row['label'],
                                      $row['delimiter'],$row['category_id'],$row['seatcolor']);
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
        
        
        static public function addCategory($params)
        {
            try
            {
               if(!$connect = new PDO('mysql:host=' . MYSQL_SERVER . ';dbname=' . MYSQL_DB,MYSQL_USER, MYSQL_PASS))
                    throw new Exception('Error connecting to the Database!');
                    
  
                $query = "INSERT INTO `seatcategory`( `name`,`seatcolor`)
                          VALUES ('" . $params['name'] . "', '" . $params['color'] . "');";
                          
                if(!$result = $connect->exec($query))
                    throw new Exception('Error inserting  new category!');
                
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
                    
               preg_match('/(-?[0-9]+?)\|(-?[0-9]+?)/s',$params['title'],$matches);
  
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
        
/*

                $query = "UPDATE `seat` 
                          SET `label` = '" . $params['label'] ."'
                          WHERE `seat_id` = " . (int)$params['id'] . " AND `hall_id`= " . (int)$hallid . ";";

*/
  
        //function of editing info
        static public function editInfo($hallid,$params)
        {
            try
            {
               if(!$connect = new PDO('mysql:host=' . MYSQL_SERVER . ';dbname=' . MYSQL_DB,MYSQL_USER, MYSQL_PASS))
                    throw new Exception('Error connecting to the Database!');
                    

                
  
                $query = "UPDATE `seat` 
                          SET `label` = '" . $params['label'] ."'
                          WHERE `seat_id` =  " . (int)$params['id'] . " AND `hall_id`= " . (int)$hallid . ";";
                
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
        
        //method of getting max value of x
        static public function getSeatCategory()
        {
            try
            {
               if(!$connect = new PDO('mysql:host=' . MYSQL_SERVER . ';dbname=' . MYSQL_DB,MYSQL_USER, MYSQL_PASS))
                    throw new Exception('Error connecting to the Database!');
                    

                
  
                $query = "SELECT `seatcategory_id`,`name`, `seatcolor`
                          FROM `seatcategory`;";
                
                if(!$res = $connect->query($query))
                    throw new Exception('Error selecting the seatcategory!');
                    
                while($row = $res->fetch(PDO::FETCH_ASSOC))
                {
                    $result[] = array('type'=>$row);
                }

                echo json_encode(array('seatcategory'=>$result));      
                    
                
                $connect = null;
           }
           catch(PDOException $e)
           {
               echo '<b>' . $e->getMessage() . '</b>';
           }           
            
            
        }
        

    }   
?>