CREATE DATABASE IF NOT EXISTS `outsourcing` DEFAULT CHARACTER SET = UTF8; 

USE `outsourcing`;

CREATE TABLE `seat` (
`seat_id` INT(11) AUTO_INCREMENT NOT NULL,
`hall_id` INT(11) NOT NULL,
`x` INT(11) NOT NULL,
`y` INT(11) NOT NULL,
`label` VARCHAR(30) NOT NULL,
`row` VARCHAR(10) NOT NULL,
`number` VARCHAR(10) NOT NULL,
`delimiter` VARCHAR(10) NOT NULL,
`category_id` INT(11) NOT NULL,
PRIMARY KEY (`seat_id`), 
FOREIGN KEY (`category_id`) REFERENCES `seatcategory`(`seatcategory_id`)
)ENGINE=InnoDB DEFAULT CHARSET=UTF8

CREATE TABLE `seatcategory` (
`seatcategory_id` INT(11) AUTO_INCREMENT NOT NULL,
`name`VARCHAR(100) NOT NULL,
`seatcolor` VARCHAR(100) NOT NULL,
PRIMARY KEY (`seatcategory_id`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;

