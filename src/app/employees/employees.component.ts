import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatDialogConfig } from '@angular/material';
import { EmployeeService } from '../shared/employee.service';
import { EmployeeComponent } from './employee/employee.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {


  displayedColumns: string[] = ['fullName', 'email', 'mobile','department','action'];
  searchKey:string;
  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;

  constructor(private service:EmployeeService, private dialog:MatDialog) { }

  ngOnInit() {
    this.service.fetchEmployees();
    this.service.listData.paginator=this.paginator;
  }

  onSearchClear(){
    this.searchKey="";
    this.applyFilter();
  }

  applyFilter(){
    console.log(this.searchKey);
    this.service.listData.filter=this.searchKey.trim().toLowerCase();
  }

  onCreate(){
    console.log('I am here')
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%"
    this.dialog.open(EmployeeComponent,dialogConfig);
  }

  onEdit(row){
    console.log(row);
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%"
    this.dialog.open(EmployeeComponent,dialogConfig);
  }

  }
