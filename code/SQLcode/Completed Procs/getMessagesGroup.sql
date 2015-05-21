CREATE PROCEDURE getMessagesGroup(IN grpID SMALLINT(5))
BEGIN
SELECT sender, content, msgStamp
FROM GroupMessages
WHERE receiver = grpID;
END//