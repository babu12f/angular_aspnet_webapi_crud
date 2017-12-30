import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { EmployeeService } from '../shared/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService : EmployeeService, private toastr : ToastrService) { }

  ngOnInit() {
  	this.resetForm();
  }

  resetForm(form? : NgForm){

  	if(form != null)
  		form.reset();

  	this.employeeService.selectedEmployee={
	  	Id : null,
	    FirstName : '',
	    LastName : '',
	    EmpCode : '',
	    Position : '',
	    Office : ''
	  }
  }

  onSubmit(form : NgForm){

    if(form.value.Id == null){
    	this.employeeService.postEmployee(form.value)
    	.subscribe(x => {
    		this.resetForm(form);
        this.employeeService.getEmployeeList();
    		this.toastr.success('Employee Added Successfully', 'Employee CRUD App');
    	});
    }else{
      //update
      this.employeeService.putEmployee(form.value.Id, form.value)
      .subscribe(x => {
        this.resetForm(form);
        this.employeeService.getEmployeeList();
        this.toastr.info('Employee Updated Successfully', 'Employee CRUD App');
      });
    }
  }

}
