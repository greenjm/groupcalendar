<!DOCTYPE html>
<?php
	include "head.php";
?>
<script src="../javascript/index.js"></script>
</head>
<body>
	<?php include "nav.html"; ?>
  <div id="gc_about_cont">
  <div class="jumbotron" id="gc_about_img">
  <div id="gc_about_img_text">
  <h1>What is Group Calendar?</h1>
  <p>Group Calendar is an awesome system that allows you to manage your own calendar and coordinate with others for group meetings.</p>
  <p><button class="btn btn-primary btn-lg" type="button" onclick="showinfo('gc_about')">Learn More</button></p>
</div>
  <div class="jumbotron container lm_text" id="gc_about">
    <p>Lorem ipsum dolor sit amet, dico dicta minimum vix cu, id cibo putant duo. Id est dicat probatus deseruisse, ne eam omnes cetero. Usu cibo errem labitur no, dicunt integre et cum. Pro ut dignissim incorrupte. Elit partem doming ne sea, option offendit ei mea. Eu dicam oratio convenire eos, dolore audiam et mea. Volutpat accusamus quaerendum no eum.

Postulant tincidunt usu et, sit habeo vulputate intellegam at, eos graeci admodum molestie ea. Ad iisque iuvaret his. Nam dolorum percipitur ne. Sed ut erat ipsum laboramus, ut autem ipsum persecuti nec. Nusquam vituperata repudiandae eu qui, eu tale dolore dissentias vis, mel ne omnes moderatius.</p>
<p><button class="btn btn-primary btn-ls" type="button" onclick="closeinfo('gc_about')">Close</button></p>
  </div>
</div>
</div>
<div class="filler"></div>
<div id="gc_hiw_cont">
<div class="jumbotron" id="gc_hiw_img">
<div id="gc_hiw_img_text">
  <h1>How Does it Work?</h1>
  <p>Group Calendar works by taking in all of your group's information and finding times when all of you are free to work on your deadlines.</p>
  <p><button class="btn btn-primary btn-lg" type="button" onclick="showinfo('gc_hiw')">Learn More</button></p>
</div>
<div class="jumbotron container lm_text" id="gc_hiw">
<p>Lorem ipsum dolor sit amet, dico dicta minimum vix cu, id cibo putant duo. Id est dicat probatus deseruisse, ne eam omnes cetero. Usu cibo errem labitur no, dicunt integre et cum. Pro ut dignissim incorrupte. Elit partem doming ne sea, option offendit ei mea. Eu dicam oratio convenire eos, dolore audiam et mea. Volutpat accusamus quaerendum no eum.

  Postulant tincidunt usu et, sit habeo vulputate intellegam at, eos graeci admodum molestie ea. Ad iisque iuvaret his. Nam dolorum percipitur ne. Sed ut erat ipsum laboramus, ut autem ipsum persecuti nec. Nusquam vituperata repudiandae eu qui, eu tale dolore dissentias vis, mel ne omnes moderatius.</p>
<p><button class="btn btn-primary btn-ls" type="button" onclick="closeinfo('gc_hiw')">Close</button></p>
</div>
</div>
</div>

<!-- Forms for login and sign up -->
<div class="modal fade" id="login-modal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Login</h4>
      </div>
      <div class="modal-body">
        <div class="input-group">
          <span class="input-group-addon" id="user-field">Username</span>
          <input type="text" class="form-control" placeholder="Username" aria-describedby="sizing-addon2" autofocus>
        </div>
        <p></p>
        <div class="input-group">
          <span class="input-group-addon" id="pass-field">Password</span>
          <input type="password" class="form-control" placeholder="Password" aria-describedby="sizing-addon2">
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" id="login-close" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onclick="login()">Login</button> <!--onclick is just a call to filler function for now-->
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->



<div class="modal fade" id="register-modal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Register</h4>
      </div>
      <div class="modal-body">
        <div class="input-group">
          <span class="input-group-addon" id="name-reg">Name</span>
          <input type="text" class="form-control" placeholder="Name" aria-describedby="sizing-addon2" autofocus>
        </div>
        <br>
        <div class="input-group">
          <span class="input-group-addon" id="user-reg">Username</span>
          <input type="text" class="form-control" placeholder="Username" aria-describedby="sizing-addon2">
        </div>
        <br>
        <div class="input-group">
          <span class="input-group-addon" id="pass-reg">Password</span>
          <input type="password" class="form-control" placeholder="Password" aria-describedby="sizing-addon2">
          <span class="input-group-addon" id="pass-confirm">Confirm Password</span>
          <input type="password" class="form-control" placeholder="Confirm" aria-describedby="sizing-addon2">
        </div>
        <br>
        <div class="input-group">
          <span class="input-group-addon" id="email-reg">E-mail</span>
          <input type="text" class="form-control" placeholder="E-mail" aria-describedby="sizing-addon2">
          <span class="input-group-addon" id="email-confirm">Confirm E-mail</span>
          <input type="text" class="form-control" placeholder="Confirm" aria-describedby="sizing-addon2">
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" id="reg-close" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onclick="register()">Register</button> <!--register() is just a placeholder function for now-->
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

</body>