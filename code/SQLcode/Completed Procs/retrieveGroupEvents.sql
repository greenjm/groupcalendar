CREATE PROCEDURE retrieveGroupEvents (IN grpID SMALLINT(5))
BEGIN
SELECT eventID, name, subject, initDate, initTime, endDate, endTime
FROM Events
WHERE eventID IN (SELECT eventID FROM GroupEvents WHERE groupID = grpID) OR
eventID IN (SELECT childEvent FROM ComposedEvents WHERE parentEvent IN (SELECT eventID FROM GroupEvents WHERE groupID = grpID));
END//