import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Employees } from 'src/app/shared/employee/employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(public service:EmployeeService, private toastr: ToastrService, private dialogRef:MatDialogRef<Employees>) { }

  departments=[]

  ngOnInit() {
    this.service.fetchDepartments()
    .subscribe(
      res=>{
        for(let i=1;i<res.length;i++){
         this.departments.push({name:res[i].name,value:res[i].code});
        }
      }
    );
  }

  onClear(){
   this.service.form.reset();
   this.service.initializeFormGroup();
  }

  onSubmit(){
    this.service.saveEmployeeDetails(this.service.form.value).subscribe(
      res=>{
        this.service.form.reset();
        this.service.initializeFormGroup();
        this.toastr.success('Employee info saved successfully');
        this.onClose();
        this.service.fetchEmployees();
      }
    );
  }

  onClose(){
    this.service.form.reset();
        this.service.initializeFormGroup();
        this.dialogRef.close();
  }
}
