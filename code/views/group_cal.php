<!DOCTYPE html>
<?php
	include "head.php";
?>
	<link href='../libraries/fullcalendar-2.3.1/fullcalendar.print.css' rel='stylesheet' media='print' />
	<link href='../libraries/fullcalendar-2.3.1/fullcalendar.css' rel='stylesheet' />
	<script src='../libraries/fullcalendar-2.3.1/lib/moment.min.js'></script>
	<script src='../libraries/fullcalendar-2.3.1/fullcalendar.min.js'></script>

	<script src="../libraries/pickadate.js-3.5.6/lib/picker.js"></script>
    <script src="../libraries/pickadate.js-3.5.6/lib/picker.date.js"></script>
    <script src="../libraries/pickadate.js-3.5.6/lib/picker.time.js"></script>
    <script src="../libraries/pickadate.js-3.5.6/lib/legacy.js"></script>
    <link rel="stylesheet" href="../libraries/pickadate.js-3.5.6/lib/themes/default.css">
	<link rel="stylesheet" href="../libraries/pickadate.js-3.5.6/lib/themes/default.date.css">
	<script src="../javascript/group_cal.js"></script>

</head>
<body>
<?php include "nav.html"; ?>
<div class='row'>
	<div class='col-md-3' id='left-sect'>
		<h1 id="groupname"></h1>
		<ul>
			<li><a id="create-form" data-toggle="modal" data-target="#create-modal">Create</a></li>
			<li><a id="delete-form" onclick="deleteGroup()">Delete this group</a></li>
		</ul>
	</div>
	<div class='col-md-6' id='mid-sect'>
		<div id="calendar"></div>
	</div>
	<div class='col-md-3' id='right-sect'>
		<h1>Members</h1>
		<br />
		<button type="button" class="btn btn-default" data-toggle="modal" data-target="#member-modal">Add Member</button>
		<button type="button" class="btn btn-default" data-toggle="modal" data-target="#del-member-modal">Remove Member</button>
		<div class='list-group' id="memberList"></div>
		<br />
		<h1>Messages</h1>
		<br />
		<button type="button" class="btn btn-default" data-toggle="modal" data-target="#message-modal">New Message</button>
		<div class='list-group' id='messageList'></div>
	</div>

<div class="modal fade" id="message-modal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">New Message</h4>
      </div>
      <div class="modal-body">
        <div class="input-group">
          <span class="input-group-addon" id="text-field">Message</span>
          <input name="message" type="text" class="form-control" placeholder="Message" aria-describedby="sizing-addon2" autofocus>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" id="message-close" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onclick="postMessage()">Post</button> <!--onclick is just a call to filler function for now-->
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<div class="modal fade" id="member-modal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Add Member</h4>
      </div>
      <div class="modal-body">
        <div class="input-group">
          <span class="input-group-addon" id="user-field">Search</span>
          <input name="username" type="text" class="form-control" placeholder="Username" aria-describedby="sizing-addon2" autofocus>
        </div>
        <div class='list-group-item' id="search-results"></div>
      </div>
      <div class="modal-footer">
        <button type="button" id="delete-close" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onclick="searchUsers()">Add</button> <!--onclick is just a call to filler function for now-->
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<div class="modal fade" id="del-member-modal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Remove Member</h4>
      </div>
      <div class="modal-body">
        <div class="input-group">
          <span class="input-group-addon" id="remove-field">Username</span>
          <input name="remove" type="text" class="form-control" placeholder="Username" aria-describedby="sizing-addon2" autofocus>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" id="delete-close" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onclick="removeMember()">Remove</button> <!--onclick is just a call to filler function for now-->
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

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
        <br />
        <p id="create-error"></p>
      </div>
      <div class="modal-footer">
        <button type="button" id="e-create-close" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onclick="createGroupEvent()">Create</button> <!--onclick is just a call to filler function for now-->
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

</div>