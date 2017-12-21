package fr.afpa.projetx.controller;

import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import fr.afpa.projetx.models.User;
import fr.afpa.projetx.service.interfaces.IUserService;

@Controller
public class ProfileController {
	
//	private static String AVATARS_FOLDER = "C:\\Users\\34011-79-04\\jee-workspace\\projet-x\\target\\projetx\\resources\\images\\avatars\\";
//	private static String AVATAR_LINK = "resources/images/avatars/";

	
	@Autowired
	IUserService userService;
	
	@GetMapping("/profile")
	public String showProfile(Model m, HttpServletRequest req) {
		
		
		User u = (User) req.getSession().getAttribute("loggedInUser");
		m.addAttribute("loggedInUser", u);
		
		if(u.getPhoto() != null) {
			m.addAttribute("avatarUrl", userService.decodeBlob(u.getPhoto()));
		} else {
			m.addAttribute("avatarUrl", "/projetx/resources/images/noavatar.png");
		}
		
		return "profile";
	}

	@PostMapping("/profile/update")
	public String saveProfile(@RequestParam Map<String, String> requestParams, @RequestParam("avatar") MultipartFile file, Model model, HttpServletRequest req) {
		
		User u = (User) req.getSession().getAttribute("loggedInUser");
		
		String firstname = requestParams.get("firstname");
		String lastname = requestParams.get("lastname");
		String skill = requestParams.get("skill");

		if(!firstname.equals("")) u.setFirstname(firstname);
		if(!lastname.equals("")) u.setLastname(lastname);
		
		u.setSkill(skill);

		if(!file.isEmpty()) {
			try {
				u.setPhoto(file.getBytes());
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		
        userService.updateUser(u);
        return "redirect:/profile";
    }

}
