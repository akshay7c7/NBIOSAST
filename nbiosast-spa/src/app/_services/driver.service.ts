import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

constructor(private http: HttpClient) { }
baseUrl = environment.apiUrl + 'driver/'; //http://localhost:5000/api/driver

getDrivers()
{
  return this.http.get(this.baseUrl + 'getalldrivers');
}
}
