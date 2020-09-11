import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

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

    GetUserDetail(id):Observable<User>
    {
      return this.http.get<User>(this.baseUrl+"/"+id);
    }

    EditUserDetails(id:number, user: User)
    {
      return this.http.put(this.baseUrl+"/"+id,user);
    }

    


}