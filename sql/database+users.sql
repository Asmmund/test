CREATE DATABASE IF NOT EXISTS `tipulitonline` DEFAULT CHARSET = 'UTF8' DEFAULT COLLATE 'utf8_general_ci';

USE `tipulitonline`;

CREATE TABLE IF NOT EXISTS `user`(
`IDuser` INT(11) NOT NULL AUTO_INCREMENT ,
`name` VARCHAR(250) NOT NULL,
`family_name`  VARCHAR(250) NOT NULL,
`status` ENUM('Premium', 'Subscription', 'Free', '6D', 'Open', 'Close') NOT NULL,
`register_date`  DATE NOT NULL,
`address` VARCHAR(250) NOT NULL,
`state` VARCHAR(250) NOT NULL,
`zip` int(20) NOT NULL,
`password`  VARCHAR(250) NOT NULL,
`email` VARCHAR(30) NOT NULL,
`sex` ENUM('m', 'f') NOT NULL,
`dateofbirth` DATE NOT NULL,
`external` ENUM('y', 'n') NOT NULL,
`visits` int(11),
PRIMARY KEY(`IDusers`)


) ENGINE=InnoDB DEFAULT CHARSET = 'UTF8' DEFAULT COLLATE 'utf8_general_ci'
