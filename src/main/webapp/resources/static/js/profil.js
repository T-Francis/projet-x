$(document).ready(function() {

		function loadJSON(callback) {
			var xobj = new XMLHttpRequest();
			xobj.overrideMimeType("application/json");
			xobj.open('GET', '', true);
			xobj.onreadystatechange = function () {
				if (xobj.readyState == 4 && xobj.status == 200) {

					// .open will NOT return a value but simply returns undefined in async mode so use a callback
					callback(xobj.responseText);

				}
			}
			xobj.send(null);
		}


		// Call to function with anonymous callback
		// loadJSON(function (response) {
		// 	// Do Something with the response e.g.
		// 	jsonresponse = JSON.parse(response);
			//Permet de transformer le tableau de messagerie en datatable
			$('#table-amis-coll').DataTable({
				"dom": '<"#collabo.card " <"card-header card-gray d-flex justify-content-end "<"p-2" <"#title2">><"ml-auto p-2" f>><"card-body" <"#tableCollabo.table" t>><" card-footerd-flex justify-content-end"<"p-2" l><"ml-auto p-2" p>>>',
//              data: '/resources/json/users.json',
				ajax: "/projetx/demo/data/userObject.json",
				responsive: true,
				autoWidth: false,
				scrollCollapse: true,
//              "sScrollY": "100%",
//              "sScrollX": "100%",
				"bPaginate": false,
                columns: [
                   {data: "avatar"},
                   {data: "nom"},
                   {data: "prenom"},
                   {data: null}
               ],
				columnDefs:[{
	                'targets': 0,
	                render: function(data, type, full) {
	                    return '<img src="' + data + '" class="avatar">';
	                },
				},
				{
	                'targets': 3,
	                render: function(data, type, full) {
	                    return '<i class="ion-android-mail" style="cursor: pointer;"></i>';
	                },
				}
				]
			});
			$("#table-amis-coll_wrapper").addClass('col-lg-6');
			$('#title2').append("<h5>Mes Collaborateurs</h5>")
		//
		// });

});
