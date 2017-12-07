package fr.afpa.projetx.DAO.intefaces;

import org.springframework.stereotype.Component;
import fr.afpa.projetx.models.User;
import java.util.List;

@Component
public interface IUserDao {

    User findById(long id);

    public List<User> findAllUser();

    void saveUser(User user);

}
