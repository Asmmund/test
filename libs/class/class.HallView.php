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
            $this->FillGrid();
            return $this->string;
        }

        private function DrawArrows()
        {
            $this->string = "<table > <tr>
                                          <td style=''>" . 
                                          "<img id='up_arrow' src='" . SITE_HOST . "skins/images/up_arrow.jpg'  />
                                          </td>
                                      </tr>"  .
                                      "<tr> 
                                          <td>
                                              <img id='left_arrow' src='" . SITE_HOST . "skins/images/left_arrow.jpg' />
                                          </td>
                                          <td>"  . $this->string . "</td>" .
                                          "<td><img id='right_arrow' src='" . SITE_HOST . "skins/images/right_arrow.jpg' /></td>
                                       </tr>" .
                                       "<tr><td><img id='down_arrow' src='" . SITE_HOST . "skins/images/down_arrow.jpg' /></td></tr>
                              </table>" ;
            
        }


        private function DrawGrid()
        {
            $this->string = '<div>
                         <table border="2">';
            for($i=0; $i<$this->GetRows(); $i++)
            {
                $this->string .= '<tr>';
                for($j=0; $j <$this->GetNumber(); $j++)
                {
                    $this->string .= "<td height='60' width='65'><img src='" . SITE_HOST . "skins/images/empty_grid.jpg' /></td>";
                }
                $this->string .= '</tr>';
                
            }
                      
            $this->string .= '</div>   </table>
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