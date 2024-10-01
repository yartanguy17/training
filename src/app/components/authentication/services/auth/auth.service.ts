import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, finalize, map, Observable, of} from "rxjs";
import {environment} from "../../../../../environments/environment.development";
import {AuthServiceHttp} from "../auth-http/auth.service";
import {LoginDto} from "../../modeles/login-dto";
import {JwtModel} from "../../../../utils/Jwt.model";
import {removeLocalStorageData, setLocalStorageData} from "../../../../utils/local-storage.utils";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    isLoading$: Observable<boolean>;

    isLoadingSubject: BehaviorSubject<boolean>;

    private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;


    constructor(private httpService: AuthServiceHttp) {
        this.isLoadingSubject = new BehaviorSubject<boolean>(false);
        this.isLoading$ = this.isLoadingSubject.asObservable();
    }


    login(request: LoginDto): Observable<any> {
        this.isLoadingSubject.next(true);
        return this.httpService.login(request).pipe(
            map((response: JwtModel) => {
                if (response && response.access_token) {
                    const token = response.access_token;
                    this.setAuthFromLocalStorage(response);
                    return token;
                }
                return undefined;
            }),
            catchError((err) => {
                return of(undefined);
            }),
            finalize(() => this.isLoadingSubject.next(false))
        );
    }

    logout(): Observable<any> {
        this.isLoadingSubject.next(true);
        return this.httpService.logout().pipe(
            map((response: any) => {
                this.clearAuthFromLocalStorage();
                return response;
            }),
            catchError((err) => {
                return of(undefined);
            }),
            finalize(() => this.isLoadingSubject.next(false))
        );
    }

    private clearAuthFromLocalStorage(): void {
        removeLocalStorageData(this.authLocalStorageToken);
    }

    private setAuthFromLocalStorage(auth: JwtModel): boolean {
        if (auth && auth.access_token) {
            setLocalStorageData(this.authLocalStorageToken, JSON.stringify(auth));
            return true;
        }
        return false;
    }

    getAuthFromLocalStorage(): JwtModel | undefined {
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
