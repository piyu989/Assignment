package com.src.repo;

import org.springframework.data.mongodb.repository.MongoRepository;

//import org.springframework.data.jpa.repository.JpaRepository;

import com.src.entity.User;

public interface UserRepository extends MongoRepository<User, Integer> {
	User findByUsername(String username);
}
