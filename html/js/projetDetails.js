
	/*Attend que tout le document soit chargé pour exécuter le javascript*/
	$(document).ready( function () {
		// Load google charts
										google.charts.load('current', {'packages':['corechart']});
										google.charts.setOnLoadCallback(drawChart);

		// Draw the chart and set the chart values
										function drawChart() {
		  								var data = google.visualization.arrayToDataTable([
		  								['Task', 'Hours per Day'],
		  								['A faire', 8],
		  								['En cours', 2],
		  								['A valider', 4],
		                  ['Validé', 4],
										]);

		  								// Optional; add a title and set the width and height of the chart
		  								var options = {'title':'', 'width':530, 'height':330};

		  								// Display the chart inside the <div> element with id="piechart"
		  								var chart = new google.visualization.PieChart(document.getElementById('piechart'));
		 								chart.draw(data, options);
										}
		$('#table_id').DataTable({
			"dom": '<"card " <"card-header align-items-top"<<"#title.float-left"<"testT">><"#boutonAjout.float-right.align-items-top"f>>><"card-body" <"#tableCollabo.table" t>><" card-footer.d-flex justify-content-end"<"p-2" l><"ml-auto p-2" p>>>',
			"ajax": "/projetx/brut/data/taches.json",
			"columnDefs": [
			{"targets": 1, "visible": false},

			{"targets": -2, "data": null, "defaultContent": '<button type="button" class="btn btn-primary btn-sm droit_chef" data-toggle="modal" data-target="#modal_modification_tache">Modification</button>'},
			{"targets": -1, "data": null, "defaultContent": '<button type="button" class="btn btn-danger btn-sm droit_chef" data-toggle="modal" data-target="#modal_suppression_tache" >-</button>'},
			],
			"scrollY":            "200px",
			"scrollCollapse":     true,
			"paging":             false
		});
		$('#title').append("<h5><strong>Tâches associées au projet</strong></h5>");
		$('#boutonAjout').append('<button class="btn btn-success float-right droit_chef" data-toggle="modal" data-target="#modal_ajout_tache" type="button"><strong>+</strong></button>');
	} );
