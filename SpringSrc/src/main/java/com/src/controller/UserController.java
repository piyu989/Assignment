package com.src.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.src.entity.User;
import com.src.service.UserService;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class UserController {

	@Autowired
	private UserService service;
	
	@PostMapping("/save")
	public User save(@RequestBody User user) {
		return service.save(user);
	}
	
	@PostMapping("/login")
	public String login(@RequestBody User user) {
		return service.verify(user);
	}
	
	@GetMapping("/users")
	public List<User> getAllUser(){
		return service.getAllUser();
	}
	
	@GetMapping("/user/{username}")
	public User getUserByUsername(@PathVariable String username) {
		return service.getUser(username);
	}
	
	@GetMapping("/profile")
	public User getUserProfile(@RequestHeader("Authorization")String jwt) {
		jwt=jwt.substring(7);
		return service.getUserFromToken(jwt);
	}
	
	
}
