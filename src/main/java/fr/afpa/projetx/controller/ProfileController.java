package fr.afpa.projetx.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
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
	
	private static String AVATARS_FOLDER = "/projetx/resources/images/avatars/";
	
	@Autowired
	IUserService userService;
	
	@GetMapping("/profile")
	public String showProfile(Model m, HttpServletRequest req) {
		m.addAttribute("loggedInUser", req.getSession().getAttribute("loggedInUser"));
		return "profile";
	}
	
//	public void save(@RequestParam("avatar") MultipartFile avatar) throws IOException {
//	    if (!avatar.isEmpty()) {
//			byte[] bytes = avatar.getBytes(); // alternatively, file.getInputStream();
//	    }
//	}
	
	@PostMapping("/profile/update")
	public String save(@RequestParam Map<String, String> requestParams, @RequestParam("avatar") MultipartFile file, Model model, HttpServletRequest req) {
		
		User u = (User) req.getSession().getAttribute("loggedInUser");

		if(!requestParams.get("firstname").equals("")) u.setFirstname(requestParams.get("firstname"));
		if(!requestParams.get("lastname").equals("")) u.setLastname(requestParams.get("lastname"));
		
		if(!requestParams.get("email").equals("")) {
			if(!requestParams.get("email").matches("[A-Za-z0-9._-]+@[A-Za-z0-9.-]{2,}.[A-Za-z]{2,}")) {
				model.addAttribute("IncorrectEmail", "The email '"+requestParams.get("email")+"' is incorrect");
				return "profile";
			} else if(userService.findByEmail(requestParams.get("email")) != null && userService.findByEmail(requestParams.get("email")).getIdUser() != u.getIdUser() ) {
				model.addAttribute("EmailTaken", "This email is already taken");
				return "profile";
			} else u.setEmail(requestParams.get("email"));
		}
		
		if(!requestParams.get("skill").equals("")) u.setSkill(requestParams.get("skill"));
		if(!requestParams.get("password").equals("") && !requestParams.get("passwordConfirm").equals("")){
			if(!requestParams.get("password").equals(requestParams.get("passwordConfirm"))) {
				model.addAttribute("PasswordsDontMatch", "The passwords do not match");
				return "profile";
			} else u.setPassword(requestParams.get("password"));
		}
		
		try {
			 File transferFile = new File(AVATARS_FOLDER + file.getOriginalFilename()); 
			 file.transferTo(transferFile);
		} catch (IOException e) {
			e.printStackTrace();
		}
		
        userService.updateUser(u);
        return "redirect:/profile";
    }

}
