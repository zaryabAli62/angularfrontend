import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  API_URL = " http://127.0.0.1:8000/api";      



  constructor(private http:HttpClient) { }

  post(url:any,data:any):Observable<any>{
    return this.http.post<any>(`${this.API_URL}/${url}`,data)
  }

  put(url:any,data:any):Observable<any>{
    return this.http.put<any>(`${this.API_URL}/${url}`,data)
  }

  get(url:any):Observable<any>{
    return this.http.get<any>(`${this.API_URL}/${url}`)
  }
  getWordsDictonary(url:any):Observable<any>{
    return this.http.get<any>(url)
  }

  logout() {
    throw new Error('Method not implemented.');
  }

} 