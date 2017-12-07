package fr.afpa.projetx.service.interfaces;
import fr.afpa.projetx.models.Avatar;
import java.util.List;

public interface IAvatarService {

	List<Avatar> findAllAvatar();

	Avatar findById(long id);

    void saveAvatar(Avatar avatar);

	
}
