import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Driver } from '../_models/Driver';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

constructor(private http: HttpClient) { }
baseUrl = environment.apiUrl + 'driver/'; //http://localhost:5000/api/driver/

  getDrivers()
  {
    return this.http.get(this.baseUrl + 'getalldrivers');
  }

  
  SaveDriver(driver : FormData)
  {
      return this.http.post(this.baseUrl +'AddDriver', driver);
  }
}
