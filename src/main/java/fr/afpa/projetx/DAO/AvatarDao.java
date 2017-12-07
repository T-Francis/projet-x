package fr.afpa.projetx.DAO;

import java.util.List;

import org.hibernate.Query;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import fr.afpa.projetx.DAO.intefaces.IAvatarDao;
import fr.afpa.projetx.models.Avatar;

@Component
@Transactional
public class AvatarDao extends AbstractDao<Long, Avatar> implements IAvatarDao {

    static final Logger logger = LoggerFactory.getLogger(UserDao.class);

    public Avatar findById(long id) {
    	Avatar avatar = getByKey((Long) id);      
        return avatar;
    }
   
    public List<Avatar> findAllAvatar() {
    	Query query = getSession().createQuery(
                "from Avatars");
        
        @SuppressWarnings("unchecked")
		List<Avatar> avatarList = (List<Avatar>) query.list();
        return avatarList; 
    }

    public void saveAvatar(Avatar avatar) {
    	persist(avatar);
    }

}
