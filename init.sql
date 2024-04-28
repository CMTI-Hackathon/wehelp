CREATE DATABASE  IF NOT EXISTS usersdb ;
USE usersdb;
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    isHelper INT 
) AUTO_INCREMENT=1;
CREATE TABLE IF NOT EXISTS user_sessions (
    id INT UNIQUE,
    creationDate DATETIME,
    session_id INT UNIQUE AUTO_INCREMENT
);
CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    creationDate DATETIME,
    header VARCHAR(255),
    text VARCHAR(1024),
    type VARCHAR(16)
   
);
