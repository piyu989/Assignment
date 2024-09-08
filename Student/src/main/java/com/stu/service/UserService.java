package com.stu.service;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

import com.stu.entity.UserDto;

@FeignClient(url = "http://localhost:8080",name="SpringSrc")
public interface UserService {
	@GetMapping("/auth/profile")
	public UserDto getUserProfile(@RequestHeader("Authorization")String jwt);
}
