package fr.afpa.projetx.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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
		User u = userService.findByEmail(email);
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		
		if(encoder.matches(pass, u.getPassword())) {
			model.addAttribute("loggedInUser", u);
			return "redirect:/overview";
		} else {
			model.addAttribute("invalidCredentials", "Invalid credentials");
			return "redirect:/";
		}
    }
	
	@RequestMapping(value="/logout", method = RequestMethod.GET)
	public String validateLogout(SessionStatus session) {
		session.setComplete();
		return "redirect:/";
	}
}
