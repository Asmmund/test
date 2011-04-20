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
        }
*/        
        
        
        //method of showing editor
        private function showEditor()
        {
            
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
            SeatRepository::AddChair($hallid,$params);
                
        }
    }
?>