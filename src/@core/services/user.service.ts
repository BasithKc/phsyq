import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class UserService {
    private user = new BehaviorSubject<any>(null);

    setUser(user: any) {
        this.user.next(user);
    }

    getUser(): Observable<any> {
        return this.user.asObservable();
    }
}