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
		</div>

		<!-- ======================**inclusion des fichiers JS**===================== -->
		<%@ include file="includes/footJS.jsp" %>
		
		<!-- CURRENT INTERFACE JS -->
		<script src="/projetx/resources/static/js/landing.js"></script>
		
	</body>
</html>

