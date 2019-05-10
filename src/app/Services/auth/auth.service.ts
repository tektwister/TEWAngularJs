import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { JwtHelper } from 'angular2-jwt';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  server = 'http://localhost:3000';

  constructor(private http: HttpClient, private jwtHelper: JwtHelper) { }

  public getUrl(uri = '') {
    return `${this.server}/${uri}`;
  }

  authenticate(email_id: string, password: string) {
    const body = { email_id: email_id, password: password };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.getUrl('users/authenticate'), body).pipe(map(res => res, {'headers': headers}));
  }
  
  createSession(response: any) {
    localStorage.setItem('user', JSON.stringify(response.user));
    localStorage.setItem('token', response.msg.token);
  }
  
  destroySession() {
    localStorage.clear();
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    if (token) {
      if (this.jwtHelper.isTokenExpired(token)) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
   }

}
