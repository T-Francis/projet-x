$(document).ready(function() {

    //Permet de transformer le tableau de messagerie en datatable
    $('#tableProjets').DataTable({
        "ajax": "/projetx/demo/data/projets.json",
        "dom": '<"#collabo.card " <"#headerTableau.card-header card-primary align-items-top"<<"#title.float-left"><"flaot-right"f>>><"card-body" <"#tableCollabo.table" t>><" card-footerd-flex justify-content-end"<"p-2" l><"ml-auto p-2" p>>>',
        "columns": [

            {"targets": 0, data: 0},
            {"targets": 1, data: 2},
            {"targets": 2, data: 3},
            {"targets": 3, data: 5},
        ],
        columnDefs:[
            {"targets": 3, "render": function (type, data, full) {
                return '<div class="progress"><div class="progress-bar" role="progressbar" style="width: '+full[5]+'%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div></div>';
                // return '<div class="align-items-center"><img class="mr-auto" height="50px" width="50px" src="/projetx/demo/images/avatar1-2.png"/>"/><span class="ml-auto">'  +full[1] +' '+ full[2]+ '</span></div>';
            }
            },
        ],
    });


    $('#title').append('<h5>Mes Projets </h5>');
    $('tbody').on('click', '.odd, .even', function(){
        window.location.replace("/projets/detail");

    });
});
