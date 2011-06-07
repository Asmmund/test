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
//<td class="group_label"><img id="group_label" src="' . SITE_HOST . 'skins/images/icons/label_group.png" title="Change label of selected seats" /></td>
            $this->controlls = '<table id="control_panel" >
                                <tr>
                                    <td class="select"><img id="select_image" src="' . SITE_HOST . 'skins/images/icons/select_icon.jpg" title="Select multiple seats" /></td>
                                    <td class="square"><img id="square" src="' . SITE_HOST . 'skins/images/icons/squere.png" title="Select square of seats" /></td>
                                    <td class="add"><img id="add_image" src="' . SITE_HOST . 'skins/images/icons/002_01.png" title="Add a seat" /></td>
                                    <td class="remove"><img id="remove_image" src="' . SITE_HOST . 'skins/images/icons/001_02.png" title="Delete a seat" /></td>
                                    <td class="info"><img id="info_image" src="' . SITE_HOST . 'skins/images/icons/label_icon.png" title="Change label of the seat" /></td>
                                    <td class="rotate"><img id="rotate_image" src="' . SITE_HOST . 'skins/images/icons/rotate.png" title="Rotate a seat" /></td>
                                    <td><img id="upload_background" src="' . SITE_HOST . 'skins/images/icons/upload.jpg" title="Upload background of the hall" /></td>
                                </tr>
                                <tr id="multiple_actions">
                                    <td class="group_delete"><img id="group_delete" src="' . SITE_HOST . 'skins/images/icons/delete_group.png" title="Delete selected seats" /></td>
                                    
                                    <td class="group_category"><img id="group_category" src="' . SITE_HOST . 'skins/images/icons/change_group.png" title="Change category of selected seats" /></td>
                                    
                                </tr>
                                <tr id="square_actions">
                                    <td><img id="square_add" src="' . SITE_HOST . 'skins/images/icons/001_01.png" title="Add seats" /></td>
                                    <td><img id="square_remove" src="' . SITE_HOST . 'skins/images/icons/delete_group.png" title="Delete seats" /></td>
                                    <td><img id="square_label" src="' . SITE_HOST . 'skins/images/icons/label_group.png" title="Change label" /></td>
                                    <td><img id="square_category" src="' . SITE_HOST . 'skins/images/icons/change_group.png" title="Change category" /></td>
                                    <td><img id="square_rotate" src="' . SITE_HOST . 'skins/images/icons/rotate.png" title="Rotate selected seats" /></td>
                                    
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
                    SeatRepository::getHallCategories();
                    break;
                case 'add_category':
                    SeatRepository::addCategory($params);
                    break;
                case 'delete_category':
                    SeatRepository::deleteCategory($params);
                    break;
                case 'get_category_info':
                    SeatRepository::getCategoryInfo($params);
                    break;
                case 'update_category':
                    SeatRepository::updateCategory($params);
                    break;
                case 'delete_seats':
                    SeatRepository::deleteSeats($hallid, $params);
                    break;
                case 'update_labels':
                    SeatRepository::updateLabels($hallid, $params);
                    break;
                case 'change_category':
                    SeatRepository::changeCategory($hallid, $params);
                    break;
                    
                case 'square_add':
                    SeatRepository::squareAdd($hallid, $params);
                    break;
                case 'square_set_label':
                    SeatRepository::squareSetLabel($hallid, $params);
                    break;
                    
                        
                default:
                    echo 'No such action!';
                    break;
                    
            }
        }
    }
?>