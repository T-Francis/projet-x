package fr.afpa.projetx.service.interfaces;

import fr.afpa.projetx.models.User;

import java.util.List;

public interface IUserService {

	List<User> findAllUser();

    User findById(long id);

    void saveUser(User user);
    
    public User findByEmail(String email);

}
