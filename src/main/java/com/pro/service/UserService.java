package com.pro.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.pro.entity.User;

@Service
public interface UserService {
	User createUser(User user);
	void deleteUser(int id);
	void updateUser(User user);
	List<User> getAllUser();
	void updateUser(int id);
	User getUserById(int id);
}
