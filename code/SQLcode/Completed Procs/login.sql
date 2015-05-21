CREATE PROCEDURE login (IN userin VARCHAR(30))
BEGIN
SELECT password FROM Users WHERE username = userin;
END// 