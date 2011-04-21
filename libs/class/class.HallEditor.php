<?php
/**
 * @author Elmor
 * @copyright 2011
 */
    class HallEditor
    {
        private $editor;
        private $hallid;
        private $controlls;   
        private $scripts;     
        private $final;
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
            $this->controlls = '<div id="control_panel">
                                    <div class="action"><img src="' . SITE_HOST . 'skins/images/add.png" /></div> 
                                    <div class="action"><img src="' . SITE_HOST . 'skins/images/delete.png" /></div> 
                                
                               </div>';
            return $this->controlls;            
        }
        
        private function switchScripts()
        {
            $this->scripts = '<script type="text/javascript" src="' . SITE_HOST . 'skins/js/main/main.js"></script>';
            
            
            return $this->scripts;
        }
        
        public function seatEditor($hallid ,$ajaxUrl)
        {
            //hall object
            $hall = new Hall($hallid);
            
            //building hall object
            $view = new HallView($hall);
            
            $this->showAll($view);

            
            
            return $this->final;
            
            
        }
        
        //function of formatting output string
        private function ShowAll(HallView $view)
        {
            $this->final = $this->SwitchScripts() . $this->showEditor() . 
                 '<div id="result">' .$view->DrawHall() . '</div>';
            
        }


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