import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
  public apiEndpoint: string | undefined;

	constructor(private http: HttpClient) {}

		load() :Promise<any>  {

      const promise = this.http.get('assets/config.json')
        .toPromise()
        .then(data => {
          Object.assign(this, data);
          return data;
        });

      return promise;
  }
}