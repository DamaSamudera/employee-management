import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Employee } from '../../interfaces/employee';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.scss'
})
export class EmployeeDetailComponent {

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute, private router: Router) { }

  employee: Employee[] = [];
  subscriptions: Subscription[] = [];
  pdtSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.getEmployeeById(this.route.snapshot.params['id']);
  }

  getEmployeeById(id: string) {
    this.pdtSubscription = this.employeeService.getEmployeeById(id).subscribe(
      response => {
        this.employee = response;
      }
    );
    this.subscriptions.push(this.pdtSubscription)
  }

  goBack() {
    return this.router.navigate(['employee-list'])
  }

}
