import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { Employees } from './employee/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  public employees:Employees[]=[];
  listData:MatTableDataSource<any>;

  form:FormGroup = new FormGroup({
    $key:new FormControl(null),
    fullName:new FormControl('',Validators.required),
    email:new FormControl('',Validators.email),
    mobile:new FormControl('',[Validators.required,Validators.minLength(10)]),
    city:new FormControl(''),
    gender:new FormControl(1),
    department:new FormControl(0),
    hireDate:new FormControl(''),
    isPermanent:new FormControl(false)
  });

  initializeFormGroup(){
    this.form.setValue({
      $key:null,
      fullName:'',
      email:'',
      mobile:'',
      city:'',
      gender:1,
      department:0,
      hireDate:'',
      isPermanent:false
    });
  }

  saveEmployeeDetails(employee){
    const emp={
      fullName:employee.fullName,
      email:employee.email,
      mobile:employee.mobile,
      city:employee.city,
      gender:employee.gender,
      department:employee.department,
      hireDate:employee.hireDate,
      isPermanent:employee.isPermanent
    }

   return this.http.post('https://amcrud-c077e-default-rtdb.firebaseio.com/employeeDetails.json',emp);


  }

  fetchDepartments(){
    return this.http.get<{'name':string,'code':string}[]>('https://amcrud-c077e-default-rtdb.firebaseio.com/departments.json')
  }

  fetchEmployees(){
    this.http.get<{[key:string]:Employees}>('https://amcrud-c077e-default-rtdb.firebaseio.com/employeeDetails.json')
    .subscribe(resposneData=>{

      const postArray:Employees[]=[];
        for(const key in resposneData){
          if(resposneData.hasOwnProperty(key)){
            postArray.push({...resposneData[key]});
          }
        }
        for(let i=0 ;i<postArray.length;i++){
          this.employees.push(postArray[i]);
        }

        console.log(this.employees);
        this.listData=new MatTableDataSource(postArray);
        console.log(this.listData);
    }
    );
  }

  populateForm(employee){
    this.form.setValue(employee);
  }
}
