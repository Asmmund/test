CREATE DATABASE IF NOT EXISTS `outsourcing`;
USE `outsourcing`;



CREATE TABLE IF NOT EXISTS `seatcategory` (
  `seatcategory_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `seatcolor` varchar(100) NOT NULL,
  PRIMARY KEY (`seatcategory_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `seatcategory`
--

INSERT INTO `seatcategory` (`seatcategory_id`, `name`, `seatcolor`) VALUES
(1, 'normal', 'green'),
(2, 'vip', 'blue');




CREATE TABLE IF NOT EXISTS `seat` (
  `seat_id` int(11) NOT NULL AUTO_INCREMENT,
  `hall_id` int(11) NOT NULL,
  `x` int(11) NOT NULL,
  `y` int(11) NOT NULL,
  `label` varchar(30) NOT NULL,
  `row` varchar(10) NOT NULL,
  `number` varchar(10) NOT NULL,
  `delimiter` varchar(10) NOT NULL,
  `rotate` INT(2) NOT NULL DEFAULT 0,
  `category_id` int(11) NOT NULL,
  PRIMARY KEY (`seat_id`),
  KEY `category_id` (`category_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=51 ;

--
-- Dumping data for table `seat`
--



--
-- Constraints for dumped tables
--

--
-- Constraints for table `seat`
--
ALTER TABLE `seat`
  ADD CONSTRAINT `seat_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `seatcategory` (`seatcategory_id`);

INSERT INTO `seat` (`seat_id`, `hall_id`, `x`, `y`, `label`, `row`, `number`, `delimiter`, `category_id`) VALUES
(47, 1, 1, 1, 'Added by Ajax', '1', '1', '/', 1),
(48, 1, 1, 2, 'Added by Ajax', '1', '1', '/', 1),
(49, 1, 3, 4, 'Added by Ajax', '1', '1', '/', 1),
(50, 1, 1, 7, 'Added by Ajax', '1', '1', '/', 1);