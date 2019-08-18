package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.bean.Employee;


@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
	@Query("SELECT count(emp.id) FROM Employee emp where emp.mail = :mail")
	public int findEmpByMail(@Param(value="mail") String mail);
	
	@Query("SELECT count(emp.id) FROM Employee emp where emp.mobile = :mobile")
	public int findEmpByMobile(@Param(value="mobile") String mobile);
}
