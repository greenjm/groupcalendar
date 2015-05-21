CREATE PROCEDURE addMember (IN userin VARCHAR(30), IN grpIDin SMALLINT(5))
BEGIN
DECLARE done INT DEFAULT FALSE;
DECLARE eventin SMALLINT(5);
DECLARE eventCursor CURSOR FOR
SELECT eventID FROM GroupCreateEvents WHERE groupID = grpIDin;
DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
INSERT INTO InGroup (username, groupID)
VALUES (userin, grpIDin);
OPEN eventCursor;
event_loop: LOOP
FETCH eventCursor INTO eventin;
IF done THEN 
LEAVE event_loop;
END IF;
INSERT INTO UserEvents (username, EventID)
VALUES (userin, eventin);
END LOOP;
CLOSE eventCursor;
END//