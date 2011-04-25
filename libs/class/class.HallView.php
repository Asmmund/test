<?php
/**
 * @author Elmor
 * @copyright 2011
 */
    class HallView
    {
        private $hall;
        private $string;
        public $x ;
        public $y = 0;
        

        
        public function __construct(Hall $hall)
        {
            $this->hall = $hall;
            $this->getMax();
        }

        private function getMax()
        {
            foreach($this->hall->seats as $seat)
            {
                if($seat ->x > $this->x )
                    $this->x = $seat ->x;
                    
                if($seat->y > $this->y)
                    $this->y = $seat->y;
            }
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
            $this->string = ' 
                                 <div id="up_arrow">
                                     <img src="' . SITE_HOST . 
                                         'skins/images/up_arrow.jpg" width="75" height="42" />
                                  </div> <br />
                                  
                                 <div id="left_arrow" >
                                     <img  src="' . SITE_HOST . 
                                         'skins/images/left_arrow.jpg"  width="42" height="75" />
                                 </div>' . 
                                 $this->string . 
                                 '<div id="right_arrow" style="">
                                     <img  src="' . SITE_HOST . 
                                         'skins/images/right_arrow.jpg" width="42" height="75" />
                                 </div><br />
                                         
                                <div id="down_arrow" style="">
                                    <img src="' . SITE_HOST . 
                                        'skins/images/down_arrow.jpg" width="75" height="42" />
                                </div>
                             </div>';
        }


        private function DrawGrid()
        {
            $this->string = '<div id="grid" >
                                      <table id="table">
                                          <tr>
                                              <td>
                                                  <img class="seat" src="' . SITE_HOST . 'skins/images/empty_chair.jpg"  />
                                              </td>
                                              <td>
                                                  <img class="seat" src="' . SITE_HOST . 'skins/images/empty_chair.jpg"  />
                                              </td>
                                              <td>
                                                  <img class="seat" src="' . SITE_HOST . 'skins/images/empty_chair.jpg"  />
                                              </td>
                                              <td>
                                                  <img class="seat" src="' . SITE_HOST . 'skins/images/empty_chair.jpg"  />
                                              </td>
                                              <td>
                                                  <img class="seat" src="' . SITE_HOST . 'skins/images/empty_chair.jpg"  />
                                              </td>
                                          </tr>
                                      
                                          <tr>
                                              <td>
                                                  <img class="seat" src="' . SITE_HOST . 'skins/images/green_chair.jpg"  />
                                              </td>
                                              <td>
                                                  <img class="seat" src="' . SITE_HOST . 'skins/images/green_chair.jpg"  />
                                              </td>
                                              <td>
                                                  <img class="seat" src="' . SITE_HOST . 'skins/images/green_chair.jpg"  />
                                              </td>
                                              <td>
                                                  <img class="seat" src="' . SITE_HOST . 'skins/images/green_chair.jpg"  />
                                              </td>
                                              <td>
                                                  <img class="seat" src="' . SITE_HOST . 'skins/images/green_chair.jpg"  />
                                              </td>
                                          </tr>

                                          <tr>
                                              <td>
                                                  <img class="seat" src="' . SITE_HOST . 'skins/images/green_chair.jpg"  />
                                              </td>
                                              <td>
                                                  <img class="seat" src="' . SITE_HOST . 'skins/images/green_chair.jpg"  />
                                              </td>
                                              <td>
                                                  <img class="seat" src="' . SITE_HOST . 'skins/images/green_chair.jpg"  />
                                              </td>
                                              <td>
                                                  <img class="seat" src="' . SITE_HOST . 'skins/images/green_chair.jpg"  />
                                              </td>
                                              <td>
                                                  <img class="seat" src="' . SITE_HOST . 'skins/images/green_chair.jpg"  />
                                              </td>
                                          </tr>

                                          <tr>
                                              <td>
                                                  <img class="seat" src="' . SITE_HOST . 'skins/images/empty_chair.jpg"  />
                                              </td>
                                              <td>
                                                  <img class="seat" src="' . SITE_HOST . 'skins/images/empty_chair.jpg"  />
                                              </td>
                                              <td>
                                                  <img class="seat" src="' . SITE_HOST . 'skins/images/empty_chair.jpg"  />
                                              </td>
                                              <td>
                                                  <img class="seat" src="' . SITE_HOST . 'skins/images/empty_chair.jpg"  />
                                              </td>
                                              <td>
                                                  <img class="seat" src="' . SITE_HOST . 'skins/images/empty_chair.jpg"  />
                                              </td>
                                          </tr>
                                      </table>
                                      </div>
                                 ';
        }
        
        private function seatExists($x,$y)
        {
            foreach($this->hall->seats as $seat)
            {
                if( ($seat->x == $x) && ($seat->y == $y) )
                    return true;
                
                return false;
            }
            
        }
         
        private function FillGrid()
        {
            
        }
        

        
    }    
?>