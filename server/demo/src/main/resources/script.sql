CREATE DATABASE testdb;

USE testdb;

CREATE TABLE employee (
    id INTEGER NOT NULL,
    mobile VARCHAR(11) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50) NOT NULL,
    gender INT NULL,
    birth_day DATE NULL,
    mail NVARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
)  ENGINE=INNODB
