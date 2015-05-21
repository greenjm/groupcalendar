CREATE PROCEDURE deleteEvent (In IDin smallint(5))
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
DELETE FROM Events
WHERE eventID = eventin;
END LOOP;
CLOSE eventCursor;
DELETE FROM Events
WHERE eventID = IDin;
END//