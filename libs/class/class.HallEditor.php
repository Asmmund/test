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
            $this->controlls = '<table id="control_panel" >
                                <tr>
                                    <td class="select"><img id="select_image" src="' . SITE_HOST . 'skins/images/select_icon.jpg" /></td>
                                    <td class="add"><img id="add_image" src="' . SITE_HOST . 'skins/images/002_01.png" /></td>
                                    <td class="remove"><img id="remove_image" src="' . SITE_HOST . 'skins/images/001_02.png" /></td>
                                    <td class="info"><img id="info_image" src="' . SITE_HOST . 'skins/images/label_icon.png" /></td>
                                </tr>
                               </table>
                               <div id="div_dropdown_category">
                                  <img src="skins/images/loading.gif" />
                               </div> ';
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
         static public function seatEditorAjax($hallid,$action,$params)
        {
            switch($action)
            {
                case 'add_seat':
                    SeatRepository::addSeat($hallid,$params);
                    break;
                case 'remove_seat':
                    SeatRepository::removeSeat($hallid,$params);
                    break;
                case 'update_info':
                    SeatRepository::editInfo($hallid,$params);
                    break;
                case 'seat_category':
                    SeatRepository::getSeatCategory();
                    break;
                case 'add_category':
                    SeatRepository::addCategory($params);
                    break;
                case 'delete_category':
                    SeatRepository::deleteCategory($params);
                    break;
                case 'check_category':
                    SeatRepository::chechCategoryId($params);
                    break;
                    
                    
                default:
                    echo 'No such action!';
                    break;
                    
            }
        }
    }
?>