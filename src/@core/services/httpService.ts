import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Environment } from "../../app/env/api.route";
import { Module } from "../../app/models/Module";
import { Lesson } from "../../app/models/lessons";

@Injectable({
    providedIn: 'root'
})

export class HttpService {
    http = inject(HttpClient)

    saveModule(api: string, form: Module) {
       return this.http.post(`${Environment.baseUrl}${api}`, form)
    }

    getModules(api: string, year: number) {
        return this.http.get(`${Environment.baseUrl}${api}?year=${year}`);
    }

    saveLesson(api: string, form: Lesson) {
        return this.http.post(`${Environment.baseUrl}${api}`, form)
    }
}