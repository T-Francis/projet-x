$(document).ready(function() {
    var urls = ["/projetx/demo/views/inc/modal/modalEquipesGhost.html","/projetx/demo/views/inc/modal/modalEquipesDoublonAlert.html"];

    //call the function that will request the html content with an ajax call and append it to the param element
    includeHtmlLikeaPig( $("#ghost"), urls[0] );
    includeHtmlLikeaPig( $("#doublonAlert"), urls[1] );

//on cache la liste global de collaborateurs
$('#ajouter').hide();

$('.boutton-modif-equipe').click( function (){
    id = "#"+ $(this).closest('.card').find('.row').attr('id');
    if ($(this).hasClass("ion-edit")) {
        editerEquipe(id, $(this));
    } else {
        enregistrer(id, $(this));
    }
});

//Permet de transformer le tableau en datatable
$('#tableprojets').dataTable();
$('#tabletaches').dataTable();
$('#tableactivites').dataTable();



$('.member-card-list').click(function($this){
    $memberToAdd = $(this).clone();
    // console.log($memberToAdd.children("span").text());
    $memberToAdd.removeClass("col-12 member-card-list").children().removeClass("avatar-liste").addClass("avatar");
    $memberToAdd.addClass("col-xs-6 col-sm-6 col-md-6 col-lg-4 col-xl-4");
    if (testDoublon($memberToAdd, id) > 0){
        $("#cloneMember").text($memberToAdd.children("span").text());
        $("#doublonAlert").modal('show').css( "z-index", "2001" );
    }else{
        $memberToAdd.appendTo(id);
    }
})

modifierEquipe('#btnmodifier');
modifierEquipe('#btnmodifier1');
modifierEquipe('#btnmodifier2');
modifierEquipe('#btnmodifier3');
});



function editerEquipe(id,button){
    button.removeClass("ion-edit").addClass("ion-archive").removeClass("btn-success").addClass("btn-info").text(" enregistrer");
    $('#team-block').removeClass("col-lg-12").addClass("col-lg-10");
    $('#ajouter').addClass("animated bounceInRight");
    $("#ajouter").show();
    $('#ghost').modal('show');
    $(id).parents(".card-block").css( "z-index", "2000" );
    $('#ajouter').css( "z-index", "2000" );
};


function enregistrer(id,button){
    $('#ghost').modal('hide');
    button.removeClass("ion-archive").addClass("ion-edit").removeClass("btn-info").addClass("btn-success").text(" modifier");
    $('#team-block').removeClass("col-lg-10").addClass("col-lg-12");
    $("#ajouter").hide();
    $(id).parents(".card-block").css( "z-index", "0" );
    $('#ajouter').css( "z-index", "0" );
};

//ajout d'un paramètre supplémentaire idequipe
function testDoublon(elem, idequipe){
    var compteur = 0;
    $(idequipe+" > div").each(function(){
        if(elem.children("span").text()==$(this).children("span").text()){
            compteur ++;
        }
    })
    return compteur;
}

function modifierEquipe(id){
    $(id).click(function(e){
        //on récupère, au click, l'id du bloc equipe qui lui est lié, ideq contient maintenant la chaine: #equipe1 ou 2 ou 3 ou 4
        ideq = "#"+ $(this).closest('.card').find('.row').attr('id');

        //Je récupère tous les boutons
        var $inputBtns = $('button');
        if ($(id+' b').text() == 'enregistrer') {
            $(id+' b').text('modifier');
            // ci dessus,le "b" permet de pointer l'enfant de l'element qui a l'id et qui s'appelle "b"
            $('#equipes').removeClass("col-6 col-lg-10 ");
            $("#ajouter").hide();
            //les boutons ne sont plus désactivés après l'enregistrement
            $inputBtns.not(this).prop('disabled', false);

        }else{

            $(id+' b').text('enregistrer');
            $('#equipes').addClass("col-6 col-lg-10 ");
            $('#ajouter').addClass("animated bounceInRight");
            $("#ajouter").show();
            //desactivation des boutons sauf celui cliqué
            $inputBtns.not(this).prop('disabled', true);
        }
    })
}
