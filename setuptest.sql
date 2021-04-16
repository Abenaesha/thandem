
DROP DATABASE IF EXISTS test;

CREATE DATABASE test;

\c test;

CREATE TABLE hello (id INT, word VARCHAR);

INSERT INTO hello (id, word) VALUES (5, 'hello'), (10, 'bye');