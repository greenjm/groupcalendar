CREATE PROCEDURE makeMessageGroup(IN user1 VARCHAR(30), IN grpID SMALLINT(5), IN msgIn TEXT)
BEGIN
INSERT INTO GroupMessages(sender, receiver, content)
VALUES(user1, grpID, msgIn);
END//