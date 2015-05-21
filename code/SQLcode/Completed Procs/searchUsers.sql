CREATE PROCEDURE searchUsers(IN userTest TEXT)
BEGIN
SELECT username
FROM Users
WHERE username LIKE userTest;
END//