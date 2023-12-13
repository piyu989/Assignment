package com.pro.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pro.entity.User;
import com.pro.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepos;
	
	@Override
	public User createUser(User user) {
		// TODO Auto-generated method stub
		return userRepos.save(user);
	}

	@Override
	public void deleteUser(int id) {
		// TODO Auto-generated method stub
		userRepos.deleteById(id);
		
	}

	@Override
	public void updateUser(int id) {
		// TODO Auto-generated method stub
		User u=userRepos.findById(id);
		userRepos.save(u);
	}

	@Override
	public User getUserById(int id) {
		// TODO Auto-generated method stub
		User u=userRepos.getById(id);
		return u;
	}

	@Override
	public void updateUser(User user) {
		// TODO Auto-generated method stub
		userRepos.save(user);
	}

	@Override
	public List<User> getAllUser() {
		// TODO Auto-generated method stub
		return userRepos.findAll();
	}

}
