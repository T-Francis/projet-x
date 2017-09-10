//
$( document ).ready(function() {

	var urls = ["/projetx/demo/views/inc/modal/modalDocumentsAdd.html","/projetx/demo/views/inc/modal/modalDocumentsDelete.html"];

	//call the function that will request the html content with an ajax call and append it to the param element
	includeHtmlLikeaPig( $("#modalDocumentsAdd"), urls[0] );
	includeHtmlLikeaPig( $("#modalDocumentsDelete"), urls[1] );

});