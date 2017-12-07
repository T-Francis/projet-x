<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page isELIgnored="false" %> 
<!DOCTYPE html>
<html>
	<head>

		<meta charset="utf-8">
		<title>Projet X</title>
		<!-- ======================**inclusion des fichiers CSS**===================== -->		
		<%@ include file="includes/headCSS.jsp" %>
		
		<!-- CURRENT INTERFACE CSS -->
		<link rel="stylesheet" type="text/css" href="/projetx/resources/static/css/landing.css">
		
	</head>
	
	<body>

		<!-- NAVBAR INCLUDE -->
		<%@ include file="includes/nav.jsp" %>

		<!-- INTERFACE CONTAINER -->
		<div class="container-fluid">
			<div class="card cartehauteur">
				<div class="card-header card-inverse card-primary text-white">
					<h1>Tableau de bord</h1>
				</div>
				<div class="card-block cadre">
					<div class="row">
						<div class="col-xs-12 col-md-12 col-lg-6">
							<!-- Panel "Mes projets" de gauche -->
							<div class="card">
								<div class="card-header">
									<h5 class="float-left" >Projets actif</h5>
									<button class="btn btn-success btn-xs ion-android-add float-right" data-toggle="modal" data-target="#modalProjet"></button>
								</div>
								<div class="card-block text-center" style="min-height: 450px;">
									<table id="tableprojets" class="table table-responsive table-striped">
										<thead>
											<tr>
												<th data-priority="1" class="projet">logo</th>
												<th data-priority="2" class="projet">Projet</th>
												<th data-priority="3" class="datedebut">Début</th>
												<th data-priority="4" class="datefin">Fin</th>
												<th data-priority="5" class="etatavancement">Avancement</th>
												<th data-priority="6" class="etatavancement">Equipes</th>
											</tr>
										</thead>
										<tbody>
										</tbody>
									</table>
								</div>
							</div>
						</div>
						<div class="col-xs-12 col-md-12 col-lg-6">
							<!-- Panel "Mes taches" de droite -->
							<div class="card">
								<div class="card-header">
									<h5 class="float-left" >Mes Taches</h5>
									<button class="btn btn-success btn-xs ion-android-add float-right" data-toggle="modal" data-target="#modalTaskCreation"></button>
								</div>
								<div class="card-block" style="min-height: 450px;">
									<table id="tabletaches" class="table table-responsive table-striped">
										<thead>
											<tr>
												<th data-priority="1" class="tache">Tache</th>
												<th data-priority="2" class="priorité">Priorité</th>
												<th data-priority="3" class="status">Status</th>
												<th data-priority="4" class="projet">Projet</th>
												<th data-priority="5" class="etatavancement">Avancement</th>
												<th data-priority="6" class="datedebut">Début</th>
												<th data-priority="7" class="datefin">Fin</th>
												<th data-priority="8" class="motherTask">Tache Mere</th>
											</tr>
										</thead>
										<tbody>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
					<br><br>
					<div class="row">
						<div class="col-sm-12 col-lg-4">
							<!-- Panel "dernieres alertes" de gauche bas -->
							<div class="card">
								<div class="card-header">
									<h5 class="float-left">Annonces projets</h5>
								</div>
								<div class="card-block" style="min-height: 550px;">
									<table id="tablealertes" class="table table-responsive">
										<tbody>
											<tr>
												<td class="logoalerte"><img class="avatar" src="/projetx/demo/images/projectsLogos/PokemonGo-alert.png"></td>
												<td class="alerte">App Pokemon Go : charte graphique est avancée au : 10/03/2018</td>
											</tr>
											<tr>
												<td class="logoalerte"><img class="avatar" src="/projetx/demo/images/projectsLogos/Construction-petit-immeuble-alert.png"></td>
												<td class="alerte">Construction petit immeuble : Acheter en urgence materiel plomberie</td>
											</tr>
											<tr>
												<td class="logoalerte"><img class="avatar" src="/projetx/demo/images/projectsLogos/Demenagement-alert.png"></td>
												<td class="alerte">PROJET Demmenagement : Louer en urgence Fourgon 23m3</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
						<div class="col-sm-12 col-lg-4">
							<!-- Panel "Dernières activités" milieu bas -->
							<div class="card">
								<div class="card-header">
									<h5>Dernières activités</h5>
								</div>
								<div class="card-block" style="min-height: 550px;">
									<table id="tableactivites" class="table table table-responsive table-striped">
										<thead>
											<tr>
												<th class="activityCategorie">Categorie</th>
												<th class="activityCategorie">Nom</th>
												<th class="activityStatus">Status</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td class="">Projet</td>
												<td class="">Dev App Pokemon Go</td>
												<td class="">nouvelles taches!</td>
											</tr>
											<tr>
												<td class="">Taches</td>
												<td class="">Valider les plans Architecte</td>
												<td class="">Terminer!</td>
											</tr>
											<tr>
												<td class="">Projet</td>
												<td class="">Démenagement</td>
												<td class="">Nouvelles annonces!</td>
											</tr>
											<tr>
												<td class="">Projet</td>
												<td class="">Deploiement app OO</td>
												<td class="">Terminer!</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
						<div class="col-sm-12 col-lg-4">
							<!-- Panel "Derniers messages" droite bas -->
							<div class="card cadrebas">
								<div class="card-header">
									<h5>Derniers messages</h5>
								</div>
								<div class="card-block" style="min-height: 550px;">
									<table id="tablemessages" class="table table-responsive table-striped">
										<tbody>
											<tr>
												<td class="iconemessage"><img class="avatar" src="/projetx/demo/images/avatars/man/gerard.png"></td>
												<td class="nommessage">Gerard Aguerre</td>
												<td class="message">Projet Pokemon Go : Demande d'aide pour implementation ...</td>
											</tr>
											<tr>
												<td class="iconemessage"><img class="avatar" src="/projetx/demo/images/avatars/man/balthazar.png"></td>
												<td class="nommessage">Feron Baltazard</td>
												<td class="message">Projet Immeuble : Demande d'informations concernant ...</td>
											</tr>
											<tr>
												<td class="iconemessage"><img class="avatar" src="/projetx/demo/images/avatars/man/fahd.png"></td>
												<td class="nommessage">Fahd Jaouad</td>
												<td class="message">Projet Demenagement : Confirmation trajet et metrage ...</td>
											</tr>
											<tr>
												<td class="iconemessage"><img class="avatar" src="/projetx/demo/images/avatars/man/fahd.png"></td>
												<td class="nommessage">Fahd Jaouad</td>
												<td class="message">Projet Demenagement : Dois finir le metrage ?</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- ======================**inclusion des fichiers JS**===================== -->
		<%@ include file="includes/footJS.jsp" %>
		
		<!-- CURRENT INTERFACE JS -->
		<script src="/projetx/resources/static/js/landing.js"></script>
		
	</body>
</html>

