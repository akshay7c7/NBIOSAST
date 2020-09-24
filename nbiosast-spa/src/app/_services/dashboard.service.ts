import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Dashboard } from '../_models/Dashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

constructor(private http: HttpClient) { }
baseUrl = environment.apiUrl + 'driver/'; //http://localhost:5000/api/driver/
  GetTodaysDetails()
  {
    return this.http.get<Dashboard>(this.baseUrl+'TodayData')
  }

}
