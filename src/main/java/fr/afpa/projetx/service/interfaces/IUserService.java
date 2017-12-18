package fr.afpa.projetx.service.interfaces;

import fr.afpa.projetx.models.User;

import java.util.List;

public interface IUserService {
	
    void registerNewUser(User user);

	List<User> findAllUser();

    User findById(long id);
    
    public User findByEmail(String email);
    
}
