CREATE PROCEDURE makeMessageUser(IN user1 VARCHAR(30), IN user2 VARCHAR(30), IN msgIn TEXT)
BEGIN
INSERT INTO UserMessages(sender, receiver, content)
VALUES(user1, user2, msgIn);
END//