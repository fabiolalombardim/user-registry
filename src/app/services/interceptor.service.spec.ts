import { TestBed } from '@angular/core/testing';

import { ErrorInterceptorService } from './interceptor.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

const next: any = {
  handle: () => {
    return Observable.create((subscriber: { complete: () => void; }) => {
      subscriber.complete();
    });
  }
};
const requestMock = new HttpRequest('GET', '/test');


describe('ErrorInterceptorService', () => {
  let service: ErrorInterceptorService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule],
      providers: [       
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true},
      ]
    });
    service = TestBed.inject(ErrorInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should intercept', () => {
    service.intercept(requestMock, next)
  });
});
