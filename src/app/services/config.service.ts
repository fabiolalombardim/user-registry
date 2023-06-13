import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
// ConfigService purpose it's to load from the assets folder, a config.json file where 
// important variables are set for the proper functioning of the application
// If there's an error loading the file, the app redirects the user to an specific error landing page.
export class ConfigService {
  public apiEndpoint: string | undefined;

  constructor(private http: HttpClient, private router: Router) { }

  load(): Promise<any> {

    const promise = this.http.get('assets/config.json')
      .toPromise()
      .then(data => {
        Object.assign(this, data);
        return data;
      }).catch(error => this.router.navigate(['/error']));

    return promise;
  }
}