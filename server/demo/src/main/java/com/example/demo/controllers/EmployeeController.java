package com.example.demo.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.example.demo.bean.Employee;
import com.example.demo.bean.ErrorMessage;
import com.example.demo.services.EmployeeService;

@Controller
public class EmployeeController {

	@Autowired
	EmployeeService empService;

	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public ResponseEntity<?> saveEmployee(@Valid @RequestBody Employee employee) {
		ErrorMessage error = new ErrorMessage();
		if (empService.findUserByMail(employee.getMail()) >= 1) {
			error.setErrorMessage("Mail is duplicated");
			return ResponseEntity.badRequest().body(error);
		}

		if (empService.findUserByMobile(employee.getMobile()) >= 1) {
			error.setErrorMessage("Mobile Number is duplicated");
			return ResponseEntity.badRequest().body(error);
		}
		try {

			Employee emp = empService.createEmp(employee);
			return ResponseEntity.ok().build();

		} catch (Exception e) {
			error.setErrorMessage("Save failed");
			return ResponseEntity.badRequest().body(error);
		}

	}

}
