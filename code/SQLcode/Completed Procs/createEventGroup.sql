CREATE PROCEDURE createEventGroup
(IN groupIn SMALLINT(5), IN eNamein VARCHAR(20), IN startDin DATE, IN startTin TIME, IN endDin DATE, IN endTin TIME, IN descrip TEXT, IN reTypeIn TINYINT(1), IN reAmtIn TINYINT(3))
BEGIN
DECLARE x TINYINT(3);
DECLARE newParent SMALLINT(5);
DECLARE done INT DEFAULT FALSE;
DECLARE groupmem VARCHAR(30);
DECLARE	memCursor CURSOR FOR
SELECT username FROM InGroup WHERE groupID = groupIn;
DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
IF reTypeIn = 0 THEN
INSERT INTO Events(name, endDate, endTime, initDate, initTime, subject, repeatType, repeatAmt)
VALUES (eNamein, endDin, endTin, startDin, startTin, descrip, reTypeIn, reAmtIn);
INSERT INTO GroupCreateEvents(groupID, eventID)
VALUES (groupIn, (SELECT eventID FROM Events WHERE name = eNamein AND initDate = startDin AND endDate = endDin AND subject = descrip));
OPEN memCursor;
group_loop: LOOP
FETCH memCursor INTO groupmem;
IF done THEN 
LEAVE group_loop;
END IF;
INSERT INTO UserEvents(username, eventID)
VALUES (groupmem, (SELECT eventID FROM Events WHERE name = eNamein AND initDate = startDin AND endDate = endDin AND subject = descrip));
END LOOP;
CLOSE memCursor;
ELSEIF reTypeIn = 1 THEN
SET x = reAmtIn;
WHILE x <> 0 DO
INSERT INTO Events(name, endDate, endTime, initDate, initTime, subject, repeatType, repeatAmt)
VALUES (eNamein, endDin, endTin, startDin, startTin, descrip, reTypeIn, reAmtIn);
IF x = reAmtIn THEN
SET newParent = (SELECT eventID FROM Events WHERE name = eNamein AND initDate = startDin AND endDate = endDin AND subject = descrip);
INSERT INTO GroupCreateEvents(groupID, eventID)
VALUES (groupIn, (SELECT eventID FROM Events WHERE name = eNamein AND initDate = startDin AND endDate = endDin AND subject = descrip));
OPEN memCursor;
group_loop: LOOP
FETCH memCursor INTO groupmem;
IF done THEN
LEAVE group_loop;
END IF;
INSERT INTO UserEvents(username, eventID)
VALUES (groupmem, (SELECT eventID FROM Events WHERE name = eNamein AND initDate = startDin AND endDate = endDin AND subject = descrip));
END LOOP;
CLOSE memCursor;
SET reTypeIn = 0;
SET reAmtIn = 0;
ELSE
INSERT INTO ComposedEvents (parentEvent, childEvent)
VALUES (newParent, (SELECT eventID FROM Events WHERE name = eNamein AND initDate = startDin AND endDate = endDin AND subject = descrip));
END IF;
SET x = x - 1;
SET startDin = DATE_ADD(startDin, INTERVAL 1 DAY);
SET endDin = DATE_ADD(endDin, INTERVAL 1 DAY);
END WHILE;
ELSEIF reTypeIn = 2 THEN
SET x = reAmtIn;
WHILE x <> 0 DO
INSERT INTO Events(name, endDate, endTime, initDate, initTime, subject, repeatType, repeatAmt)
VALUES (eNamein, endDin, endTin, startDin, startTin, descrip, reTypeIn, reAmtIn);
IF x = reAmtIn THEN
SET newParent = (SELECT eventID FROM Events WHERE name = eNamein AND initDate = startDin AND endDate = endDin AND subject = descrip);
INSERT INTO GroupCreateEvents(groupID, eventID)
VALUES (groupIn, (SELECT eventID FROM Events WHERE name = eNamein AND initDate = startDin AND endDate = endDin AND subject = descrip));
OPEN memCursor;
group_loop: LOOP
FETCH memCursor INTO groupmem;
IF done THEN
LEAVE group_loop;
END IF;
INSERT INTO UserEvents(username, eventID)
VALUES (groupmem, (SELECT eventID FROM Events WHERE name = eNamein AND initDate = startDin AND endDate = endDin AND subject = descrip));
END LOOP;
CLOSE memCursor;
SET reTypeIn = 0;
SET reAmtIn = 0;
ELSE
INSERT INTO ComposedEvents (parentEvent, childEvent)
VALUES (newParent, (SELECT eventID FROM Events WHERE name = eNamein AND initDate = startDin AND endDate = endDin AND subject = descrip));
END IF;
SET x = x - 1;
SET startDin = DATE_ADD(startDin, INTERVAL 1 WEEK);
SET endDin = DATE_ADD(endDin, INTERVAL 1 WEEK);
END WHILE;
END IF;
END // 