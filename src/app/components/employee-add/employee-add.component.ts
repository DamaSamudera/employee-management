import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../interfaces/employee';
import { formatDate } from '@angular/common';

interface Group {
  name: string;
  code: string;
}

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrl: './employee-add.component.scss'
})
export class EmployeeAddComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private messageService: MessageService
  ) { }

  groupItems: Group[] | undefined;
  formGroup: FormGroup | undefined;
  selectedGroup: any = null;
  dateTime = new Date();

  ngOnInit() {
    this.groupItems = [
      { name: 'IT', code: 'IT' },
      { name: 'Finance', code: 'Finance' },
      { name: 'People Development', code: 'People Development' },
      { name: 'Personnel Administration', code: 'Personnel Administration' },
      { name: 'Recruitment & Hiring', code: 'Recruitment & Hiring' },
      { name: 'Supply Chain', code: 'Supply Chain' },
      { name: 'Procurement', code: 'Procurement' },
      { name: 'Quality Assurance', code: 'Quality Assurance' },
      { name: 'Budgeting', code: 'Budgeting' },
      { name: 'Business Analyst', code: 'Business Analyst' }
    ];

    this.formGroup = new FormGroup({
      selectedGroup: new FormControl<Group | null>(null)
    });
  }

  addEmployeForm = this.fb.group({
    username: ['', [Validators.required]],
    firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    email: ['', [Validators.required, Validators.email]],
    birthDate: [formatDate(Date(), 'YYYY-MM-dd', 'en'), [Validators.required]],
    basicSalary: [0, [Validators.required]],
    status: ['', [Validators.required]],
    group: ['', [Validators.required]],
    description: [formatDate(Date(), 'YYYY-MM-dd', 'en'), [Validators.required]],
  })

  get username() {
    return this.addEmployeForm.controls['username'];
  }

  get firstName() {
    return this.addEmployeForm.controls['firstName'];
  }

  get lastName() {
    return this.addEmployeForm.controls['lastName'];
  }

  get email() {
    return this.addEmployeForm.controls['email'];
  }

  get birthDate() {
    return this.addEmployeForm.controls['birthDate'];
  }

  get basicSalary() {
    return this.addEmployeForm.controls['basicSalary'];
  }

  get status() {
    return this.addEmployeForm.controls['status'];
  }

  get group() {
    return this.addEmployeForm.controls['group'];
  }

  get description() {
    return this.addEmployeForm.controls['description'];
  }

  addEmployee() {
    const postData = { ...this.addEmployeForm.value };
    this.employeeService.addEmployee(postData as Employee).subscribe(
      response => {
        console.log(response);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Employee successfully added' });
        this.router.navigate(['employee-list'])
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed add employee' });
      }
    )
  }

}
