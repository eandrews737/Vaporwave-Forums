CREATE TABLE test2 {
	id int(11) NOT NULL AUTO_INCREMENT,
	name varchar(50),
	dob int(11) NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (id)
)	Engine=InnoDB	DEFAULT CHARSET=utf8 AUTO_INCREMENT=5;

INSERT INTO test2 (id, name, dob) VALUES
(1, ‘Eric’, 0206),
(2, ‘John’, 0609),
(3, ‘Jacob’, 1203);