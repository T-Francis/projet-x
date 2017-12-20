package fr.afpa.projetx.DAO;

import fr.afpa.projetx.DAO.intefaces.IUserDao;
import fr.afpa.projetx.models.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import org.hibernate.Query;


@Component
@Transactional
public class UserDao extends AbstractDao<Long, User> implements IUserDao {

    static final Logger logger = LoggerFactory.getLogger(UserDao.class);

    public User findById(long id) {
    	User user = getByKey((Long) id);      
        return user;
    }
    
    public User findByEmail(String email) {
    	Query query = getSession().createQuery("from User where email = :eMail");
    	query.setParameter("eMail", email);
    	return (User) query.uniqueResult();
    }
   
    public List<User> findAllUser() {
    	Query query = getSession().createQuery(
                "from User");
        
        @SuppressWarnings("unchecked")
		List<User> users = (List<User>) query.list();
        return users; 
    }

    public void saveUser(User user) {
    	persist(user);
    }

}
