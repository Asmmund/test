CREATE DATABASE IF NOT EXISTS `outsourcing` DEFAULT CHARACTER SET = UTF8; 

USE `outsourcing`;

CREATE TABLE `seat` (
`seatID` INT(11) AUTO_INCREMENT NOT NULL,
`hallid` INT(11) NOT NULL,
`x` INT(11) NOT NULL,
`y` INT(11) NOT NULL,
`label` VARCHAR(30) NOT NULL,
`row` VARCHAR(10) NOT NULL,
`number` VARCHAR(10) NOT NULL,
`delimiter` VARCHAR(10) NOT NULL,
`categoryID` INT(11) NOT NULL,
PRIMARY KEY (`seatID`), 
FOREIGN KEY (`categoryID`) REFERENCES `seatcategory`(`seatid`)
)ENGINE=InnoDB DEFAULT CHARSET=UTF8;

CREATE TABLE `seatcategory` (
`seatid` INT(11) AUTO_INCREMENT NOT NULL,
`name`VARCHAR(100) NOT NULL,
`seatcolor` VARCHAR(100) NOT NULL,
PRIMARY KEY (`seatid`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;


INSERT INTO `seat`(`hallid`,`x`, `y`, `label`, `row`, `number`, `delimiter`,`categoryID`)
VALUES (1, 1,1, 'LABEL', '1','1','/','1' ),
(1, 1, 2, 'LABEL', '1','2','/','1' ),
(1, 1, 3,'LABEL', '1','3','/','1' ),
(1, 1, 4,'LABEL', '1','4','/','1' ),
(1, 1, 5,'LABEL', '1','5','/','1' ),
(1, 1, 6,'LABEL', '1','6','/','1' ),
(1, 2,1, 'LABEL', '2','1','/','1' ),
(1, 2,2, 'LABEL', '2','2','/','1' ),
(1, 2,3, 'LABEL', '2','3','/','1' ),
(1, 2,4, 'LABEL', '2','4','/','1' ),
(1, 2,5, 'LABEL', '2','5','/','1' ),
(1, 2,6, 'LABEL', '2','6','/','1' ),
(1, 3,1, 'LABEL', '3','1','/','1' ),
(1, 3,2, 'LABEL', '3','2','/','1' ),
(1, 3,3, 'LABEL', '3','3','/','1' ),
(1, 3,4, 'LABEL', '3','4','/','1' ),
(1, 3,5, 'LABEL', '3','5','/','1' ),
(1, 3,6, 'LABEL', '3','6','/','1' ),
(1, 4,1, 'LABEL', '4','1','/','1' ),
(1, 4,2, 'LABEL', '4','2','/','1' ),
(1, 4,3, 'LABEL', '4','3','/','1' ),
(1, 4,4, 'LABEL', '4','4','/','1' ),
(1, 4,5, 'LABEL', '4','5','/','1' ),
(1, 4,6, 'LABEL', '4','6','/','1' ),
(1, 5,1, 'LABEL', '5','1','/','1' ),
(1, 5,2, 'LABEL', '5','2','/','1' ),
(1, 5,3, 'LABEL', '5','3','/','1' ),
(1, 5,4, 'LABEL', '5','4','/','1' ),
(1, 5,5, 'LABEL', '5','5','/','1' ),
(1, 5,6, 'LABEL', '5','6','/','1' )