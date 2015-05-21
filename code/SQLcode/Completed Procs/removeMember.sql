CREATE PROCEDURE removeMember (IN userin VARCHAR(30), IN grpIDin SMALLINT(5))
BEGIN
DECLARE done INT DEFAULT FALSE;
DECLARE eventin SMALLINT(5);
DECLARE eventCursor CURSOR FOR
SELECT eventID FROM GroupCreateEvents WHERE groupID = grpIDin;
DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
DELETE FROM InGroup
WHERE username = userin AND groupID = grpIDin;
OPEN eventCursor;
event_loop: LOOP
FETCH eventCursor INTO eventin;
IF done THEN 
LEAVE event_loop;
END IF;
DELETE FROM UserEvents
WHERE username=userin AND eventID = eventin;
END LOOP;
CLOSE eventCursor;
END//