CREATE PROCEDURE createEventUser
(IN userin VARCHAR(30), IN eNamein VARCHAR(20), IN startDin DATE, IN startTin TIME, IN endDin DATE, IN endTin TIME, IN descrip TEXT, IN reTypeIn TINYINT(1), IN reAmtIn TINYINT(3))
BEGIN
DECLARE x TINYINT(3);
DECLARE newParent SMALLINT(5);
IF reTypeIn = 0 THEN
INSERT INTO Events(name, endDate, endTime, initDate, initTime, subject, repeatType, repeatAmt)
VALUES (eNamein, endDin, endTin, startDin, startTin, descrip, reTypeIn, reAmtIn);
INSERT INTO UserCreateEvents(creator, eventID)
VALUES (userin, (SELECT eventID FROM Events WHERE name = eNamein AND initDate = startDin AND endDate = endDin AND subject = descrip));
INSERT INTO UserEvents(username, eventID)
VALUES (userin, (SELECT eventID FROM Events WHERE name = eNamein AND initDate = startDin AND endDate = endDin AND subject = descrip));
ELSEIF reTypeIn = 1 THEN
SET x = reAmtIn;
WHILE x <> 0 DO
INSERT INTO Events(name, endDate, endTime, initDate, initTime, subject, repeatType, repeatAmt)
VALUES (eNamein, endDin, endTin, startDin, startTin, descrip, reTypeIn, reAmtIn);
IF x = reAmtIn THEN
SET newParent = (SELECT eventID FROM Events WHERE name = eNamein AND initDate = startDin AND endDate = endDin AND subject = descrip);
INSERT INTO UserCreateEvents(creator, eventID)
VALUES (userin, (SELECT eventID FROM Events WHERE name = eNamein AND initDate = startDin AND endDate = endDin AND subject = descrip));
INSERT INTO UserEvents(username, eventID)
VALUES (userin, (SELECT eventID FROM Events WHERE name = eNamein AND initDate = startDin AND endDate = endDin AND subject = descrip));
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
INSERT INTO UserCreateEvents(creator, eventID)
VALUES (userin, (SELECT eventID FROM Events WHERE name = eNamein AND initDate = startDin AND endDate = endDin AND subject = descrip));
INSERT INTO UserEvents(username, eventID)
VALUES (userin, (SELECT eventID FROM Events WHERE name = eNamein AND initDate = startDin AND endDate = endDin AND subject = descrip));
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