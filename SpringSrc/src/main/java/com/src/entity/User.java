package com.src.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

//import jakarta.persistence.Entity;
//import jakarta.persistence.Id;
//import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

//@Entity
@Document
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
//@Table(name = "USERSSS")
public class User {
	@Id
	private int id;
	private String username;
	private String password;
	private String address;
	
}
