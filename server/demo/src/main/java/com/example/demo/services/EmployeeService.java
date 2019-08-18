package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.bean.Employee;
import com.example.demo.repositories.EmployeeRepository;


@Service

public class EmployeeService {
	
	@Autowired
	EmployeeRepository empRepository;
	
	public Employee createEmp(Employee emp) {
		return empRepository.save(emp);
	}
	
	public int findUserByMail(String mail) {
		return empRepository.findEmpByMail(mail);
	}
	
	public int findUserByMobile(String mobile) {
		return empRepository.findEmpByMobile(mobile);
	}

}
