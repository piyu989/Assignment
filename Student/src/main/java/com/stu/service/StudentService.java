package com.stu.service;

import java.util.List;

import com.stu.entity.Student;

public interface StudentService {
	Student save(Student student);
	void delete(String contactDetails);
	Student update(Student student);
	Student getStudent(String contactDetails);
	List<Student> getAllStudent();
}
