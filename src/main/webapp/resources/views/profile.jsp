<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page isELIgnored="false"%>
<!DOCTYPE html>
<html>
<head>

<meta charset="utf-8">
<title>Projet X</title>
<!-- ======================**inclusion des fichiers CSS**===================== -->
<%@ include file="includes/headCSS.jsp"%>

<!-- CURRENT INTERFACE CSS -->
<link rel="stylesheet" type="text/css"
	href="/projetx/resources/static/css/profil.css">
</head>

<body>

	<!-- NAVBAR INCLUDE -->
	<%@ include file="includes/nav.jsp"%>

	<!-- INTERFACE CONTAINER -->
	<div class="container-fluid">
		<div class="card">
			<h4 class="card-header bg-primary text-white">Mon profil</h4>
			<div class="card-body" style="padding-top: 20px;">
				<div class="card-deck d-flex justify-content-start">
					<div class="card col-lg-6" id="infoPerso">
						<h5 class="card-header">Mes informations personelles</h5>
						<div class="card-body">
							<form class="form-horizontal" role="form" method="post" action="/projetx/profile/update" enctype="multipart/form-data">
								<div class="form-group">
									<div class="text-center" style="margin-top: 2%">
										<img src="${ avatarUrl }" width="70" height="70" class="" alt="avatar">
										<h6>Uploader une photo différente...</h6>
										<input type="file" name="avatar" class=".form-control-file" accept="image/*">
									</div>
								</div>
								<div class="form-group row">
									<label class="col-md-3 control-label">Nom</label>
									<div class="col-lg-8">
										<input class="form-control" type="text" name="lastname" value="${ loggedInUser.lastname }" />
									</div>
								</div>
								<div class="form-group row">
									<label class="col-lg-3 control-label">Prénom</label>
									<div class="col-lg-8">
										<input class="form-control" type="text" name="firstname" value="${ loggedInUser.firstname }" />
									</div>
								</div>
								<div class="form-group row">
									<label class="col-md-3 control-label">Compétences</label>
									<div class="col-md-8">
										<textarea class="form-control" rows="3" name="skill" >${ loggedInUser.skill }</textarea>
									</div>
								</div>
								<div class="form-group row">
									<label class="col-md-3 control-label"></label>
									<div class="col-md-8">
										<input type="submit" class="btn btn-success float-right" value="Sauvegarder">
									</div>
								</div>
							</form>
						</div>
					</div>
					<table class="card col-lg-6 table table-responsive table-striped" id="table-amis-coll">
						<thead>
							<tr>
								<th>Photo</th>
								<th data-priority="1">Nom</th>
								<th>Prenom</th>
								<th>E-mail</th>
							</tr>
						</thead>
					</table>
				</div>
			</div>
		</div>
	</div>

	<!-- ======================**inclusion des fichiers JS**===================== -->
	<%@ include file="includes/footJS.jsp"%>

	<!-- CURRENT INTERFACE JS -->
	<script src="/projetx/resources/static/js/landing.js"></script>
</body>
</html>

