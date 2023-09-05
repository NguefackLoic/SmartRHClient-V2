import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  
     //public static fileUrl = 'http://164.68.127.159:9999/dip';
     //public static fileUrl = 'http://localhost:9999/dip';

     public baseUrl = "http://localhost:8080";
    // public baseUrl = 'http://localhost:9999/HRApi';
    //public baseUrl = 'http://164.68.127.159:9999/HRApi'
    // public baseUrl = 'http://161.97.119.19:8080/HRApi';

    /**
     * Function to send get request.
     */
    public get(url: string, options?: HttpHeaders): any {
        return this.http.get(`${this.baseUrl}${url}`, { observe: 'response', responseType: 'text' });
    }

    /**
     * Function to send post request
     */
    public post(url: string, data: any, options?: HttpHeaders): any {
        return this.http.post(`${this.baseUrl}${url}`, data, { observe: 'response', responseType: 'text' });
    }

    /**
     * Function to send put request
     */
    public put(url: string, data: any, options?: HttpHeaders): Observable<any> {
        return this.http.put(`${this.baseUrl}${url}`, data, { observe: 'response', responseType: 'text' });
    }

    /**
     * Function to send put request which will delete an element
     */
    public archive(url: string, data: any, options?: HttpHeaders): Observable<any> {
        return this.http.put(`${this.baseUrl}${url}`, data, { observe: 'response', responseType: 'text' });
    }

    /**
     * Function to send delete request
     */
    public delete(url: string, options?: HttpHeaders): Observable<any> {
        return this.http.delete(`${this.baseUrl}${url}`, { observe: 'response', responseType: 'text' });
    }
}
