package fr.afpa.projetx.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

import fr.afpa.projetx.models.User;
import fr.afpa.projetx.service.interfaces.IUserService;


@Controller
public class HomeController {
	
	@Autowired
	IUserService userService;
	
	@GetMapping("/")
	public ModelAndView index() {
		ModelAndView model = new ModelAndView("index");			
		model.addObject("user", new User());		
		return model;
	}
		
	
}
