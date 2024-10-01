import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, map, Observable, of } from "rxjs";
import { AuthServiceHttp } from "../../authentication/services/auth-http/auth.service";
import { UserHttpService } from "./http-users/user-http.service";
import { SwalService } from "../../../services/swal.service";
import { UserDto } from '../models/user-dto';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    isLoading$: Observable<boolean>;

    isLoadingSubject: BehaviorSubject<boolean>;

    constructor(private httpService: UserHttpService, private swalService: SwalService) {
        this.isLoadingSubject = new BehaviorSubject<boolean>(false);
        this.isLoading$ = this.isLoadingSubject.asObservable();
    }

    getAllUsers(): Observable<any> {
        this.isLoadingSubject.next(true);
        return this.httpService.getAllUsers().pipe(
            map((response) => response),
            catchError((err) => {
                this.swalService.toastError(err.error.message);
                return of(undefined);
            }),
            finalize(() => this.isLoadingSubject.next(false))
        );
    }
    createUser(request: UserDto): Observable<any> {
        this.isLoadingSubject.next(true);
        return this.httpService.createUser(request).pipe(
            map((response) => response),
            catchError((err) => {
                this.swalService.toastError(err.error.message);
                return of(undefined);
            }),
            finalize(() => this.isLoadingSubject.next(false))
        );
    }
    getUserById(id: number): Observable<any> {
        this.isLoadingSubject.next(true);
        return this.httpService.getUserById(id).pipe(
            map((response) => response),
            catchError((err) => {
                this.swalService.toastError(err.error.message);
                return of(undefined);
            }),
            finalize(() => this.isLoadingSubject.next(false))
        );
    }

    updateUser(user: UserDto) {
        this.isLoadingSubject.next(true);
        return this.httpService.updateUser(user).pipe(
            map((response) => response),
            catchError((err) => {
                this.swalService.toastError(err.error.message);
                return of(undefined);
            }),
            finalize(() => this.isLoadingSubject.next(false))
        );
    }

    deleteUser(id: number) {
        this.isLoadingSubject.next(true);
        return this.httpService.deleteUser(id).pipe(
            map((response) => response),
            catchError((err) => {
                this.swalService.toastError(err.error.message);
                return of(undefined);
            }),
            finalize(() => this.isLoadingSubject.next(false))
        );
    }

    getMe(){
        return this.httpService.getUser()
    }
}
