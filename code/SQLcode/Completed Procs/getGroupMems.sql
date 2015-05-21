CREATE PROCEDURE getGroupMems(IN grpIDin SMALLINT(5))
BEGIN
SELECT username FROM InGroup WHERE groupID = grpIDin;
END//