package fr.afpa.projetx.service;

import fr.afpa.projetx.DAO.intefaces.IUserDao;
import fr.afpa.projetx.models.User;
import fr.afpa.projetx.service.interfaces.IUserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UserService implements IUserService {
	
    @Autowired
    private IUserDao dao;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public void saveUser(User user) {
    	user.setPassword(passwordEncoder.encode(user.getPassword()));
        dao.saveUser(user);
    }

	public User findById(long id) {
        return dao.findById(id); 
	}

	public List<User> findAllUser() {
		return dao.findAllUser();
	}
	
	public User findByEmail(String email) {
		return dao.findByEmail(email);
	}

	public boolean checkLogin(String email, String password) {
		User u = this.findByEmail(email);
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		
		if(u != null && encoder.matches(password, u.getPassword())) return true;
		else return false;
	}

}