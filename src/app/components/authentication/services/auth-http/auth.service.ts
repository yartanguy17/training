import { Injectable } from '@angular/core';
import { BaseHttpService } from "../../../../services/base-http.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoginDto } from "../../modeles/login-dto";

@Injectable({
    providedIn: 'root'
})
export class AuthServiceHttp extends BaseHttpService {

    constructor(private httpClient: HttpClient) {
        super();
    }

    haders = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    };

    login(request: LoginDto): Observable<any> {
        return this.httpClient.post<any>(`${this.API_URL}auth/login`, request, {
            headers: new HttpHeaders(this.haders)
        });
    }

    logout(): Observable<any> {
        return this.httpClient.post<any>(`${this.API_URL}auth/logout`, {
            headers: new HttpHeaders(this.haders)
        });
    }
}
