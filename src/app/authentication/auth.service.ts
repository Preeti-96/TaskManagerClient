import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {WebRequestService} from '../web-request.service';
import {Router} from '@angular/router';
import {shareReplay, tap} from 'rxjs/operators';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userName = new BehaviorSubject('user');
  isAuthenticated = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private webRequestService: WebRequestService,
    private router: Router
  ) {
  }

  logIn(email: string, password: string) {
    return this.webRequestService.logIn(email, password).pipe(
      // using shareReplay because do not want to execute login method multiple times
      // shareReplay used to control multiple execution from different subscribers
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        // the auth token will be in the header of this response
        this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'), res.body['name']);
        console.log('Logged In');
        this.isAuthenticated.next(true);
        console.log(res.body['name']);
        this.userName.next(res.body['name']);

      })
    );
  }

  signUp(userName: string, email: string, password: string) {
    return this.webRequestService.signUp(userName, email, password).pipe(
      // using shareReplay because do not want to execute login method multiple times
      // shareReplay used to control multiple execution from different subscribers
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        // the auth token will be in the header of this response
        this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'), res.body['name']);
        console.log('SignedUp successfully and Logged In');
        console.log(res);
        this.isAuthenticated.next(true);
        this.userName.next(res.body['name']);
      })
    );
  }

  logOut() {
    this.removeSession();
    this.isAuthenticated.next(false);
    this.router.navigateByUrl('/login');
    //    this.router.navigateByUrl('/home');
  }

  getAccessToken() {
    return localStorage.getItem('x-access-token');
  }

  getRefreshToken() {
    return localStorage.getItem('x-refresh-token');
  }

  getUserId() {
    return localStorage.getItem('user-id');
  }

  getUserName() {
    return localStorage.getItem('user-name');
  }

  setAccessToken(accessToken) {
    localStorage.setItem('x-access-token', accessToken);
  }

  private setSession = (userId: string, accessToken: string, refreshToken: string, userName: string) => {
    localStorage.setItem('user-id', userId);
    localStorage.setItem('x-access-token', accessToken);
    localStorage.setItem('x-refresh-token', refreshToken);
    localStorage.setItem('user-name', userName);
  }

  private removeSession = () => {
    localStorage.removeItem('user-id');
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refresh-token');
    localStorage.removeItem('user-name');
  }

  getNewAccessToken() {
    return this.http.get('http://localhost:3000/api/users/me/access-token', {
      headers: {
        'x-refresh-token': this.getRefreshToken(),
        _id: this.getUserId()
      },
      observe: 'response'
    }).pipe(
      tap((res: HttpResponse<any>) => {
        this.setAccessToken(res.headers.get('x-access-token'));
      })
    );
  }


}
