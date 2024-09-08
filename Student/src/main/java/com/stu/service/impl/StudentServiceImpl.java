package com.stu.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stu.entity.Student;
import com.stu.repo.StudentRepository;
import com.stu.service.StudentService;

@Service
public class StudentServiceImpl implements StudentService {
	
	@Autowired
	private StudentRepository repo;

	@Override
	public Student save(Student student) {
		// TODO Auto-generated method stub
		return repo.save(student);
	}

	@Override
	public void delete(String contactDetails) {
		// TODO Auto-generated method stub
		Optional<Student> optionalStudent=repo.findById(contactDetails);
		Student student = optionalStudent.get();
		repo.delete(student);
	}

	@Override
	public Student update(Student student) {
		// TODO Auto-generated method stub
		return repo.save(student);
	}

	@Override
	public Student getStudent(String contactDetails) {
		// TODO Auto-generated method stub
		Optional<Student> optionalStudent=repo.findById(contactDetails);
		Student student = optionalStudent.get();
		return student;
	}

	@Override
	public List<Student> getAllStudent() {
		// TODO Auto-generated method stub
		return repo.findAll();
	}

}