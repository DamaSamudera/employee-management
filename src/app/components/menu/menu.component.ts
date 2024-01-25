import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenubarComponent {
  constructor(private router: Router) { }

  menuItems = [
    { label: 'Employee List', command: () => this.router.navigate(['employee-list']) },
    { label: 'Add Employee', command: () => this.router.navigate(['employee-add']) }
  ]


  logOut() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}
