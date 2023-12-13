package com.pro.controller;

import org.springframework.http.HttpHeaders;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import com.pro.entity.User;
import com.pro.service.UserService;

@Controller
public class UserController {
	
	@Autowired
	private UserService service;
	
	@GetMapping("/registration")
	public String getRegistration(@ModelAttribute("user") User user) {
		return "register";
	}
	
	@PostMapping("/registration")
	public ResponseEntity<String> registrationPage(@ModelAttribute("user") User user,Model model) {
		try {
			service.createUser(user);
			model.addAttribute("message", "Registered Successfuly!");
			return ResponseEntity.status(HttpStatus.CREATED).body(" Successfully Created");
		}
		catch(Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("USERNAME MISSING");			
		}
	}
	
	@GetMapping("allUser")
	public String allUser(Model model){
		
        List<User> customers = service.getAllUser();
		model.addAttribute("customers", customers);
		return "user";
//		return ResponseEntity.ok(customers);
	}
	
	@GetMapping("/login")
	public String login() {
		return "login";
	}
	
	@GetMapping("/updateUser/{id}")
    public String getUpdateForm(@PathVariable int id, Model model) {
        User user= service.getUserById(id);
        model.addAttribute("user", user);
//        service.deleteUser(id);
        return "updateUser"; 
	}
	
	@PostMapping("/updateUser")
	public ResponseEntity<String> updateCustomer(@ModelAttribute("user") User user) {
	    service.updateUser(user);
	    service.deleteUser(user.getId());

	    HttpHeaders headers = new HttpHeaders();
	    headers.add("Location", "/allUser");

	    return new ResponseEntity<>(headers, HttpStatus.FOUND);
	}

	
	@DeleteMapping("/deleteUser/{id}")
	public ResponseEntity<HttpStatus> delete(@PathVariable int id) {
        service.deleteUser(id);
        return ResponseEntity.status(HttpStatus.OK).build();
	}
	
}
