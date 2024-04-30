import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'app/core/auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Service
{

    constructor(
        private http: HttpClient,
        private _authService: AuthService
    ) { }

    get(url: string): Observable<any>
    {
        const authToken = this._authService.accessToken
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        });
        return this.http.get(url, { headers: headers });
    }

    post(url: string, body: any): Observable<any>
    {
        const authToken = this._authService.accessToken
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        });
        return this.http.post(url, body, { headers: headers });
    }

    postFormData(url: string, body: any): Observable<any>
    {
        const authToken = localStorage.getItem('accessToken');
        const headers = new HttpHeaders({
            // 'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
            'Authorization': `Bearer ${authToken}`
        });
        return this.http.post(url, body, { headers: headers });
    }

    put(url: string, body: any): Observable<any>
    {
        const authToken = this._authService.accessToken
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        });
        return this.http.put(url, body, { headers: headers });
    }

    delete(url: string): Observable<any>
    {
        const authToken = this._authService.accessToken
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        });
        return this.http.delete(url, { headers: headers });
    }
}
