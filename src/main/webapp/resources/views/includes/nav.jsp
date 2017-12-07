<nav class="navbar navbar-toggleable-md navbar-light fixed-top bg-faded nav-pills">
	<button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
		<span class="navbar-toggler-icon"></span>
	</button>
	<a class="navbar-brand" href="/projetx"><img src="/projetx/demo/images/logo1.png"></a>
	<div class="collapse navbar-collapse" id="navbarCollapse">
		<ul class="navbar-nav mr-auto align-items-center left-nav">
			<!-- Lien de test -->
			<!-- <li class="nav-item"><a class="nav-link" href="/projetx/demo/views/template.model.html">Template page</a></li> -->
			<!-- Tableau de bord -->
			<li class="nav-item">
				<a class="nav-link" href="/projetx/overview">Tableau de bord</a>
			</li>
			<!-- Projet -->
			<li class="nav-item">
				<a class="nav-link" href="/projetx/demo/views/projets.html">Projets</a>
			</li>
			<!-- Tâches -->
			<li class="nav-item">
				<a class="nav-link" href="/projetx/demo/views/taches.html">Tâches</a>
			</li>
			<!-- Equipes -->
			<li class="nav-item">
				<a class="nav-link" href="/projetx/demo/views/equipes.html">Equipes</a>
			</li>
			<!-- Documents -->
			<li class="nav-item">
				<a class="nav-link" href="/projetx/demo/views/documentsProjets.html">Documents</a>
			</li>
		</ul>
		<ul class="navbar-nav ml-auto align-items-center">
			<!-- Alert -->
			<li class="nav-item">
				<a id="alertBell" class="nav-link" onclick="showAlert()" ><span class="badge badge-pill badge-danger">2</span>&nbsp;<i class="ion-ios-bell-outline em-2" aria-hidden="true"></i></a>
			</li>
			<!-- Mail alert -->
			<li class="nav-item">
				<a class="nav-link" href="/projetx/demo/views/messagerie.html"><span class="badge badge-pill badge-warning">5</span>&nbsp;<i class="ion-ios-email-outline em-2" aria-hidden="true"></i></a>
			</li>
			<!-- Profil -->
			<li class="nav-item">
				<div class="chip"><a class="chipLink" href="/projetx/demo/views/profil.html"><img src="/projetx/demo/images/avatars/man/dominique.png" alt="Person" width="50" height="50"> Dominique Mas </a></div>
				<!-- <a class="nav-link" ">Profil</a> -->
			</li>
			<!-- Log out -->
			<li class="nav-item">
				<a class="nav-link" href="#"><i class="ion-log-out em-2" aria-hidden="true"></i></a>
			</li>
			<!-- DROPDOWN EXAMPLE -->
			<!-- <li class="nav-item dropdown">
			<a class="nav-link dropdown-toggle" href="" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
			<div class="dropdown-menu" aria-labelledby="dropdown01">
				<a class="dropdown-item" href="#">Action</a>
				<a class="dropdown-item" href="#">Another action</a>
				<a class="dropdown-item" href="#">Something else here</a>
			</div>
			</li> *fin DROPDOWN -->
		</ul>
	</div>
</nav>