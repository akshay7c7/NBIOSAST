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


  SaveDriver(driver : FormData)
  {
      return this.http.post(this.baseUrl +'AddDriver', driver);
  }

  UpdateDriver(driver : FormData)
  {
      return this.http.post(this.baseUrl +'UpdateDriver', driver);
  }

  getDriver(id: number)
  {
    return this.http.get(this.baseUrl + 'getdriver/'+id);
  }

  getDrivers(branchName:string)
  {
    return this.http.get(this.baseUrl + 'getAlldrivers/'+branchName);
  }

  ApproveDriver(id : any)
  {
    return this.http.put(this.baseUrl +'Approve/'+id,{})
  }

  PutOnPending(id : any)
  {
    return this.http.put(this.baseUrl +'PutOnPending/'+id,{})
  }

  AddPrintDriverCount(id : any)
  {
    return this.http.put(this.baseUrl +'RecordPrint/'+id,{})
  }

  DeleteDriver(id : any)
  {
    return this.http.delete(this.baseUrl + 'DeleteDriver/'+id);
  }

  
 
}
