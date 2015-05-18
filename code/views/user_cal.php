<!DOCTYPE html>
<?php
	include "head.php";
?>
	
	<link href='../libraries/fullcalendar-2.3.1/fullcalendar.print.css' rel='stylesheet' media='print' />
	<link href='../libraries/fullcalendar-2.3.1/fullcalendar.css' rel='stylesheet' />
	<link href='../styles/user_cal.css' rel='stylesheet' />	
	<script src='../libraries/fullcalendar-2.3.1/lib/moment.min.js'></script>
	<script src='../libraries/fullcalendar-2.3.1/fullcalendar.min.js'></script>

	<script src="../libraries/pickadate.js-3.5.6/lib/picker.js"></script>
    <script src="../libraries/pickadate.js-3.5.6/lib/picker.date.js"></script>
    <script src="../libraries/pickadate.js-3.5.6/lib/picker.time.js"></script>
    <script src="../libraries/pickadate.js-3.5.6/lib/legacy.js"></script>
    <link rel="stylesheet" href="../libraries/pickadate.js-3.5.6/lib/themes/default.css">
	<link rel="stylesheet" href="../libraries/pickadate.js-3.5.6/lib/themes/default.date.css">

    <script src="../javascript/user_cal.js"></script>
</head>
<body>
	<?php include "nav.html"; ?>
<div class='row'>
	<div class='col-md-3' id='left-sect'>
		<h1>Calendar</h1>
		<ul>
			<li><a id="create-form" data-toggle="modal" data-target="#create-modal">Create</a></li>
			<li><a id="delete-form" data-toggle="modal" data-target="#delete-modal">Delete</a></li>
		</ul>
	</div>
	<div class='col-md-6' id='mid-sect'>
		<div id="calendar"></div>
	</div>
	<div class='col-md-3' id='right-sect'>
		<h1>My Groups</h1>
		<br />
		<button type="button" class="btn btn-default" data-toggle="modal" data-target="#group-modal">Create Group</button>
		<div class='list-group' id="groupList">		</div>
	</div>
</div>
	<!--<iframe src="https://www.google.com/calendar/embed?" style="border: 0" width="800" height="600" frameborder="0" scrolling="no"></iframe>-->

	<div class="modal fade" id="create-modal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Create Event</h4>
      </div>
      <div class="modal-body">
        <div class="input-group">
          <span class="input-group-addon" id="eventName">Name</span>
          <input name="e-name" type="text" class="form-control" placeholder="Name" aria-describedby="sizing-addon2" autofocus>
        </div>
        <p></p>
        <div class="input-group">
          <span class="input-group-addon" id="e-subj">Subject</span>
          <input name="e-subj" type="text" class="form-control" placeholder="Subject" aria-describedby="sizing-addon2">
        </div>
        <br />
        <div class='input-group date'>
        	<span class="input-group-addon" id='datetimepicker1'>
         	   <span class="glyphicon glyphicon-calendar"></span> Start
            </span>
            <input name="s-date" type='text' class="form-control datepicker" placeholder="Start Date" />
        </div>
        <br />
        <div class='input-group date'>
        	<span class="input-group-addon" id='datetimepicker2'>
         	   <span class="glyphicon glyphicon-calendar"></span> End
            </span>
            <input name="e-date" type='text' class="form-control datepicker" placeholder="End Date" />
        </div>
		<br />
		<div class='input-group date'>
        	<span class="input-group-addon" id='datetimepicker1'>
         	   <span class="glyphicon glyphicon-time"></span> Start Time
            </span>
            <input name="s-time" type='text' class="form-control timepicker" placeholder="Start Time" />
        </div>
        <br />
        <div class='input-group date'>
        	<span class="input-group-addon" id='datetimepicker1'>
         	   <span class="glyphicon glyphicon-time"></span> End Time
            </span>
            <input name="e-time" type='text' class="form-control timepicker" placeholder="End Time" />
        </div>
        <br />
        <div class="input-group">
          <span class="input-group-addon"><input name="repeat" type="radio" value="0" aria-label="sizing-addon2" checked>None</span>
          <span class="input-group-addon"><input name="repeat" type="radio" value="1" aria-label="sizing-addon2">Daily</span>
          <span class="input-group-addon"><input name="repeat" type="radio" value="2" aria-label="sizing-addon2">Weekly</span>
        </div>
        <br />
		<div class="input-group">
          <span class="input-group-addon" id="e-amt">Amount</span>
          <input name="e-amt" type="text" class="form-control" placeholder="Amount (1-10)" aria-describedby="sizing-addon2">
        </div>

      </div>
      <div class="modal-footer">
        <button type="button" id="e-create-close" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onclick="CreateEvent()">Create</button> <!--onclick is just a call to filler function for now-->
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->


<div class="modal fade" id="delete-modal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Delete Event</h4>
      </div>
      <div class="modal-body">
        <div class="input-group">
          <span class="input-group-addon" id="id-field">EventID</span>
          <input name="e-id" type="text" class="form-control" placeholder="EventID" aria-describedby="sizing-addon2" autofocus>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" id="delete-close" class="btn btn-default" data-dismiss="modal">Close</button>
        <button id="delete-submit" type="button" class="btn btn-primary">Delete</button> <!--onclick is just a call to filler function for now-->
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->


<div class="modal fade" id="group-modal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Create Group</h4>
      </div>
      <div class="modal-body">
        <div class="input-group">
          <span class="input-group-addon" id="gName-field">Name</span>
          <input name="gName" type="text" class="form-control" placeholder="EventID" aria-describedby="sizing-addon2" autofocus>
        </div>
      </div>
      <div class="modal-body">
        <div class="input-group">
          <span class="input-group-addon" id="gPurp-field">Purpose</span>
          <input name="gPurp" type="text" class="form-control" placeholder="EventID" aria-describedby="sizing-addon2" autofocus>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" id="delete-close" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onclick="createGroup()">Create</button> <!--onclick is just a call to filler function for now-->
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

</body>