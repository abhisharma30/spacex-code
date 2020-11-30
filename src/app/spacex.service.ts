import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpacexService {
  spacexPrograms: any;

  constructor(private http: HttpClient) { }
  public getPrograms(filters): Observable<any> {
    let params = new HttpParams();
    for (const key in filters) {
      if (filters.hasOwnProperty(key)) {
        params = params.append(key, filters[key]);
      }
    }
    return this.http.get('https://api.spacexdata.com/v3/launches', {params});
  }
}
