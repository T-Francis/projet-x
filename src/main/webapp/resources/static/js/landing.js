$(document).ready(function(){

    var modalIsDisplayed = true;
    rngLanding= "/projetx/demo/images/landing/"+Math.floor((Math.random() * 3))+".jpg";

    aOfDisplay = [0, 0, 0];
    $('html').css({"background": "url("+rngLanding+")", "background-repeat": "no-repeat",
    "background-position": "center", "background-position": "fixed", "background-size": "cover",
    "-webkit-background-size": "cover"});

    $('.inscriptionB, .connexionB').on("click", function(){
       if(modalIsDisplayed){
           $('#jumboD').slideUp("slow");
           modalIsDisplayed = false;
       }
    });

    $('.inscriptionB').on('click', function(){

        if($("#inscriptionForm").css('display') == "block" && modalIsDisplayed == false && $("#connexionForm").css('display') == "none" ){
            return;
        }
        $('#connexionForm').hide();
        $('#resetP').hide();
        $('#inscriptionForm').slideToggle("slow");
    });

    $('.connexionB').on('click', function(){
        // console.log("Formulaire inscription : "+$("#inscriptionForm").css('display'));
        if($("#inscriptionForm").css('display') == "none" && modalIsDisplayed == false && $("#connexionForm").css('display') == "block" ){
            return;
        }
        $('#inscriptionForm').hide();
        $('#resetP').hide();
        $('#connexionForm').slideToggle("slow");
    });
    
    $(".reset").on("click", function(){
        $('#connexionForm').hide();

        $('#inscriptionForm').hide();
        $('#resetP').slideToggle("slow");
    });
    
    checkRegisterStatus();
    
    checkLoginStatus();

});

function checkRegisterStatus(){
	//the status variable is defined by an EL condition in the index.jsp
	if (status === true){
		$('.connexionB').click();
	} else{
		$('.inscriptionB').click();
	}
}

function checkLoginStatus(){
	if (statusLogin === false){
		$('.connexionB').click();
	}
}