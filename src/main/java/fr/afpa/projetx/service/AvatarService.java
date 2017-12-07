package fr.afpa.projetx.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import fr.afpa.projetx.DAO.intefaces.IAvatarDao;
import fr.afpa.projetx.models.Avatar;
import fr.afpa.projetx.service.interfaces.IAvatarService;

@Service
@Transactional
public class AvatarService  implements IAvatarService {

    @Autowired
    private IAvatarDao dao;
	
	@Override
	public List<Avatar> findAllAvatar() {
		return dao.findAllAvatar();
	}

	@Override
	public Avatar findById(long id) {
		return dao.findById(id);
	}

	@Override
	public void saveAvatar(Avatar avatar) {
        dao.saveAvatar(avatar);		
	}

}
