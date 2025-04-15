import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { finalize, Observable } from "rxjs";
import { LoaderServcie } from "../services/loaderService";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor{
    loaderService: LoaderServcie = inject(LoaderServcie);
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loaderService.show();
        return next.handle(req).pipe(
            finalize(() => this.loaderService.hide())
        )
    }
}