import { Injectable } from '@angular/core'
import { HttpEvent, HttpInterceptor } from '@angular/common/http'
import { Observable, catchError } from 'rxjs'
import { NzNotificationService } from 'ng-zorro-antd/notification'

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  intercept(request, next): Observable<HttpEvent<any>> {
    const header = request.clone({
      setHeaders: {
        Authorization: 'someToken',
      },
    })
    return next.handle(header)
  }
}

@Injectable({
  providedIn: 'root',
})
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private nzNotificationService: NzNotificationService) {}
  intercept(request, next): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error) => {
        this.nzNotificationService.error('HttpErrorInterceptor', 'check internet or payload')
        throw error
      })
    )
  }
}
