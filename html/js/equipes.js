
$(document).ready(function() {


  //Permet de transformer le tableau en datatable
  $('#tableprojets').dataTable();
  $('#tabletaches').dataTable();
  $('#tableactivites').dataTable();



  $('.drag').click(function($this,equipeEnCours){
        $nouveau = $(this).clone()
        $nouveau.addClass("col-lg-6 col-xl-4")
        $nouveau.removeClass("col-12")

        if (testDoublon($nouveau) > 0){
          alert("Ce collaborateur fait déjà parti de cette équipe !");
        }else{
          $nouveau.appendTo(equipeEnCours);
        }
    })

      modifierEquipe('#btnmodifier1');
      modifierEquipe('#btnmodifier2');
      modifierEquipe('#btnmodifier3');
      modifierEquipe('#btnmodifier4');
});

  function testDoublon(elem){
      var compteur = 0;
        $('#equipe1 > div').each(function(){

      if(elem.children("span").text()==$(this).children("span").text()){
        compteur ++;
      }
    })
        return compteur;
 }

  function modifierEquipe(id){
    console.log(id);
    $(id).click(function(e){

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
          equipeEnCours = $(id);
        }
      })
    }
