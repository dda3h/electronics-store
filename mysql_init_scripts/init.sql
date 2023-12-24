CREATE DATABASE electronics_store;

USE electronics_store;

CREATE TABLE users (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(16) NOT NULL,
	email VARCHAR(32) NOT NULL,
	password VARCHAR(60) NOT NULL,
	verification_link VARCHAR(36) NOT NULL,
	is_verified TINYINT(1) DEFAULT 0
);

CREATE TABLE tokens (
	user_id INT NOT NULL PRIMARY KEY,
	refresh_token VARCHAR(500) NOT NULL,
	CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE cart (
	id INT AUTO_INCREMENT PRIMARY KEY,
	user_id INT NOT NULL,
	item_id INT NOT NULL,
	item_quantity INT NOT NULL,
	CONSTRAINT cart_user_fk FOREIGN KEY (user_id) REFERENCES users (id)
);
