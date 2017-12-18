package fr.afpa.projetx.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import fr.afpa.projetx.models.User;
import fr.afpa.projetx.service.interfaces.IAuthentificationService;
import fr.afpa.projetx.service.interfaces.IUserService;

@Service
@Transactional
public class AuthentificationService implements IAuthentificationService{

    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
	private IUserService userService;
    
    public String encodeUserPassword(String password) {
    	return passwordEncoder.encode(password);
    }

	public boolean checkLogin(String email, String password) {
		User u = userService.findByEmail(email);
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		
		if(u != null && encoder.matches(password, u.getPassword())) return true;
		else return false;
	}
		
}
