CREATE PROCEDURE retrieveEvents (IN userin VARCHAR(30))
BEGIN
SELECT eventID, name, subject, initDate, initTime, endDate, endTime
FROM Events
WHERE eventID IN (SELECT eventID FROM UserEvents WHERE username = userin) OR
eventID IN (SELECT childEvent FROM ComposedEvents WHERE parentEvent IN (SELECT eventID FROM UserEvents WHERE username = userin));
END//