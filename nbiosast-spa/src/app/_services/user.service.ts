import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
constructor(private http : HttpClient) { }
baseUrl = environment.apiUrl + 'users';

    GetBranchAdminsDetails()
    {
    return this.http.get(this.baseUrl);
    }


    EditUserDetails()
    {
      
    }


}