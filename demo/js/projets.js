$(document).ready(function() {
    //on inclut les modal necessaire a l'interface
    includeHtmlLikeaPig($("#projectCreation"), "/projetx/demo/views/inc/modal/modalProjectCreation.html");
    includeHtmlLikeaPig($("#projectModification"), "/projetx/demo/views/inc/modal/modalProjectModification.html");

        //Permet de transformer le tableau de messagerie en datatable
        $('#tableProjets').DataTable({
            "ajax": '/projetx/demo/data/projectsAll.json',
            "dom": '<"#collabo.card " <"#headerTableau.card-header card-primary align-items-top text-white"<<"#title.float-left"><"#control.float-right"f>>><"card-body" <"#tableCollabo.table" t>><" card-footerd-flex justify-content-end"<"p-2" l><"ml-auto p-2" p>>>',
            "columns": [

                    {"targets": 0, data: "logo"},
                    {"targets": 1, data: "nom"},
                    {"targets": 2, data: "DateD"},
                    {"targets": 3, data: "DateF"},
                    {"targets": 4, data: "completion"},
                    {"targets": 5, data: "equipes"},
                    {"targets": 6, data: null},
            ],
            columnDefs:[{
                    "targets": 0,
                        render: function (data, type, full){
                        return '<img src="' + data + '" class="logo-project">';
                    }
                },
                {
                    "targets": 4,
                        render: function (data, type, full){
                        // console.log(data);
                        // var random = Math.floor(Math.data() * 101);
                        var stateClass = 'bg-success';
                        if(data > 0 && data < 26) stateClass = 'bg-danger';
                        else if(data >=25 && data <61) stateClass = 'bg-warning';
                        else if(data >=61 && data <100) stateClass = 'bg-primary';
                        else if(data == 100) stateClass = 'bg-success';
                        return '<div class="progress"><div class="progress-bar progress-bar-animated '+stateClass+' role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width:'+data+'%">'+data+'%</div></div>';
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
                },
                {
                    "targets": 6,
                        render: function (data, type, full){
                        return '<a href="/projetx/demo/views/projetDetails.html?projectId='+full.dataId+'" class="btn btn-success btn-sm ion-eye" data-placement="top" data-trigger="hover" data-content="Voir en détails" data-original-title="" title=""></a> <button type="button" class="btn btn-info btn-sm ion-edit" onclick="editProject('+full.dataId+')" data-placement="top" data-trigger="hover" data-content="Editer le projet" data-original-title="" title=""></button>';
                    }
                },
            ],
            //Explication stackOverflow: You need to reinitialize the popovers each time the dataTable is redrawn.  $(".ajoutCol").popover({ trigger: "hover" }); will only initialize those popovers visible at the time the code is executed
            drawCallback: function() {
                $(".ion-eye").popover({ trigger: "hover" });
                $(".ion-edit").popover({ trigger: "hover" });
                $(".memberLink").popover({ trigger: "hover" });
            }
        });
        $('#title').append('<h1>Mes Projets</h1>');
        $('<button class="btn btn-success btn-sm ion-plus-round float-right" data-toggle="modal" data-target="#modalProjet"><b> Creer un nouveau projet</b></button>').insertAfter('#title');
});
