import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class LoaderServcie {
    private _loading = new BehaviorSubject<boolean>(false);
    public $loading = this._loading.asObservable();
    private requestCount = 0;

    show() {
        this.requestCount++;
        this._loading.next(true);
    }

    hide() {
        this.requestCount--;
        if(this.requestCount <= 0) {
            this._loading.next(false);
            this.requestCount = 0
        }
    }
}