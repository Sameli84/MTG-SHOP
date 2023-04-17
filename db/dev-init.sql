CREATE TABLE IF NOT EXISTS `cards` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `set` varchar(60),
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
INSERT INTO `cards` (`name`, `set`) VALUES ('sol ring', '3ed' );
INSERT INTO `cards` (`name`, `set`) VALUES ('mox diamond', 'sth' );
INSERT INTO `cards` (`name`, `set`) VALUES ('black lotus', 'lea');
