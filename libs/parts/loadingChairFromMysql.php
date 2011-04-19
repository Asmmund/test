<?php
/**
 * @author Elmor
 * @copyright 2011
 */
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

?>