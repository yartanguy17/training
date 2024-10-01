import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from 'src/app/services/base-http.service';
import { Category } from '../../models/category';
import { CategoryDTO } from '../../models/category-dto';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class CategorieHttpService extends BaseHttpService {

    constructor(private httpClient: HttpClient) {
        super();
    }

    createCategory(libelle: string): Observable<CategoryDTO> {
        return this.httpClient.post<CategoryDTO>(`${this.API_URL}categories?libelle=${libelle}`, {}, {
            headers: this.headers,
        });
    }

    getAllCategories(): Observable<Category[]> {
        return this.httpClient.get<Category[]>(`${this.API_URL}categories`, {
            headers: this.headers,
        });
    }
}
