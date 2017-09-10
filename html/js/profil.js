$(document).ready(function() {

		function loadJSON(callback) {
			var xobj = new XMLHttpRequest();
			xobj.overrideMimeType("application/json");
			xobj.open('GET', '/projetx/demo/data/users.json', true);
			xobj.onreadystatechange = function () {
				if (xobj.readyState == 4 && xobj.status == 200) {

					// .open will NOT return a value but simply returns undefined in async mode so use a callback
					callback(xobj.responseText);

				}
			}
			xobj.send(null);
		}


		// Call to function with anonymous callback
		loadJSON(function (response) {
			// Do Something with the response e.g.
			jsonresponse = JSON.parse(response);
			//Permet de transformer le tableau de messagerie en datatable
			$('#table-amis-coll').DataTable({
				"dom": '<"#collabo.card " <"card-header card-gray d-flex justify-content-end "<"p-2" <"#title2">><"ml-auto p-2" f>><"card-body" <"#tableCollabo.table" t>><" card-footerd-flex justify-content-end"<"p-2" l><"ml-auto p-2" p>>>',
//              data: '/resources/json/users.json',
				data: jsonresponse,
				responsive: true,
				autoWidth: false,
				scrollCollapse: true,
//              "sScrollY": "100%",
//              "sScrollX": "100%",
				"bPaginate": false,
                columns: [
                   {title: "picture"},
                   {title: "name"},
                   {title: "lname"},
                   {title: "email"}
                ],
				columnDefs:[
                 {"targets": 1, add}
					{"targets": 0, "data": "img", "render": function (url, type, full) {
						console.log(full);
						return '<img height="50px" width="50px" src="' + full[0] + '""/>';
					}
					},
					{
						"responsivePriority": 1, "targets": 1
					},
//
				],


			});
			$("#table-amis-coll_wrapper").addClass('col-lg-6');
			$('#title2').append("<h5>Mes Collaborateurs</h5>")

		});

});
