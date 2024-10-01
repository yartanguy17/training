import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseHttpService } from 'src/app/services/base-http.service';
import { ProductDTO } from '../../models/product-tdo';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';

@Injectable({
    providedIn: 'root'
})
export class ProductHttpService extends BaseHttpService {

    constructor(private httpClient: HttpClient) {
        super();
    }

    createProduct(libelle:string,prixProduit:string,idCategorie: number): Observable<any> {
        return this.httpClient.post<ProductDTO>(`${this.API_URL}produits`, {
            libelle,
            prixProduit,
            idCategorie
        }, {
            headers: this.headers
        });
    }

    getAllProduct(): Observable<Product[]> {
        return this.httpClient.get<Product[]>(`${this.API_URL}produits`, {
            headers: this.headers
        });
    }

    updateProduct(product: ProductDTO): Observable<any> {
        return this.httpClient.put<ProductDTO>(`${this.API_URL}produits?idProduit=${product.id}`, {
            libelle: product.libelle,
            prixProduit: product.prixProduit,
            idCategorie: product.idCategorie,
            id: product.id
        }, {
            headers: this.headers
        });
    }

}
