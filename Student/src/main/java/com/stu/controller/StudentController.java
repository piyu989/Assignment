package com.stu.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stu.entity.Student;
import com.stu.entity.UserDto;
import com.stu.service.StudentService;
import com.stu.service.UserService;

@RestController
@RequestMapping("/student")
@CrossOrigin
public class StudentController {

	@Autowired
	private StudentService service;
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/save")
	public Student save(@RequestBody Student student,@RequestHeader("Authorization")String jwt) {
		if(userService.getUserProfile(jwt)!=null) {			
			return service.save(student);
		}
		throw new RuntimeException("Token is invalid");
	}
	
	@PutMapping("/update")
	public Student update(@RequestBody Student student,@RequestHeader("Authorization")String jwt) {
		if(userService.getUserProfile(jwt)!=null) {			
			return service.update(student);
		}
		throw new RuntimeException("Token is invalid");
	}
	
	@DeleteMapping("/delete/{contactDetails}")
	public Student delete(@PathVariable String contactDetails,@RequestHeader("Authorization")String jwt) {
		if(userService.getUserProfile(jwt)!=null) {			
			Student student=service.getStudent(contactDetails);
			service.delete(contactDetails);
			return student;
		}
		throw new RuntimeException("Token is invalid");
	}
	
	@GetMapping("/{contactDetails}")
	public Student getUser(@PathVariable String contactDetails,@RequestHeader("Authorization")String jwt) {
		if(userService.getUserProfile(jwt)!=null) {			
			return service.getStudent(contactDetails);
		}
		throw new RuntimeException("Token is invalid");
	}
	
	@GetMapping("/all")
	public List<Student> getAllUser(@RequestHeader("Authorization")String jwt){
		UserDto userDto=userService.getUserProfile(jwt);
		if(userDto==null) {
			throw new RuntimeException("Token is invalid");
		}else {			
			return service.getAllStudent();
		}
	}
}
