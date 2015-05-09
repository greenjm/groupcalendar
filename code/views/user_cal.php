<!DOCTYPE html>
<?php
	include "head.php";
?>
	<script type="text/javascript"
     src="http://tarruda.github.com/bootstrap-datetimepicker/assets/js/bootstrap-datetimepicker.min.js">
    </script>
    <script type="text/javascript"
     src="http://tarruda.github.com/bootstrap-datetimepicker/assets/js/bootstrap-datetimepicker.pt-BR.js">
    </script>
    <script type="text/javascript">
      $('#datetimepicker1').datetimepicker({
        format: 'yyyy-DD-mm hh:mm:ss',
        language: 'pt-BR'
      });
    </script>
    <script type="text/javascript">
      $('#datetimepicker2').datetimepicker({
        format: 'yyyy-DD-mm hh:mm:ss',
        language: 'pt-BR'
      });
    </script>

    <script src="../javascript/user_cal.js"></script>
</head>
<body>
	<?php include "nav.html"; ?>
	<h1>Calendar</h1>

	<ul>
		<li><a id="create-form" data-toggle="modal" data-target="#create-modal">Create</a></li>
		<li><a id="delete-form" data-toggle="modal" data-target="#delete-modal">Delete</a></li>
		<!--<li><a id="select-form" data-toggle="modal" data-target="#select-modal">Select</a></li>-->
	</ul>
	<iframe src="https://www.google.com/calendar/embed?" style="border: 0" width="800" height="600" frameborder="0" scrolling="no"></iframe>

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
        <div class='input-group date'>
        	<span class="input-group-addon" id='datetimepicker1'>
         	   <span class="glyphicon glyphicon-calendar"></span>
            </span>
            <input name="s-date" type='text' class="form-control" />
        </div>
        <div class='input-group date'>
        	<span class="input-group-addon" id='datetimepicker2'>
         	   <span class="glyphicon glyphicon-calendar"></span>
            </span>
            <input name="e-date" type='text' class="form-control" />
        </div>
        <div class="input-group">
          <span class="input-group-addon"><input name="repeat" type="radio" value="0" aria-label="sizing-addon2" checked>None</span>
          <span class="input-group-addon"><input name="repeat" type="radio" value="1" aria-label="sizing-addon2">Daily</span>
          <span class="input-group-addon"><input name="repeat" type="radio" value="2" aria-label="sizing-addon2">Weekly</span>
        </div>
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
        <button type="button" class="btn btn-primary" onclick="deleteEvent()">Delete</button> <!--onclick is just a call to filler function for now-->
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->


<!--<div class="modal fade" id="select-modal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Select</h4>
      </div>
      <div class="modal-body">
        <div class="input-group">
          <span class="input-group-addon" id="user-field">Username</span>
          <input name="username" type="text" class="form-control" placeholder="Username" aria-describedby="sizing-addon2" autofocus>
        </div>
        <p></p>
        <div class="input-group">
          <span class="input-group-addon" id="pass-field">Month</span>
          <input name="password" type="password" class="form-control" placeholder="Password" aria-describedby="sizing-addon2">
        </div> 
      </div>
      <div class="modal-footer">
        <button type="button" id="login-close" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onclick="login()">Login</button>
      </div>
    </div> /.modal-content
  </div>/.modal-dialog
</div> /.modal -->
</body>