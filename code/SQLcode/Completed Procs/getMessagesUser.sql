CREATE PROCEDURE getMessagesUser(IN userin VARCHAR(30))
BEGIN
SELECT sender, content, msgStamp
FROM UserMessages
WHERE receiver = userin;
END//