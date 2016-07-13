CREATE TABLE `test2` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `comment` mediumtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

INSERT INTO `test2` (`name`, `time`, `comment`)
VALUES
  ('ERIC', '2016-03-01 00:00:00', 'comment'),
  ('DANIEL', '1986-03-29 00:00:00', 'comment'),
  ('BOB', '1972-06-07 00:00:00', 'comment');
