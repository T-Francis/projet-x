$(document).ready(function() {

    //including all necessessary modal
    includeHtmlLikeaPig($("#modalDisplayTache"), "/projetx/demo/views/inc/modal/modalTachesTaskDisplay.html.html");
    includeHtmlLikeaPig($("#modalNewTache"), "/projetx/demo/views/inc/modal/modalTachesTaskAdd.html");
    includeHtmlLikeaPig($("#modalAjCol"), "/projetx/demo/views/inc/modal/modalTaskAddMember.html");
    
	// var url = 'http://www.json-generator.com/api/json/get/cpAiWYuyKW?indent=2';
	var url = '/projetx/demo/data/tasksAll.json';
	var table = $('#tableTaches').DataTable({
		responsive: true,
		ajax: url,
		columns: [
		{ 'data': 'Nom'},
		{ 'data': 'Projet'},
		{ 'data': 'DateD'},
		{ 'data': 'DateF'},
		{
			'data': 'status',
			'width' : '139'
		},
		{ 'data': 'completion'},
		{
			'data': 'Collaborateurs',
			"orderable": true,
			render: function ( data, type, full ) {
				return $.map( data, function ( d, i ) {
					var str = "<div class="+'detailsCol'+"><img src="+'http://lorempixel.com/50/50/'+"><br>"+d.age+" ans<br><a href="+'#'+" >"+d.email+"</a></div>";
					return '<a href="#" data-placement="right" data-trigger="hover" title="Infos" data-content="'+str+'">'+ d.name +'</a>';
				} ).join( ' , ' );
			}

		},
		{ 'data': ''}
		],
		columnDefs: [
		{
			'targets': 5,
			'width' : '200',
			'render': function ( data, type, full ){
				console.log(data);
				// var random = Math.floor(Math.data() * 101);
				var stateClass = 'bg-success';
				if(data > 0 && data < 26) stateClass = 'bg-danger';
				else if(data >=25 && data <61) stateClass = 'bg-warning';
				else if(data >=61 && data <100) stateClass = 'bg-primary';
				else if(data == 100) stateClass = 'bg-success';
				return '<div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated '+stateClass+' role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width:'+data+'%">'+data+'%</div></div>';
			}
		},
		{
			'targets': 7,
			'width' : '50',
			'searchable':false,
         	'orderable':false,
			'className': '',
			'render': function (){
				return 	'<div class="btn-group" role="group">'+
				'<button type="button" class="btn btn-info btn-sm ion-edit editT" data-placement="top" data-trigger="hover" data-content="Editer cette tache"></button>'+
				'<button type="button" class="btn btn-success btn-sm ion-person-add ajoutCol" data-placement="top" data-trigger="hover" data-content="Ajouter un collaborateur"></button>'+
				'<button type="button" class="btn btn-danger btn-sm ion-minus-round suppT" data-placement="top" data-trigger="hover" data-content="Supprimer cette tache"></button>'+

				'</div>';
			}
		}
		],
		'order': [1, 'asc'],

		//Explication stackOverflow: You need to reinitialize the popovers each time the dataTable is redrawn.  $(".ajoutCol").popover({ trigger: "hover" }); will only initialize those popovers visible at the time the code is executed
		drawCallback: function() {
    		$(".ajoutCol").popover({ trigger: "hover" });
    		$(".editT").popover({ trigger: "hover" });
    		$(".suppT").popover({ trigger: "hover" });
    		$("a").popover({ trigger: "click", html: true });
  		}

	});

	//ferme la popover en cliquant n'importe où sur la page
	$(document).on('click', function (e) {
	    $('a').each(function () {

	        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
	            (($(this).popover('hide').data('bs.popover')||{}).inState||{}).click = false
	        }
	    });
	});

	//suppression tache avec alerte
	$(document).on("click", '.suppT' , function () {
		var dataLigne = table.row((this).closest('tr')).data();
		var alert = confirm("Etes vous sûr de vouloir supprimer la tache ("+dataLigne.Nom+") ?");
		(alert ? $(this).closest('tr').remove() : false);

    });

    //vide la liste des colls et cache la div au click sur bouton reset
    $(document).on("click", '#ajReset' , function () {
		$('#listCol').empty();
		$('#listCol').css('display', 'none');
    });

	//options champs date
	$('.datePicker').datepicker({
		autoclose: true,
		format: 'yyyy/mm/dd'
	})

	var liste = [
	    "Mercado Lowe",
	    "Michael Merritt",
	    "Martina Patterson",
	    "Gibbs Blackwell",
	    "Amalia Vinson",
	    "Garrett Horn",
	    "Livingston Mayo",
	    "Mccullough Robbins",
	    "Sykes Winters",
	    "Cecelia Roberts",
	    "Traci Acosta",
	    "Christian Montgomery",
	    "Caitlin Sargent",
	    "Johnson Rosario"
	];

	$('#collaborateurs').autocomplete({
	    source : liste
    });

    $('#colls').autocomplete({
	    source : liste
    });

    function autocomp(id, listCol){
	    $(id).on('autocompleteselect', function (e, ui) {
			$(listCol).css('display', 'block').show('slow');
	        $(listCol).append('<div class="spacingCol"><span class="col-md-10 float-left">'+ ui.item.value+'</span><button type="button" class="btn btn-danger btn-sm col-md-1 ion-minus-round float-right delCol"></button></br></div>');

	        $(listCol).on("click", "button.delCol", function(){
			    $(this).hide('slow', function(){
		    	 	$(this).closest('div').remove();
		    	 	if($(listCol).is(':empty'))
		    			$(listCol).css('display', 'none').hide('slow');
		    	});
			});

	        $(this).val("");
	    	return false;
	    });
    }

    autocomp("#collaborateurs", "#listCol");
    autocomp("#colls", "#listAjCol");

    var storeData;
    var storePercent;

    //Affichage détails tache au click sur une ligne
    $(document).on("click",'#tableTaches tbody tr td:not(:nth-child(8))', function (e){
		$('#modalDisplayTache').modal("show");
        var data = table.row(this).data();
        storeData = data;
        storePercent = $(this).parent().find(".progress-bar").html();

        $("#infoTache").text('Détails de la tache "'+ data.Nom +'"');
        $("#affNomTache").text(data.Nom);

        $('#affDescTache').text(data.Description);
        $('#projetLie').text(data.Projet);
        $('#dateDtache').text(data.DateD);
        $('#dateFtache').text(data.DateF);
        $('#affPrio').text(data.Niveau);
        //Si parent n'est pas mis avant find la barre d'avancement (ds le modal afficher)
        //ne s'affiche que lorsqu'on a cliqué sur la cell avancement
        $('#affAv').html($(this).parent().find(".progress").parent().html());

        //Extraction des noms des objets collaborateurs et ajout de virgule
        var x = [];
        $.each(data.Collaborateurs, function(i, n){
		    x.push(n.name);
		});
		var colls = x.join(', ');

		$('#affColls').text(colls);

		//Empeche l'affichage de la modal au click sur mes liens (<a href>)
		$(document).on("click",'#tableTaches tbody tr td a', function (e){
			e.stopPropagation();
			e.preventDefault();
		});

    });

    //Ouverture de la modal editer tache au click sur le bouton edit d'interaction
    $(document).on("click",'.editT', function (e){
		$('#modalNewTache').modal("show");
		$('#hideInput').css('display', 'block');
		//recuperer la tr parente du bouton edit cliqué
        var data = table.row($(this).closest("tr")).data();

        $("#titreAjTache").text('Editer la tache "'+ data.Nom +'"');
        $("#nomTache").val(data.Nom);
        $('#descTache').val(data.Description);
        $('#lierProjet').val(data.Projet);
        $('#dateD').val(data.DateD);
        $('#dateF').val(data.DateF);
        $('#niveauUrgence').val(data.Niveau);
        //récuperer le pourcentage via la div progress-bar et le mettre dans le input editer
        var percent = $(this).closest('tr').find(".progress").parent().text();
        $('#pourcentageAv').attr("placeholder", "Pourcentage d'avancement actuel: "+percent);

        //Extraction des noms des objets collaborateurs et ajout de virgule
        var x = [];
        $.each(data.Collaborateurs, function(i, n){
		    x.push(n.name);
		});
		var colls = x.join(', ');
		$('#collaborateurs').attr("placeholder", "Collaborateurs déjà présents: "+ colls);
    });

    //Ouverture de la modal editer tache au click sur le bouton edit d'afficher tache'
    $(document).on("click",'#editerTache', function (e){
    	var data = storeData;
     	$('#modalDisplayTache').modal("hide");
		$('#modalNewTache').modal("show");
		$('#hideInput').css('display', 'block');

        $("#titreAjTache").text('Editer la tache "'+ data.Nom +'"');
        $("#nomTache").val(data.Nom);
        $('#descTache').val(data.Description);
        $('#lierProjet').val(data.Projet);
        $('#dateD').val(data.DateD);
        $('#dateF').val(data.DateF);
        $('#niveauUrgence').val(data.Niveau);
        $('#pourcentageAv').attr("placeholder", "Pourcentage d'avancement actuel: "+storePercent);

        //Extraction des noms des objets collaborateurs et ajout de virgule
        var x = [];
        $.each(data.Collaborateurs, function(i, n){
		    x.push(n.name);
		});
		var colls = x.join(', ');
		$('#collaborateurs').attr("placeholder", "Collaborateurs déjà présents: "+ colls);
    });


    //Reset modal nouvelle tache après avoir ouvert la modal editer
	$('#modalNewTache').on('hidden.bs.modal', function () {
    	$(this).find("input,textarea,select").val('').end();
    	$('#collaborateurs').attr("placeholder", "Collaborateurs");
    	$('#titreAjTache').text("Ajouter une tache");
	});

	$(document).on("click",'.ajoutCol', function (e){
		$('#modalAjCol').modal("show");
		$('#hideInput').css('display', 'block');
		//recuperer la tr parente du bouton edit cliqué
        var data = table.row($(this).closest("tr")).data();

        $("#titreAjCol").text('Ajouter collaborateurs à la tache: "'+ data.Nom +'"');

        //Extraction des noms des objets collaborateurs et ajout de virgule
        var x = [];
        $.each(data.Collaborateurs, function(i, n){
		    x.push(n.name);
		});
		var colls = x.join(', ');
		$('#colls').attr("placeholder", "Collaborateurs déjà présents: "+ colls);
    });

});
