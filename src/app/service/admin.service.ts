import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private apiService: ApiService) {}

  getAllGraders() {
    return this.apiService.getAllGraders();
  }

  getAllUsers() {
    return this.apiService.getAllUsers();
  }

  getAllCourses() {
    return this.apiService.getAllCourses();
  }

  setAdmin(userId: number, isAdmin: boolean) {
    return this.apiService.setAdmin(userId, isAdmin);
  }
}
