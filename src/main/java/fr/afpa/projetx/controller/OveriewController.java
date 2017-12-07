package fr.afpa.projetx.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class OveriewController {
	
	@GetMapping("/overview")
	public ModelAndView test() {
		ModelAndView model = new ModelAndView("overview");				
		return model;
	}
}
