package fr.afpa.projetx.DAO.intefaces;

import org.springframework.stereotype.Component;
import fr.afpa.projetx.models.Avatar;
import java.util.List;

@Component
public interface IAvatarDao {
	
	Avatar findById(long id);

    void saveAvatar(Avatar avatar);

    public List<Avatar> findAllAvatar();
    
}
