package fr.afpa.projetx.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.ModelAndView;
import fr.afpa.projetx.models.User;
import fr.afpa.projetx.service.interfaces.IUserService;


@Controller
@SessionAttributes("loggedInUser")
public class HomeController {
	
	@Autowired
	IUserService userService;
	
	@GetMapping("/")
	public ModelAndView index() {
		ModelAndView model = new ModelAndView("index");	
		
		model.addObject("user", new User());
		
		return model;
	}
		
	@PostMapping(value="/register")
    public String validateRegister(@Valid @ModelAttribute User user, BindingResult result, @RequestParam("passwordConfirm") String passwordConfirm, Model model, HttpServletRequest request) {

		if(userService.findByEmail(user.getEmail()) != null) result.rejectValue("email", "email.errors", user.getEmail()+" is already taken");
		
		if(result.hasErrors()) {
    		model.addAttribute("status", false);
            return "index";
        } else if(!passwordConfirm.equals(user.getPassword())) {
			model.addAttribute("passDontMatch", "The passwords do not match !");
			model.addAttribute("status", false);
            return "index";
		} else {
        	userService.saveUser(user);
    		model.addAttribute("status", true);
    		HttpSession session = request.getSession();
    		session.setAttribute("UserJustRegisteredEmail", user.getEmail());
            return "redirect:/";
        }
    }
	
	@PostMapping(value="/login")
    public String validateLogin(@RequestParam("email") String email, @RequestParam("password") String pass, Model model) {
		if(userService.checkLogin(email, pass)) {
			model.addAttribute("loggedInUser", userService.findByEmail(email));
			model.addAttribute("statusLogin", true);
			return "redirect:/overview";
		} else {
			model.addAttribute("invalidCredentials", "Invalid credentials");
			model.addAttribute("user", new User());
			model.addAttribute("statusLogin", false);
			return "index";
		}
    }
	
	@GetMapping(value="/logout")
	public String validateLogout(SessionStatus session) {
		session.setComplete();
		return "redirect:/";
	}
}
