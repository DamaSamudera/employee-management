import { Component, OnDestroy, OnInit } from '@angular/core';
import { Employee } from '../../interfaces/employee';
import { Subscription } from 'rxjs';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit, OnDestroy {

  employee: Employee[] = [];
  subscriptions: Subscription[] = [];
  pdtSubscription: Subscription = new Subscription();

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.getEmployeeList();
  }

  getEmployeeList() {
    this.pdtSubscription = this.employeeService.getEmployee().subscribe(
      response => {
        this.employee = response;
      }
    );
    this.subscriptions.push(this.pdtSubscription)
  }

  getStatus(status: boolean) {
    if (status) {
      return 'success'
    } else {
      return 'danger'
    }
  }

  handleAdd() {
    return this.router.navigate(['employee-add'])
  }

  handleDetails(id: string) {
    return this.router.navigate([`employee-detail/${id}`])
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
