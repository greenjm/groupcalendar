CREATE PROCEDURE register(IN userin VARCHAR(30), IN namein VARCHAR(70), IN emailin VARCHAR(40), IN passin VARCHAR(255))
this_proc: 
BEGIN 
IF userin IN (SELECT username FROM Users)
THEN SELECT 1;
LEAVE this_proc;
END IF;
INSERT INTO Users (username, name, email, password)
VALUES (userin, namein, emailin, passin);
SELECT 2;
LEAVE this_proc;
END//