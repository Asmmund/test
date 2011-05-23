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
                          VALUES (:hall_id,:x, :y, :label, :row, :number, :declimer,:category_id );";

               $stmt = $connect->prepare($query);

               if($stmt->execute(array( ':hall_id'=>$hallid ,':x'=>$params['x'], ':y'=>$params['y'], 
                                        ':label'=>$params['label'], ':row'=>$params['row'], ':number'=>$params['number'],
                                        ':declimer'=>$params['delimiter'] ,':category_id'=>$params['categoryID'] )))
                   echo '{"success":"true", "id":"' .$connect->lastInsertId() . '", "hallid":"' . $hallid . '"}' ;
               else
                    throw new Exception('Error inserting the row!!');
                    
                
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
                          WHERE `seat_id` =:seat_id AND `hall_id`= :hall_id;";

               $stmt= $connect->prepare($query);
               if($stmt->execute(array( ':seat_id'=> (int)$params['id'], ':hall_id'=>(int)$hallid)))
                  echo '{"success":"true", "title":"' . $matches[1] . '|'. $matches[2]. '"}';
               else
                    throw new Exception('Error deleting the row!');
                    
                    
                
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
                          SET `label` = :label
                          WHERE `seat_id` =  :seat_id AND `hall_id`= :hall_id;";
               $stmt= $connect->prepare($query);

               if($stmt->execute(array(':label' => $params['label'], 
                                    ':seat_id'=>(int)$params['id'],
                                    ':hall_id' => (int)$hallid)))
                    echo '{"success":"true", "title":"' . $params['row'] . '|'. $params['number']. 'L:' 
                          . $params['label'] .'"}';
               else
                    throw new Exception('Error updating label!');
                    
                    
                
                $connect = null;
                $stmt = null;
           }
           catch(PDOException $e)
           {
               echo '<b>' . $e->getMessage() . '</b>';
           }           
            
        }
        
        //method of getting max value of x
        static public function getHallCategories()
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
        

        
        static public function addCategory($params)
        {
            try
            {
               if(!$connect = new PDO('mysql:host=' . MYSQL_SERVER . ';dbname=' . MYSQL_DB,MYSQL_USER, MYSQL_PASS))
                    throw new Exception('Error connecting to the Database!');
                    
                    
  
                $query = "INSERT INTO `seatcategory`( `name`,`seatcolor`)
                          VALUES (:name, :seatcolor);";
               $stmt= $connect->prepare($query);
               if($stmt->execute(array(':name' => $params['name'], 
                                    ':seatcolor'=>$params['color'])))
                    echo '{"success":"true"}';
               else
                    throw new Exception('Error inserting  new category!');
                
               $connect = null;
           }
           catch(PDOException $e)
           {
               echo '<b>' . $e->getMessage() . '</b>';
           }           
            
        }
                
        static public function deleteCategory( $params)
        {
            try
            {
               if(!$connect = new PDO('mysql:host=' . MYSQL_SERVER . ';dbname=' . MYSQL_DB,MYSQL_USER, MYSQL_PASS))
                    throw new Exception('Error connecting to the Database!');
                $query = "DELETE 
                          FROM `seatcategory`
                          WHERE `seatcategory_id` = " . (int) $params['id']. ";";
                
                if(!$result = $connect->exec($query))
                    throw new Exception('Error deleting the category!');
                    
                echo '{"success":"true", "title":""}';
                    
                
                $connect = null;
           }
           catch(PDOException $e)
           {
               echo '<b>' . $e->getMessage() . '</b>';
           }           
            
        }
        
    static public function getCategoryInfo($params)
    {
        try
        {
               if(!$connect = new PDO('mysql:host=' . MYSQL_SERVER . ';dbname=' . MYSQL_DB,MYSQL_USER, MYSQL_PASS))
                    throw new Exception('Error connecting to the Database!');
               
               $query = 'SELECT `name`, `seatcolor`
                        FROM `seatcategory`
                        WHERE `seatcategory_id` = :seatcategory_id';

               $stmt= $connect->prepare($query);
               
               $stmt->execute(array(':seatcategory_id' => $params['id']));
               
                foreach ($stmt as $row) 
               {
                    $seatcolor = $row['seatcolor'];
                    $name = $row['name'] ;
               }
               
               echo '{"success":"true","name":"' . $name . '", "seatcolor":"'. $seatcolor . '"}'; 
                
               
            
        }
       catch(PDOException $e)
       {
          echo '<b>' . $e->getMessage() . '</b>';
       }           
        
    }
        
    static public function updateCategory($params)
    {
        try
        {
               if(!$connect = new PDO('mysql:host=' . MYSQL_SERVER . ';dbname=' . MYSQL_DB,MYSQL_USER, MYSQL_PASS))
                    throw new Exception('Error connecting to the Database!');
               
               $query = 'UPDATE `seatcategory`
                         SET `name` = :name,
                         `seatcolor` = :seatcolor
                         WHERE `seatcategory_id` = :seatcategory_id';

               $stmt= $connect->prepare($query);
               
               if($stmt->execute(array(':seatcategory_id' => $params['id'], 
                                    ':seatcolor'=>$params['seatcolor'],
                                    ':name' => $params['name'])))
                   echo '{"success":"true"}';
               
        }
       catch(PDOException $e)
       {
          echo '<b>' . $e->getMessage() . '</b>';
       }           
        
    }
    
/*

                $query = "DELETE 
                          FROM `seat`
                          WHERE `seat_id` IN (" . implode(', ', array_map('intval', $params['array_id']))  . ");";
*/    
    static public function deleteSeats($hallid, $params)
    {
            try
            {
               if(!$connect = new PDO('mysql:host=' . MYSQL_SERVER . ';dbname=' . MYSQL_DB,MYSQL_USER, MYSQL_PASS))
                    throw new Exception('Error connecting to the Database!');
                    
                 $temp = explode(',',$params['selected']);
                 $query = "DELETE 
                          FROM `seat`
                          WHERE `seat_id` IN ("  . implode(', ', array_map('intval', $temp) ).  ");";

                    
                    if( $connect->exec($query))
                  echo '{"success":"true"}';
               else
                    throw new Exception('Error deleting seats!');
                    
                    
                
                $connect = null;
           }
           catch(PDOException $e)
           {
               echo '<b>' . $e->getMessage() . '</b>';
           }           
            
        
    }
    

    static public function updateLabels($hallid,$params)
    {
        try
        {
               if(!$connect = new PDO('mysql:host=' . MYSQL_SERVER . ';dbname=' . MYSQL_DB,MYSQL_USER, MYSQL_PASS))
                    throw new Exception('Error connecting to the Database!');
                    
               $temp = explode(',',$params['selected']);
               
               $query = 'UPDATE `seat`
                         SET `label` = :label
                         WHERE `seat_id` IN (' .  implode(', ', array_map('intval', $temp) ).  ") 
                         AND `hall_id` = :hallid;";

               $stmt= $connect->prepare($query);
               
               if($stmt->execute(array(':label' => $params['label'], ':hallid'=>$hallid)))
                   echo '{"success":"true"}';
               else
                    throw new Exception('Error upgrading label of the seats!');
               
        }
       catch(PDOException $e)
       {
          echo '<b>' . $e->getMessage() . '</b>';
       }           
        
    }
    
    static public function changeCategory($hallid, $params)
    {
               if(!$connect = new PDO('mysql:host=' . MYSQL_SERVER . ';dbname=' . MYSQL_DB,MYSQL_USER, MYSQL_PASS))
                    throw new Exception('Error connecting to the Database!');
                    
               $temp = explode(',',$params['selected']);
               
               $query = 'UPDATE `seat`
                         SET `category_id` = :category_id
                         WHERE `seat_id` IN (' .  implode(', ', array_map('intval', $temp) ).  ") 
                         AND `hall_id` = :hallid;";

               $stmt= $connect->prepare($query);
               
               if($stmt->execute(array(':category_id' => $params['categoryID'], ':hallid'=>$hallid)))
                   echo '{"success":"true"}';
               else
                    throw new Exception('Error upgrading category of the seats!');
        
    }
    
    
    static public function squareAdd($hallid, $params)
    {
            try
            {
                if(!$connect = new PDO('mysql:host=' . MYSQL_SERVER . ';dbname=' . MYSQL_DB,MYSQL_USER, MYSQL_PASS))
                    throw new Exception('Error connecting to the Database!');
                $selected_td = $params['selected_td'];

                $query = "INSERT INTO `seat`( `hall_id`,`x`, `y`, 
                         `label`,`row`,`number`,`delimiter`, `category_id`)
                          VALUES " ;
                          
                foreach($selected_td as $cell)
                {
                    $query .= "(" . $hallid . ", '" . (int)$cell['x'] . "','" . (int)$cell['y'] . "',
                            'New Seat', '1','1', '/', " . (int)$params['category_id'] . " ) ,";
                }
                $query = rtrim($query, ',');
                $query .= ";";
                


               if($ids = $connect->exec($query))
                   echo '{"success":"true"}' ;
               else
                    throw new Exception('Error adding square of seats!');
                    
                
               $connect = null;
               
           }
           catch(PDOException $e)
           {
               echo '<b>' . $e->getMessage() . '</b>';
           }           
        
    }
}   
?>