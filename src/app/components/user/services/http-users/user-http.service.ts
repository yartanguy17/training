import { Injectable } from '@angular/core';
import { BaseHttpService } from "../../../../services/base-http.service";
import { HttpClient } from "@angular/common/http";
import { LoginDto } from "../../../authentication/modeles/login-dto";
import { Observable } from "rxjs";
import { UserDto } from "../../models/user-dto";
import { User } from '../../models/user';

@Injectable({
    providedIn: 'root'
})
export class UserHttpService extends BaseHttpService {

    constructor(private httpClient: HttpClient) {
        super();
    }

    createUser(request: UserDto): Observable<UserDto> {
        return this.httpClient.post<UserDto>(`${this.API_URL}users`, {
            username: request.username,
            password: request.password,
            emailAdresse: request.emailAdresse,
            role: request.role
        }, {
            headers: this.headers,
        });
    }

    getUserById(id: number): Observable<User> {
        return this.httpClient.get<User>(`${this.API_URL}users/${id}`, {
            headers: this.headers,
        });
    }

    getAllUsers(): Observable<User[]> {
        return this.httpClient.get<User[]>(`${this.API_URL}users`, {
            headers: this.headers,
        });
    }

    updateUser(request: UserDto): Observable<UserDto> {
        return this.httpClient.put<UserDto>(`${this.API_URL}users/${request.id}`, {
            username: request.username,
            password: request.password,
            emailAdresse: request.emailAdresse,
            role: request.role
        }, {
            headers: this.headers,
        });
    }

    deleteUser(idUser: number) {

        return this.httpClient.delete<any>(`${this.API_URL}users/${idUser}`, {
            headers: this.headers,
        });

    }

    getUser(){
        return this.getAuthFromLocalStorage()?.user;
    }

}
