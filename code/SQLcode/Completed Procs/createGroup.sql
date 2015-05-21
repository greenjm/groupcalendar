CREATE PROCEDURE createGroup(IN userin VARCHAR(30), IN namein VARCHAR(70), IN purpin TEXT)
BEGIN
DECLARE newGroup SMALLINT(5);
INSERT INTO Groups (name, purpose)
VALUES (namein, purpin);
SET newGroup = (SELECT GroupID FROM Groups WHERE name = namein AND purpose = purpin);
INSERT INTO InGroup (username, groupID)
VALUES (userin, newGroup);
END//