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
			<!-- MESSAGE TEST DEFINI DANS LE HomeController -->	
			<div class="text-center"></div>
			<!-- INTRO JUMBO -->
			<div class="container text-center jumbotron" style="background: rgba(249,249,249, 0.5);" id="jumboD">
				<h1 class="jumbotron-heading">Projet-X</h1>
				<h3 class="jumbotron-heading">Un gestionnaire de projet adaptable au votre !</h3>
				<p class="lead text-muted"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. A beatae cum deserunt ea eos et explicabo fuga id in ipsa iste, mollitia perferendis rerum saepe sed tenetur vel. Accusamus, quam.</p>
			</div>

			<!-- LOG/SIGN BUTTON -->
			<div class="container text-center">
				<button type="button" class="btn btn-primary connexionB">Connexion</button>
				<button type="button" class="btn btn-primary inscriptionB">Inscription</button>
			</div>
		</div>	
			<!-- CONNEXION -->
			<div class="container-fluid col-6 col-lg-6 cols-xs-6 col-sm-6 offset-3 inscription" id="connexionForm" style="display:none;">
				<div class="card ">
					<h3 class="card-header card-primary">Login :</h3>
					<form id="user" action="/projetx/login" method="POST">
						<div class="card-block">
							<div class="form-group">
								<input id="email" name="email" placeholder="Email" required="required" type="email" class="form-control" value="<c:out value="${ UserJustRegisteredEmail }" />" />
							</div>
							<div class="form-group">
								<input id="password" name="password" placeholder="Mot de Passe" required="required" type="password" class="form-control" value="" />
								<span class="text-danger"><c:out value="${ invalidCredentials }" /></span>
							</div>
							<button class="btn btn-primary pull-left reset" type="button">Identifiants Oubliés</button>
							<!-- <button class="btn btn-primary pull-left inscriptionB" type="button">Inscription</button> -->
							<button type="submit" id="connexionLogin" class="btn btn-success float-right">Connexion</button>
						</div>
					</form>
				</div>
			</div>

			<!-- REGISTER -->
			<div class="container-fluid col-6 col-lg-6 cols-xs-6 col-sm-6 offset-3 inscription" id="inscriptionForm" style="display:none;">
			    <div class="card">
			       	<h3 class="card-header card-primary">Inscription :</h3>
			        <div class="card-block">
			            <form:form action="/projetx/register" method="post" modelAttribute="user" class="form-horizontal">
			            
			            <div class="form-group">
			                <form:input type="text" class="form-control" path="lastname" placeholder="Enter lastname" />
			                <form:errors path="lastname" cssClass="text-danger" />
			            </div>
			            
			            <div class="form-group">
			                <form:input type="text" class="form-control" path="firstname" placeholder="Enter firstname" />
			                <form:errors path="firstname" cssClass="text-danger" />
			            </div>
			            
			            <div class="form-group">
			                <form:input type="email" class="form-control" path="email" placeholder="Enter email" />
			                <form:errors path="email" cssClass="text-danger" />
			            </div>
			            
			            <div class="form-group">
			                <form:input type="password" class="form-control" path="password" placeholder="Enter password" />
			                <form:errors path="password" cssClass="text-danger" />
			            </div>
			            
			            <div class="form-group">
			                <input type="password" class="form-control" name="passwordConfirm" placeholder="Confirm password" />
			                <span class="text-danger"><c:if test="${ not empty passDontMatch }"><c:out value="${ passDontMatch }" /></c:if></span>
			            </div>
			            
			            <div class="form-group">
			                <button type="submit" class="btn bg-success" id="RegisterBtn">Register</button>
			                <button type="reset" class="btn bg-danger">Reset</button>
			            </div>
			            
			            </form:form>
			        </div>
			    </div>
			</div>

			<!-- FORGOTTEN ID -->
			<div class="container-fluid col-6 col-lg-6 cols-xs-6 col-sm-6 offset-3 inscription" id="resetP" style="display:none;">
				<div class="card ">
					<h3 class="card-header card-primary">Identifiants Oubliés :</h3>
					<form id="command" action="/projetx/resources/static/views/tableauDeBord.html" method="POST">
						<fieldset class="card-block">
							<fieldset class="form-group">
								<legend>Email ou pseudo</legend>
								<div class="form-check">
									<label class="form-check-label">
									<input type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios1" value="option1">
									Pseudo
								</label>
								</div>
								<div class="form-check">
									<label class="form-check-label">
									<input type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios2" value="option2">
									Mot de Passe
								</label>
								</div>
							</fieldset>
						</fieldset>
						<div class="form-group">
							<input type="text" id="resetField" placeholder="E-mail" class="form-control">
						</div>
						<button class="btn btn-success float-right" type="submit">Envoyer</button>
					</form>
				</div>
			</div>
			
			<div id="modalLoginSuccess" class="modal fade" data-toggle="modal" >
			<div class="modal-dialog" role="document">
				<div class="alert alert-success" role="alert">
				  <strong>Welcome</strong>
				  <br/>
				  You successfully created your account !
				</div>
			  </div>
			</div>

		<!-- ======================**inclusion des fichiers JS**===================== -->
		<%@ include file="includes/footJS.jsp" %>
		<!-- CURRENT INTERFACE JS -->
		<c:choose>
			<c:when test="${status}">
				<script>
					status = true;
				</script>
			</c:when>
			 <c:otherwise>
				<script>
					status = false;
				</script>
			 </c:otherwise>
		</c:choose>
		
		<c:choose>
			<c:when test="${statusLogin}">
				<script>
					statusLogin = true;
				</script>
			</c:when>
			 <c:otherwise>
				<script>
					statusLogin = false;
				</script>
			 </c:otherwise>
		</c:choose>
		
		<script src="/projetx/resources/static/js/landing.js"></script>		
	</body>
</html>

