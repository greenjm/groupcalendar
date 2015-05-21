CREATE PROCEDURE retrieveGroups (IN userin VARCHAR(30))
BEGIN
SELECT groupID, name, purpose
FROM Groups
WHERE groupID IN (SELECT groupID FROM InGroup WHERE username = userin);
END//