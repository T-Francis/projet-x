$(document).ready(function() {

	//transforme la liste des messages en datatable
	var url = 'http://www.json-generator.com/api/json/get/bPGrFwmCJK?indent=2';
	var table = $('#data-messages').DataTable({
		responsive: true,
	    ajax: url,
	    columns: [
	    	{ data: ''},
		    { data: 'Date'}, 
		    { data: 'Heure'},
		    { data: 'Expediteur'},
		    { data: 'Objet'},
		    { data: 'PieceJointe'},
		    { data: 'Dossier'}
	    ],
	    columnDefs: [{
         'targets': 0,
         'searchable':false,
         'orderable':false,
         'width' : '15',
         'className': 'dt width-checkbox',
         'render': function (){
             return '<input type="checkbox" class="check" />';
         }
      }],
      'order': [1, 'asc']

	});

	//Variable permettant de stocker l'objet de la ligne cliquée afin de la réutiliser lors de la réponse au message reçu
	var storeData;

	//Noms de fichiers random
	var pfNames = ["Maquette.pdf", "Planning.pdf", "Document Important.pdf", "Image.jpeg", "Diagramme.jpg", "Doc abc.docx", "Maquette2.pdf", "Planning2.pdf", "Document Important3.pdf", "Image5.jpeg", "Diagramme2.jpg", "Doc azerty.docx"];
	
	//Handler sur le click de n'importe qu'elle cellule sauf celle de la checkbox (pour eviter d'afficher le message lors du click sur une checkbox)
	$(document).on("click",'#data-messages tbody tr td:not(:nth-child(1))', function (e){
		$('#modalDisplayMess').modal("show");
        var data = table.row(this).data();
        storeData = data;
        $("#infoMess").text('Message de '+ data.Expediteur +' reçu le '+ data.Date +' à '+ data.Heure);
        $("#expediteur").text(data.Expediteur+' <'+data.Email+'>');
        $('#objetMessRecu').text(data.Objet);
        $('#messageRecu').text(data.Message);
        if(data.PieceJointe > 0){
        	for (var i = 0; i < data.PieceJointe; i++) {
        		var random = Math.floor(Math.random() * 11);
        		$('#PJrecues').append("<a href='#'>"+pfNames[random]+"</a><br/>");
        	}
        }
    });

    //Recup des infos de la ligne au click de la checkbox
    /*$(document).on("click","#data-messages tbody tr input[type='checkbox']", function (e){
        var tr = table.row($(this).closest("tr")).data();
        console.log(tr);
    });*/

    //liste contenant les objets(lignes) des éléments checkés
    var listCheckedRows = [];

    //Les boutons répondre, transferer et suivre passent en grisé (disabled) lorsque plusieurs checkboxes sont cochées
    $(document).on("change", 'input:checkbox', function(){
        //Partie servant à ajouter/supprimer chaque ligne cliquée dans une liste
        var tr = table.row($(this).closest("tr")).data();
        if($(this).is(':checked')){
            listCheckedRows.push(tr);
        }else{
            listCheckedRows.splice(listCheckedRows.indexOf(this), 1);
        }

        //Partie servant à griser/dégriser en fonction de ce qui est checké
        var buttonsAction = $("#repAction, #transferAction");
        var buttonsActionGroupe = $("#suppAction, #archiverAction");
        var numberOfChecked = $('input:checkbox:checked').length;

        if(numberOfChecked > 1){
            buttonsAction.prop('disabled', true);
            buttonsActionGroupe.prop('disabled', false);
            $('#lierAction').prop('disabled', false);
        }else if(numberOfChecked == 1) {
            buttonsAction.prop('disabled', false);
            buttonsActionGroupe.prop('disabled', false);
            $('#lierAction').prop('disabled', false);
        } else {
            buttonsAction.prop('disabled', true);
            buttonsActionGroupe.prop('disabled', true);
            $('#lierAction').prop('disabled', true);
        }
    });

    //changement du titre quand plusieurs checkboxes sont cochées
    $(document).on("click", '#lierAction', function(){
        $('#modalLierTache').modal("show");
        $('#infoMessTache').text("Lier ces "+listCheckedRows.length+" messages à une tache");
    });
    
    //Supprimer un/des messages sauf le tr header
    $(document).on("click", '#suppAction' , function () {
        $('input:checked:not("#checkAllBoxes")').each(function() {
            $(this).closest('tr').remove();
        });
    });

    $(document).on("click", '#transferAction', function(){
        $('#modalMessage').modal("show");
        $('#message-text').val(listCheckedRows[0].Message);
    });

	//Ajout de l'email et de l'objet aux champs destinataire et objet du nouveau message lors du click sur "Répondre"
    $(document).on("click", '#respond', function(){
    	$("#modalDisplayMess").modal("hide");
    	$('#modalMessage').modal("show");
    	$('#destinataire').val(storeData.Email);
    	$('#objet').val('RE: '+storeData.Objet);
    });
    //Idem mais sur le bouton répondre du dropdown action
    $(document).on("click", '#repAction', function(){
        $('#modalMessage').modal("show");
        $('#destinataire').val(listCheckedRows[0].Email);
        $('#objet').val('RE: '+listCheckedRows[0].Objet);
    });

    //Meme chose qu'au dessus sauf que l'on crée un nouveau message avec le champs message prédéfinit
    $(document).on("click", '#transferer', function(){
        $("#modalDisplayMess").modal("hide");
        $('#modalMessage').modal("show");
        $('#message-text').val(storeData.Message);
    });

    //Affichage du modal lier une tache
    $(document).on("click", '#lierTache', function(){
        $("#modalDisplayMess").modal("hide");
        $('#modalLierTache').modal("show");
    });

    //Permet de reset les champs du form à la fermeture du modal, sinon les infos précédentes se réaffichent
    $('#modalMessage').on('hidden.bs.modal', function () {
    	$(this).find("input,textarea,select").val('').end();
	});

    //Si la liste des PJ n'est pas vidée à la fermeture du modal, la pj se réaffiche au clic sur une autre ligne
    $('#modalDisplayMess').on('hidden.bs.modal', function () {
    	$(this).find("#PJrecues").empty();
	});

    //Retour du titre à la normale
    $('#modalLierTache').on('hidden.bs.modal', function () {
        $(this).find("#infoMessTache").text('Lier à une tache').end();

    });

	//Permet de cocher/decocher tous les messages au clic de la checkbox du header 
	$('#checkAllBoxes').click(function(e) {
	  	if(this.checked) {
            //Pour chaque checkbox du tbody
	    	$('.check:checkbox').each(function() {
                //Passage à true pour cocher chaque checkbox...
	          	this.checked = true;
                /*... et par la même occasion si l'objet n'est pas dans la list, je l'ajoute 
                (ce controle est fait pour eviter de dupliquer, par exemple dans le cas où avant 
                de tout cocher il y-ait déjà une ou plusieurs checkboxes cochées)*/
                var data = table.row($(this).closest("tr")).data();
                if($.inArray(data, listCheckedRows) == -1){
                    listCheckedRows.push(data);
                }
                
	      });
	  	}
	  	else {
	    	$('.check:checkbox').each(function() {
	          	this.checked = false;
                listCheckedRows.splice(listCheckedRows.indexOf(this), 1);
	      });
	  	}

	});

	//ajout d'un input file au clic sur le bouton pièce jointe
	$('#addPJ').click(function(e){
    	addInputFile();
    });

});


function addInputFile(){
	var input = document.createElement('input');
    input.type = 'file';

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn btn-danger btn-sm float-right';
    btn.innerHTML = '-';
    btn.addEventListener('click', function(e){
    	$(this).hide('slow', function(){
    	 	$(this).closest('div').remove();
    	});
    }, false);


    var label = document.createElement('label');
    label.className = 'form-control-label col-md-3';


    var div = document.createElement('div');
    div.className = 'form-group row';

    label.appendChild(btn);
    div.appendChild(label);
    div.appendChild(input);
    blockPJ.appendChild(div);
}