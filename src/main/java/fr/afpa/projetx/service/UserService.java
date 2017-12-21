package fr.afpa.projetx.service;

import fr.afpa.projetx.DAO.intefaces.IUserDao;
import fr.afpa.projetx.models.User;
import fr.afpa.projetx.service.interfaces.IAuthentificationService;
import fr.afpa.projetx.service.interfaces.IUserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Base64;
import java.util.List;

@Service
@Transactional
public class UserService implements IUserService {
	
    @Autowired
    private IUserDao dao;
    
    @Autowired
    private IAuthentificationService authentificationService;
    
	public User findById(long id) {
         return dao.findById(id);
	} 

	public List<User> findAllUser() {
		return dao.findAllUser();
	}
	
	public User findByEmail(String email) {
		return dao.findByEmail(email);
	}
	
    public void registerNewUser(User user) {    	
    	String encodedPass = authentificationService.encodeUserPassword(user.getPassword());
    	user.setPassword(encodedPass);    	
        dao.saveUser(user);
    }

	public void updateUser(User u) {
		dao.updateUser(u);
	}
	
	public String decodeBlob(byte[] imageByte) {
		String encodedImage = Base64.getEncoder().encodeToString(imageByte);
		return "data:image/png;base64," + encodedImage;
	}
}