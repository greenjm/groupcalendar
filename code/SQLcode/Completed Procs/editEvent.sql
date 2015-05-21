CREATE PROCEDURE editEvent (In IDin smallint(5), IN newSub TEXT, IN newName VARCHAR(20))
BEGIN
DECLARE done INT DEFAULT FALSE;
DECLARE eventin SMALLINT(5);
DECLARE eventCursor CURSOR FOR
SELECT childEvent FROM ComposedEvents WHERE parentEvent = IDin;
DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
OPEN eventCursor;
event_loop: LOOP
FETCH eventCursor INTO eventin;
IF done THEN 
LEAVE event_loop;
END IF;
IF newSub = NULL THEN
UPDATE Events
SET name = newName
WHERE eventID = eventin;
ELSEIF newName = NULL THEN
UPDATE Events
SET subject = newSub
WHERE eventID = eventin;
ELSE
UPDATE Events
SET name = newName, subject = newSub
WHERE eventID = eventin;
END IF;
END LOOP;
CLOSE eventCursor;
IF newSub = NULL THEN
UPDATE Events
SET name = newName
WHERE eventID = IDin;
ELSEIF newName = NULL THEN
UPDATE Events
SET subject = newSub
WHERE eventID = IDin;
ELSE
UPDATE Events
SET name = newName, subject = newSub
WHERE eventID = IDin;
END IF;
END//