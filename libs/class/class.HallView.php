<?php
/**
 * @author Elmor
 * @copyright 2011
 */
    class HallView
    {
        private $hall;
        private $string;

        
        public function __construct($hall)
        {
            $this->hall = $hall;
        }
        
        public function DrawHall()
        {
            $this->DrawGrid();
            $this->DrawArrows();
            //$this->FillGrid();
            return $this->string;
        }
        

        private function DrawArrows()
        {
            $this->string = ' <div id="output" >
                                 <img id="up_arrow" src="' . SITE_HOST . 
                                                  'skins/images/up_arrow.jpg" width="75" height="42" 
                                                  style="position: relative;left:150px;margin-bottom:15px;" /> <br />
                                 <img id="left_arrow" src="' . SITE_HOST . 
                                                  'skins/images/left_arrow.jpg" width="42" height="75"
                                                  style="float: left;position:relative;top:55px; left:-20px"  />' . 
                                                  $this->string . 
                                                  '<img id="right_arrow" src="' . SITE_HOST . 
                                                  'skins/images/right_arrow.jpg" width="42" height="75" 
                                                  style="position:relative;top:50px; left:10px;" /><br />
                                 <img style="position: relative;left:-200px;top:140px; margin-top:10px" 
                                     id="down_arrow" src="' . SITE_HOST . 
                                                  'skins/images/down_arrow.jpg" width="75" height="42" />
                                     </div>';
        }


        private function DrawGrid()
        {
            $this->string = '
                                 <div style="float: left;" >
                                      <table style="border: solid black 1px;" id="table">
                                      <tbody>
                                          <tr  style="border: solid black 1px;" >
                                              <td style="border: solid black 1px;" width="65" height="65" ><img 
                                                  class="seat" src="' . SITE_HOST .'skins/images/green_chair.jpg" width="61" height="54" /></td>
                                              <td width="65" height="65" style="border: solid black 1px;" ><img 
                                                  class="seat" src="' . SITE_HOST . 'skins/images/green_chair.jpg" width="61" height="54" /></td>
                                              <td width="65" height="65" style="border: solid black 1px;" ><img 
                                                  class="seat" src="' . SITE_HOST .'skins/images/green_chair.jpg" width="61" height="54" /></td>
                                              <td width="65" height="65" style="border: solid black 1px;"><img 
                                                  class="seat" src="' . SITE_HOST . 'skins/images/green_chair.jpg" width="61" height="54" /></td>
                                              <td width="65" height="65" style="border: solid black 1px;"><img 
                                                      class="seat" src="' . SITE_HOST . 'skins/images/green_chair.jpg" width="61" height="54" /></td>
                                          </tr>
                                          <tr style="border: solid black 1px;">
                                              <td style="border: solid black 1px;" width="65" height="65" ><img 
                                                  class="seat" src="' . SITE_HOST . 'skins/images/green_chair.jpg" width="61" height="54" /></td>
                                              <td style="border: solid black 1px;" width="65" height="65" ><img 
                                                  class="seat" src="' . SITE_HOST . 'skins/images/green_chair.jpg" width="61" height="54" /></td>
                                              <td style="border: solid black 1px;" width="65" height="65" ><img 
                                                  class="seat" src="'. SITE_HOST . 'skins/images/green_chair.jpg" width="61" height="54" /></td>
                                              <td style="border: solid black 1px;" width="65" height="65" ><img 
                                                  class="seat" src="'. SITE_HOST . 'skins/images/green_chair.jpg" width="61" height="54" /></td>
                                              <td style="border: solid black 1px;" width="65" height="65" ><img 
                                                  class="seat" src="'. SITE_HOST . 'skins/images/green_chair.jpg" width="61" height="54" /></td>
                                                                                </tr>
                                          <tr style="border: solid black 1px;">
                                              <td style="border: solid black 1px;" width="65" height="65" ><img 
                                                   src="' . SITE_HOST . 
                                                  'skins/images/empty_chair.jpg" width="61" height="54" class="seat" /></td>
                                              <td style="border: solid black 1px;" width="65" height="65" ><img 
                                                  src="' . SITE_HOST . 
                                                  'skins/images/empty_chair.jpg" width="61" height="54" class="seat" /></td>
                                              <td style="border: solid black 1px;" width="65" height="65" ><img 
                                                  src="' . SITE_HOST . 
                                                  'skins/images/empty_chair.jpg" width="61" height="54" class="seat" /></td>
                                              <td style="border: solid black 1px;" width="65" height="65" ><img 
                                              src="' . SITE_HOST . 
                                                  'skins/images/empty_chair.jpg" width="61" height="54" class="seat" /></td>
                                              <td style="border: solid black 1px;" width="65" height="65" ><img 
                                              src="' . SITE_HOST . 
                                                  'skins/images/empty_chair.jpg" width="61" height="54" class="seat"/></td>
                                          </tr>
                                         </tbody>
                                      </table>
                                 </div>';
        }
/**
 * 
*/        
         
        private function FillGrid()
        {
            
        }
        

        
    }    
?>