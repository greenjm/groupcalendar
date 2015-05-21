CREATE PROCEDURE deleteGroup (IN grpIDin SMALLINT(5))
BEGIN
DECLARE done INT DEFAULT FALSE;
DECLARE eventin SMALLINT(5);
DECLARE eventCursor CURSOR FOR
SELECT eventID FROM GroupCreateEvents WHERE groupID = grpIDin;
DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
OPEN eventCursor;
event_loop: LOOP
FETCH eventCursor INTO eventin;
IF done THEN 
LEAVE event_loop;
END IF;
CALL deleteEvent(eventin);
END LOOP;
CLOSE eventCursor;
DELETE FROM Groups
WHERE groupID = grpIDin;
END//