/*Attend que tout le document soit chargé pour exécuter le javascript*/
$(document).ready( function () {

    //getting the projectId send as $GET param
    var projectId = getUrlParameter('projectId');
    //filtering all the task by the projectId
    var allTask = returnData("/projetx/demo/data/tasksAll.json");
    var tableData = {data:[]};
    for (var index in allTask) {
        if (allTask[index].projectId == projectId) {
            tableData.data.push(allTask[index]);
        }
    }

    //we fill the span with the data returned by an ajax request on our fake data
    populateSpan( getById("/projetx/demo/data/projectsAll.json", projectId ) );

    //on inclut les modal necessaire a l'interface
    includeHtmlLikeaPig($("#projectModification"), "/projetx/demo/views/inc/modal/modalProjectModification.html");
    includeHtmlLikeaPig($("#teamAddWorker"), "/projetx/demo/views/inc/modal/modalTeamAddWorker.html");
    includeHtmlLikeaPig($("#teamRemoveWorker"), "/projetx/demo/views/inc/modal/modalTeamRemoveWorker.html");
    includeHtmlLikeaPig($("#taskCreation"), "/projetx/demo/views/inc/modal/modalTaskCreation.html");
    includeHtmlLikeaPig($("#removeProjectFiles"), "/projetx/demo/views/inc/modal/modalRemoveProjectFiles.html");

/** GOOGLE CHART PART **/
    google.charts.load('current', {
        'packages': ['corechart']
    });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['Task', 'Hours per Day'],
            ['A faire', 8],
            ['En cours', 2],
            ['Faite', 4],
        ]);

        // Optional; add a title and set the width and height of the chart
        var options = {
            'title': '',
            'height': 330,
            //  is3D: true,
             legend:{
                 position:'bottom'
             }
        };

        // Display the chart inside the <div> element with id="piechart"
        var chart = new google.visualization.PieChart(document.getElementById('piechart'));
        chart.draw(data, options);
    }
/** <====== **/

    console.log(tableData);
    $('#table_id').DataTable({
        // "scrollY":            "200px",
        "scrollCollapse":     true,
        "paging":             false,
        "dom": '<"card " <"card-header align-items-top"<<"#title.float-left"<"testT">><"#boutonAjout.float-right.align-items-top"f>>><"card-body" <"#tableCollabo.table" t>><" card-footer.d-flex justify-content-end"<"p-2" l><"ml-auto p-2" p>>>',
        "data": tableData.data,
        columns: [
            { data: 'Nom' },
            { data: 'DateD' },
            { data: 'DateF' },
            { data: 'Collaborateurs' },
            { data: 'status' },
            { data: 'completion' }
        ],
        "columnDefs": [{
                'targets': 5,
                'className': 'completion',
                render: function(data, type, full) {
                    // console.log(data);
                    // var random = Math.floor(Math.data() * 101);
                    var stateClass = 'bg-success';
                    if (data > 0 && data < 26) stateClass = 'bg-danger';
                    else if (data >= 25 && data < 61) stateClass = 'bg-warning';
                    else if (data >= 61 && data < 100) stateClass = 'bg-primary';
                    else if (data == 100) stateClass = 'bg-success';
                    return '<div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated ' + stateClass + ' role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width:' + data + '%">' + data + '%</div></div>';
                }
            }
        ]
    });
    $('#title').append("<h5><strong>Tâches associées au projet</strong></h5>");
    $('#boutonAjout').append('<button class="btn btn-success float-right ion-android-add" data-toggle="modal" data-target="#modalTaskCreation" type="button"></button>');
} );
