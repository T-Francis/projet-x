//
$( document ).ready(function() {

	// checking the script is correctly load as first step
	// console.log( "ready!" );
	// console.log( detectBrowser() );

	//initialisation of the tooltips
	$(function () {
	  $('[data-toggle="tooltip"]').tooltip()
	})

	// declaring our "url" where we need to get the html part
	// using a regex so we look for */projetx/brut/ or */projetx/brut/index.html
	// if ( /^http:\/\/([0-9\.]){1,15}\/projetx(\/)?(index\.html)?$/.test(window.location.href) ) {
		// alert("index");
	// 	var urls = ["/projetx/brut/views/inc/navigation/nav.logOff.inc.html","/projetx/brut/views/inc/navigation/footer.inc.html"];
	// } else {
		// alert("not index");
		var urls = ["/projetx/brut/views/inc/navigation/nav.inc.html","/projetx/brut/views/inc/navigation/footer.inc.html"];
	// }

	//call the function that will request the html content with an ajax call and append it to the param element
	includeHtmlLikeaPig( $("#navInc"), urls[0] );
	includeHtmlLikeaPig( $("#footerInc"), urls[1] );

	//browser detection part, alert on internet explorer or edge
	//TO DO => remove the joke in the modal ;)
	if (detectBrowser() == "iexplorer" || detectBrowser() == "edge") {
		$('#browserAlert').modal('show');
	}

});

/**
 * [includeHtmlLikeaPig NO, this function does'nt really exist]
 * @param  {[type]} url [description]
 * @return {[void]}     [description]
 */
function includeHtmlLikeaPig( element, url ){
	// starting the ugly
	xhrDoc= new XMLHttpRequest();
	xhrDoc.open('GET', url )
	if (xhrDoc.overrideMimeType)
	xhrDoc.overrideMimeType('text/json; charset="utf-8"')
	xhrDoc.onreadystatechange = function(){
		if (this.readyState == 4){
			if (this.status == 200){
			var data= this.response; //Here is a string of the requested file
			$( element).append( data )
			}
		}
	}
	xhrDoc.send()
	// end of includeHtmlLikeaPig
}

/**
 * [detectBrowser simple function that retun wich browser is used]
 * source = https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
 * @return {[string]} [browser name]
 */
function detectBrowser(){
	var browser = "";

	// Blink engine detection
	// if ( (isChrome || isOpera) && !!window.CSS ) {
	// 	isBlinkEngine = true;
	// }
	if ( (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0 ) {
		browser ="opera";
	} else if ( typeof InstallTrigger !== 'undefined' ) {
		browser ="firefox";
	} else if ( /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification)) ) {
		browser ="safari";
	} else if ( /*@cc_on!@*/false || !!document.documentMode ) {
		browser ="iexplorer";
	} else if ( !/*@cc_on!@*/false || !!document.documentMode && !!window.StyleMedia ) {
		browser ="edge";
	} else if ( !!window.chrome && !!window.chrome.webstore ) {
		browser ="chrome";
	} else {
		browser ="Browser not detected";
	}
	return browser;
}

/**
 * [returnData returning a parsed json
 * JSON FORMAT { data: [{},{}] }
 * var taskDominique = returnData("/projetx/brut/data/taskDominiqueActive.json");
 * console.log(taskDominique);
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
function returnData(url) {
	var resp ;
	var xmlHttp ;
	resp  = '' ;
	xmlHttp = new XMLHttpRequest();
	if(xmlHttp != null)
	{
		xmlHttp.open( "GET", url, false );
		xmlHttp.send( null );
		resp = xmlHttp.responseText;
	}
	return JSON.parse(resp).data ;
}

/**
 * [getById description]
 * var projectPokemon = getById("/projetx/brut/data/projectsAll.json", 0);
 * console.log(projectPokemon);
 * @param  {[type]} url [description]
 * @param  {[type]} id  [description]
 * @return {[type]}     [description]
 */
function getById( url, id ){
	var fullData = returnData(url);
	return fullData[id];
}

/**
 * [populateSpan description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function populateSpan( data ){
	$.each(data, function(index, value) {
		$('#'+index).text(value);
	});
}

/**
 * [populateInput description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function populateInput( data ){
	$.each(data, function(index, value) {
		$('#'+index).val(value);
	});
}

/**
 * [getUrlParameter description]
 * source :https://stackoverflow.com/questions/19491336/get-url-parameter-jquery-or-how-to-get-query-string-values-in-js
 * @param  {[type]} sParam [description]
 * @return {[type]}        [description]
 */
function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

/**
 * [editProject description]
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
function editProject(id){
	populateInput( getById("/projetx/brut/data/projectsAll.json", id ) );
	$('#modalProjectModification').modal('show');
}

function showAlert(e){
	var alertLeft=0;
	$('#alert-box').children('.alert').each(function(){
		alertLeft++;
	})
	if (alertLeft == 0) {
		event.preventDefault()
	} else {

		$("#modalAnnoncesProjets").modal('show')
	}
}
