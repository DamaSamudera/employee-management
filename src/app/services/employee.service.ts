import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'http://localhost:3000';


  constructor(private http: HttpClient) { }

  getEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/employee`);
  }

  getEmployeeById(id: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/employee?uid=${id}`);
  }

  addEmployee(payload: Employee) {
    return this.http.post(`${this.baseUrl}/employee`, payload);
  }
}
