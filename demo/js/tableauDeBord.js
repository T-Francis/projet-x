$(document).ready(function() {

    //including all necessessary modal
    includeHtmlLikeaPig($("#projectCreation"), "/projetx/demo/views/inc/modal/modalProjectCreation.html");
    includeHtmlLikeaPig($("#taskCreation"), "/projetx/demo/views/inc/modal/modalTaskCreation.html");

    // calling the function that initialize the datatable
    drawProjectTable();
    drawTaskTable();

});

/**
 * [drawProjectTable initialize the project table with a default url]
 * @param  {[string]} arg [description]
 * @return {[void]}     [description]
 */
function drawProjectTable(url) {

    //if we dont set an specific url, we define one by default
     url ? url = url : url = "/projetx/demo/data/projectsActive.json";
    $('#tableprojets').DataTable({
        responsive: true, //responsive dataTables with responsive priority on <th>
        info: false,
        paging: false,
        //default order
        order: [
            [1, 'asc']
        ],
        ajax: url,
        //column data attachment
        columns: [
            {data: 'logo'},
            {data: 'nom'},
            {data: 'DateD'},
            {data: 'DateF'},
            {data: 'completion'},
            {data: 'equipes'}
        ],
        // where we rework the data if needed
        columnDefs: [{
                'targets': 0,
                'className': 'projectName',
                render: function(data, type, full) {
                    return '<img src="' + data + '" class="avatar">';
                }
            }, {
                'targets': 1,
                'className': 'projectName',
                render: function(data, type, full) {
                    // console.log(full);
                    return '<a class="" href="/projetx/demo/views/projetDetails.html?projectId='+full.dataId+'"> ' + data + ' </a>';
                }
            },
            {
                'targets': 4,
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
            },
            {
                "targets": 5,
                render: function (data, type, full){
                    for (var variable in data) {
                        console.log(data[variable]);

                    }
                    return $.map( data, function ( d, i ) {
                        console.log(d);
                        return '<a href="" onclick="" class="memberLink" data-placement="right" data-trigger="hover" data-content="clicker pour envoyer un message">'+ d.name +'</a>';
                    } ).join( ' ' );
                }
            }
        ]
    });
}

/**
 * [drawTaskTable initialize the task table with a default url]
 * @param  {[string]} url [description]
 * @return {[void]}     [description]
 */
function drawTaskTable(url) {
    //if we dont set an specific url, we define one by default
    url ? url = url : url = "/projetx/demo/data/taskDominiqueActive.json";
    $('#tabletaches').DataTable({
        responsive: true,
        info: false,
        paging: false,
        order: [
            [1, 'asc']
        ],
        ajax: url,
        columns: [{
            data: 'Nom'},
            {data: 'priority'},
            {data: 'status'},
            {data: 'Projet'},
            {data: 'completion'},
            {data: 'DateD'},
            {data: 'DateF'},
            {data: 'mTask'}
        ],
        columnDefs: [{
            'targets': 4,
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
        }]
    });
}
