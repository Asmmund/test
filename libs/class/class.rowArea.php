<?php
/**
 * @author Elmor
 * @copyright 2011
 * Class of area of chairs
 * @extends chairRow
 * 
 * @metod public Draw($number, $row, $label) extends: chair::Draw() ->chairRow()
 */
    class rowArea extends chairRow
    {
        public function Draw($number, $row, $label)
        {
            for($i=1;$i<=$this->row;$i++)
            {
                parent::Draw($number, $i, $this->label);
                echo '<br />';
            }
        }
    }
?>