<?php
/**
 * @author Elmor
 * @copyright 2011
 * class chairRow - rows of chairs
 * 
 * @method public Draw($number, $row, $label) - draws the row of chairs, uses Chair->Draw() method
 * 
 */
    class chairRow extends Chair
    {
        public function Draw($number, $row, $label)
        {
            for($i=1;$i<=$this->number; $i++)
            {
                parent::Draw($i, $row,  $label);
            }
        }
        
        
        
    }
?>