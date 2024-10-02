import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment.development";
import { HttpHeaders } from "@angular/common/http";
import { JwtModel } from "../utils/Jwt.model";

@Injectable({
    providedIn: 'root'
})
export class BaseHttpService {

    protected API_URL = environment.apiURL;
    private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

    protected httpHeader(): HttpHeaders {
        return new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Access-Control-Allow-Origin', '*')
            .set('Authorization', `Bearer ${this.getAuthFromLocalStorage()?.access_token}`);
        // .set('Access-Control-Allow-Origin', '*');
    }

    get headers() {
        const auth = this.getAuthFromLocalStorage();
        const accessToken = auth?.access_token;

        const authorizationHeader = accessToken ? `Bearer ${accessToken}` : '';

        return {
            'Content-Type': 'application/json', 
            'Accept': 'application/json',
            'Authorization': authorizationHeader,
        };
    }


    public getAuthFromLocalStorage(): JwtModel | undefined {
        try {
            const lsValue = localStorage.getItem(this.authLocalStorageToken);
            if (!lsValue) {
                return undefined;
            }
            return JSON.parse(lsValue);
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }
}
