package fr.afpa.projetx.service.interfaces;


public interface IAuthentificationService {

    public boolean checkLogin(String email, String password);
    
    public String encodeUserPassword(String password);	
}
