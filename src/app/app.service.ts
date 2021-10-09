import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AppService { 
  baseUrl = "http://193.46.198.135:5004/api/v1/"; 
  // baseUrl = "http://127.0.0.1:5004/api/v1/"; 
  header = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'token': `Bearer ${localStorage.getItem('token')}`
    })
  }
  constructor(private http: HttpClient, private router: Router) { }

  authenticate(){
    if(!localStorage.getItem('token')){
      this.router.navigate(['/']);
    }
  }

  login(data: any): Observable<any> {
    let url = this.baseUrl.concat('admin/login');
    return this.http.post(url,data);
  }

  getCategory() : Observable<any>{
    this.authenticate();
    let url = this.baseUrl.concat(`all-event-tickets?token=Bearer ${localStorage.getItem('token')}`);
    return this.http.get(url);
  }


  addCategory(data): Observable<any>{
    this.authenticate();
    data.token = `Bearer ${localStorage.getItem('token')}`;
    let url = this.baseUrl.concat('admin/categories/add');
    return this.http.post(url,data);
  }



  allplans(data): Observable<any>{
    this.authenticate();
    data.token = `Bearer ${localStorage.getItem('token')}`;
    let url = this.baseUrl.concat('admin/subscription/list');
    return this.http.post(url,data);
  }



  allCategorylist(data): Observable<any>{
    this.authenticate();
    data.token = `Bearer ${localStorage.getItem('token')}`;
    let url = this.baseUrl.concat('admin/categories');
    return this.http.post(url,data);
  }

  subscription(data): Observable<any>{
    this.authenticate();
    data.token = `Bearer ${localStorage.getItem('token')}`;
    let url = this.baseUrl.concat('admin/subscription/detail');
    return this.http.post(url,data);
  }


  updatesubscription(data): Observable<any> {
    this.authenticate();
    data.token = `Bearer ${localStorage.getItem('token')}`;
    let url = this.baseUrl.concat('admin/subscription/edit');
    return this.http.post(url,data);
  }

  
  addsubscription(data): Observable<any> {
    this.authenticate();
    data.token = `Bearer ${localStorage.getItem('token')}`;
    let url = this.baseUrl.concat('admin/subscription/add');
    return this.http.post(url,data);
  }

  updateState(data): Observable<any> {
    this.authenticate();
    data.token = `Bearer ${localStorage.getItem('token')}`;
    let url = this.baseUrl.concat('admin/states/update');
    return this.http.post(url,data);
  }

  updatesubCategory(data): Observable<any> {
    this.authenticate();
    data.token = `Bearer ${localStorage.getItem('token')}`;
    let url = this.baseUrl.concat('admin/subcategories/update');
    return this.http.post(url,data);
  }

  deleteEventCategory(data): Observable<any> {
    this.authenticate();
    data.token = `Bearer ${localStorage.getItem('token')}`;
    let url = this.baseUrl.concat('admin/categories/remove');
    return this.http.post(url,data);
  }
  deletesubscription(data): Observable<any> {
    this.authenticate();
    data.token = `Bearer ${localStorage.getItem('token')}`;
    let url = this.baseUrl.concat('admin/subscription/remove');
    return this.http.post(url,data);
  }

  deleteEventState(data): Observable<any> {
    this.authenticate();
    data.token = `Bearer ${localStorage.getItem('token')}`;
    let url = this.baseUrl.concat('admin/states/remove');
    return this.http.post(url,data);
  }

  deletesubCategory(data):Observable<any> {
    this.authenticate();
    data.token = `Bearer ${localStorage.getItem('token')}`;
    let url = this.baseUrl.concat('admin/subcategories/remove');
    return this.http.post(url,data);
  }

  forgotPassword(data):  Observable<any>{
    this.authenticate();
    data.token = `Bearer ${localStorage.getItem('token')}`;
    let url = this.baseUrl.concat('forgot-password');
    return this.http.post(url,data);
  }

  getUsers(data):Observable<any> {
    this.authenticate();
    data.token = `Bearer ${localStorage.getItem('token')}`;
    let url = this.baseUrl.concat('admin/users');
    return this.http.post(url,data);
  } 

  
  getReports(data):Observable<any> {
    this.authenticate();
    data.token = `Bearer ${localStorage.getItem('token')}`;
    let url = this.baseUrl.concat('admin/all/reports');
    return this.http.post(url,data);
  }


  blockUnblock(data):Observable<any> {
    this.authenticate();
    data.token = `Bearer ${localStorage.getItem('token')}`;
    let url = this.baseUrl.concat('admin/blockunblock');
    return this.http.post(url,data);
  }

  
  changeStatus(data):Observable<any>{
    this.authenticate();
    data.token = `Bearer ${localStorage.getItem('token')}`;
    let url = this.baseUrl.concat('user-status');
    return this.http.post(url,data);
  }

  deleteUser(data): Observable<any>{
    this.authenticate();
    data.token = `Bearer ${localStorage.getItem('token')}`;
    let url = this.baseUrl.concat('admin/user/remove');
    return this.http.post(url,data);
  }

  changePassword(data): Observable<any>{
    this.authenticate();
    data.token = `Bearer ${localStorage.getItem('token')}`;
    let url = this.baseUrl.concat('change-password');
    return this.http.post(url,data);
  }

  editProfile(data): Observable<any>{
    this.authenticate();
    data.token = `Bearer ${localStorage.getItem('token')}`;
    let url = this.baseUrl.concat('admin/resetpassword');
    return this.http.post(url,data);
  }


  getUser(data): Observable<any>{
    this.authenticate();
    data.token = `Bearer ${localStorage.getItem('token')}`;
    let url = this.baseUrl.concat('admin/user/detail');
    return this.http.post(url,data);
  }


  updateUser(data): Observable<any>{
    this.authenticate();
    data.token = `Bearer ${localStorage.getItem('token')}`;
    let url = this.baseUrl.concat('admin/user/update');
    return this.http.post(url,data);
  }

  dashboardCount(data): Observable<any>{
    this.authenticate();
    data.token = `Bearer ${localStorage.getItem('token')}`;
    let url = this.baseUrl.concat(`admin/dashboard`);
    return this.http.post(url,data);
  }

  logout(data): Observable<any>{
    this.authenticate();
    data.token = `Bearer ${localStorage.getItem('token')}`;
    let url = this.baseUrl.concat('user/logout');
    return this.http.post(url,data);
  }

}
