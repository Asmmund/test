<?php
/**
 * @author Elmor
 * @copyright 2011
 */
    class HallEditor
    {
        private $editor;
        private $hallid;
        
/*        public function __construct($hallid)
        {
            $this->hallid = $hallid;
        }
        //function 
        private function AjaxQuery($hallId ,$ajaxUrl)
        {
            switch($ajaxUrl)
            {
                
            }
            
            
        }
*/        
        // method of showing arrows
        private function showArrows()
        {
            $arrows =  "<img src='" . SITE_HOST . "skins/images/up_arrow.jpg' />" .
                       "<img src='" . SITE_HOST . "skins/images/right_arrow.jpg' />" .
                       "<img src='" . SITE_HOST . "skins/images/down_arrow.jpg' />" .
                       "<img src='" . SITE_HOST . "skins/images/left_arrow.jpg' />" ;
            
            return $arrows;
        }
        
        //method of showing editor
        private function showEditor()
        {
            return $this->showArrows();
        }
        
        public function seatEditor($hallid ,$ajaxUrl)
        {
            echo $this->showEditor();
            
            
        }
        
        //funciton of adding a chair to $hallid


              //this function needs to be exposed under the $ajaxUrl
              //it contains the logic to handle an Ajax call (e.g. save a new seat)        }
        public function seatEditorAjax($hallId,$action,$params)
        {
            switch($action)
            {
                case 'addchair':
                    $this->addchair($hallId,$params);
                    break;
            
                    
            }
        }
        //fuciton of adding a chair to mysql table
        private function addchair($hallid,$params)
        {
            try
            {
               if(!$connect = new PDO('mysql:host=' . MYSQL_SERVER . ';dbname=' . MYSQL_DB,MYSQL_USER, MYSQL_PASS))
                    throw new Exception('Error connecting to the Database!');
  
                $query = "INSERT INTO `seat`( `hallid`,`x`, `y`, 
                         `label`,`row`,`number`,`delimiter`, `categoryID`)
                          VALUES (" . $hallid ."," . $params['x'] .",
                          " . $params['y'] .",'" . $params['label'] ."'," . $params['row'] .",
                          " . $params['number'] .",'" . $params['delimiter'] ."'," 
                          . $params['categoryID'] ." );";
                
                if(!$result = $connect->exec($query))
                    throw new Exception('Error inserting the row!!');
                    
                
                $connect = null;
           }
           catch(PDOException $e)
           {
               echo '<b>' . $e->getMessage() . '</b>';
           }           
                
            
        }
    }
?>