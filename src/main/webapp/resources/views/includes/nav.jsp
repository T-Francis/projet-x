<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<nav class="navbar navbar-toggleable-md navbar-light fixed-top bg-faded nav-pills">
	<button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
		<span class="navbar-toggler-icon"></span>
	</button>
	<a class="navbar-brand" href="/projetx"><img src="/projetx/resources/images/logo1.png"></a>
	<div class="collapse navbar-collapse" id="navbarCollapse">		
			<!-- Lien de test -->
			<!-- <li class="nav-item"><a class="nav-link" href="/projetx/demo/views/template.model.html">Template page</a></li> -->
			<!-- Tableau de bord -->
		<c:if test="${ not empty loggedInUser }">
		<ul class="navbar-nav mr-auto align-items-center left-nav">
			<li class="nav-item">
				<a class="nav-link" href="/projetx/overview">Tableau de bord</a>
			</li>
			<!-- Projet -->
			<li class="nav-item">
				<a class="nav-link" href="/projetx/projets">Projets</a>
			</li>
			<!-- Tâches -->
			<li class="nav-item">
				<a class="nav-link" href="/projetx/taches">Tâches</a>
			</li>
			<!-- Equipes -->
			<li class="nav-item">
				<a class="nav-link" href="/projetx/equipes">Equipes</a>
			</li>
			<!-- Documents -->
			<li class="nav-item">
				<a class="nav-link" href="/projetx/documentsProjets">Documents</a>
			</li>
		</ul>
		
		<ul class="navbar-nav ml-auto align-items-center">
			<!-- Alert -->
			<li class="nav-item">
				<a id="alertBell" class="nav-link" onclick="showAlert()"><span class="badge badge-pill badge-danger">2</span>&nbsp;<i class="ion-ios-bell-outline em-2" aria-hidden="true"></i></a>
			</li>
			<!-- Mail alert -->
			<li class="nav-item">
				<a class="nav-link" href="/projetx/demo/views/messagerie.html"><span class="badge badge-pill badge-warning">5</span>&nbsp;<i class="ion-ios-email-outline em-2" aria-hidden="true"></i></a>
			</li>
			<!-- Profil -->
			<li class="nav-item">
				<div class="chip"><a class="chipLink" href="/projetx/demo/views/profil.html"><img src="/projetx/demo/images/avatars/man/dominique.png" width="50" height="50"> <c:out value="${ loggedInUser.lastname }" /> </a></div>
				<!-- <a class="nav-link" ">Profil</a> -->
			</li>
			<!-- Log out -->
			<li class="nav-item">
				<a class="nav-link" href="logout"><i class="ion-log-out em-2" aria-hidden="true"></i></a>
			</li>
		</ul>
		</c:if>
		<c:if test="${ empty loggedInUser }">
		<ul class="navbar-nav mr-auto align-items-center left-nav">
		
		</ul>
		<ul class="navbar-nav ml-auto align-items-center">
			<li class="nav-item">
				Welcome, please Login or Register
			</li>
		</ul>
			
		</c:if>
		

	</div>
</nav>