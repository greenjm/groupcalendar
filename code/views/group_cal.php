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
          <span class="input-group-addon" id="user-field">Username</span>
          <input name="username" type="text" class="form-control" placeholder="Username" aria-describedby="sizing-addon2" autofocus>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" id="delete-close" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onclick="addMember()">Add</button> <!--onclick is just a call to filler function for now-->
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

</div>