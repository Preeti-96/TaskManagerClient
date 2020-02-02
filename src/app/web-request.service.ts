import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Api} from './api';
import {List} from './list';
import {Task} from './task';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  constructor(private http: HttpClient) {
  }

  getL(uri: string) {
    return this.http.get('http://localhost:3000/api/' + uri).pipe(
      map((responseData) => {
        const response: Api<List[]> = {status: 0, message: '', result: []};
        response.result = responseData['result'];
        return response.result;
      })
    );
  }

  getT(uri: string) {
    return this.http.get('http://localhost:3000/api/' + uri).pipe(
      map((responseData) => {
        const response: Api<Task[]> = {status: 0, message: '', result: []};
        response.result = responseData['result'];
        return response.result;
      })
    );
  }

  postL(uri: string, list: List) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/' + uri, list, {headers: headers}).pipe(
      map((responseData) => {
        let response: Api<List[]>;
        response = {status: 0, message: '', result: []};
        response.result = responseData['result'];
        return response.result;
      })
    );
  }

  postT(uri: string, task: Task) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/' + uri, task, {headers: headers}).pipe(
      map((responseData) => {
        let response: Api<Task[]>;
        response = {status: 0, message: '', result: []};
        response.result = responseData['result'];
        return response.result;
      })
    );
  }

  put(uri: string, payload: object) {
    return this.http.put('http://localhost:3000/api/' + uri, payload);
  }

  delete(uri: string) {
    return this.http.delete('http://localhost:3000/api/' + uri);
  }

  logIn(email: string, password: string) {
    return this.http.post('http://localhost:3000/api/users/login', {
      email,
      password
    }, {
      observe: 'response'
    });
  }

  signUp(name: string, email: string, password: string) {
    return this.http.post('http://localhost:3000/api/users', {
      name,
      email,
      password
    }, {
      observe: 'response'
    });
  }
}

