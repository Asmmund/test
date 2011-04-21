<?php
/**
 * @author Elmor
 * @copyright 2011
 */
    class HallView
    {
        private $hall;
        private $string;
        private $controlls;
        
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
        
        public function DrawControlls()
        {
            $this->controlls = '<div id="control_panel">
                                    <div class="action">+</div> 
                                    <div class="action">-</div> 
                                
                               </div>';
            return $this->controlls;
        }

        private function DrawArrows()
        {
            $this->string = '            <div id="output" >
                                 <img id="up_arrow" src="' . SITE_HOST . 
                                                  'skins/images/up_arrow.jpg" width="75" height="42" 
                                                  style="position: relative;bottom:-60px; right:-45px;" /> <br />
                                 <img id="left_arrow" src="' . SITE_HOST . 
                                                  'skins/images/left_arrow.jpg" width="42" height="75"
                                                  style="float: left;position:relative;top:110px; left:-20px"  />' . 
                                                  $this->string . 
                                                  '<img id="right_arrow" src="' . SITE_HOST . 
                                                  'skins/images/right_arrow.jpg" width="42" height="75" 
                                                  style="position:relative;top:100px;left:-120px;" /><br />
                                 <img style="position: relative; bottom: -140px; left:-340px;" 
                                     id="down_arrow" src="' . SITE_HOST . 
                                                  'skins/images/down_arrow.jpg" width="75" height="42" />
                                     </div>';
        }


        private function DrawGrid()
        {
            $this->string = '
                                 <div style="float: left;" id="table">
                                      <table style="border: solid black 1px;" >
                                          <tr  style="border: solid black 1px;" >
                                              <td style="border: solid black 1px;" width="65" height="65" ><img src="' . SITE_HOST . 
                                                  'skins/images/green_chair.jpg" width="61" height="54" /></td>
                                              <td width="65" height="65" style="border: solid black 1px;" ><img src="' . SITE_HOST . 
                                                  'skins/images/green_chair.jpg" width="61" height="54" /></td>
                                              <td width="65" height="65" style="border: solid black 1px;" ><img src="' . SITE_HOST . 
                                                  'skins/images/green_chair.jpg" width="61" height="54" /></td>
                                              <td width="65" height="65" style="border: solid black 1px;"><img src="' . SITE_HOST . 
                                                  'skins/images/green_chair.jpg" width="61" height="54" /></td>
                                              <td width="65" height="65" style="border: solid black 1px;"><img src="' . SITE_HOST . 
                                                  'skins/images/green_chair.jpg" width="61" height="54" /></td>
                                          </tr>
                                          <tr style="border: solid black 1px;">
                                              <td style="border: solid black 1px;" width="65" height="65" ><img src="' . SITE_HOST . 
                                                  'skins/images/green_chair.jpg" width="61" height="54" /></td>
                                              <td style="border: solid black 1px;" width="65" height="65" ><img src="' . SITE_HOST . 
                                                  'skins/images/green_chair.jpg" width="61" height="54" /></td>
                                              <td style="border: solid black 1px;" width="65" height="65" ><img src="' . SITE_HOST . 
                                                  'skins/images/green_chair.jpg" width="61" height="54" /></td>
                                              <td style="border: solid black 1px;" width="65" height="65" ><img src="' . SITE_HOST . 
                                                  'skins/images/green_chair.jpg" width="61" height="54" /></td>
                                              <td style="border: solid black 1px;" width="65" height="65" ><img src="' . SITE_HOST . 
                                                  'skins/images/green_chair.jpg" width="61" height="54" /></td>
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
                                      </table>
                                 </div>
                                 ';
            
                          
        } 
        private function FillGrid()
        {
            
        }
        
        //function getting number of rows of the hall
        private function GetRows()
        {
            return 5;
        }
        
        //function getting number of chairs per row
        private function GetNumber()
        {
            return 6;
        }
        
    }    
?>