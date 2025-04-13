import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Environment } from "../../app/env/api.route";
import { Module } from "../../app/models/Module";
import { Lesson } from "../../app/models/lessons";

@Injectable({
    providedIn: 'root'
})

export class HttpService {
    http = inject(HttpClient)
    
    private getFullUrl(api:string): string {
        return `${Environment.baseUrl}${api}`
    }

    get<T>(api:string, queryParams?:any) {
        let params = new HttpParams();
        if(queryParams) {
            Object.keys(queryParams).forEach(key => {
                params = params.set(key, queryParams[key])
            })
        }

        return this.http.get<T>(this.getFullUrl(api), {params})
    }

    post<T>(api: string, body: any) {
        return this.http.post<T>(this.getFullUrl(api), body)
    }
} 