import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, catchError, finalize, map, of, Subject } from 'rxjs';
import { ProductHttpService } from './product-http/product-http.service';
import { ProductDTO } from '../models/product-tdo';
import { Product } from '../models/product';
import { SwalService } from 'src/app/services/swal.service';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    isLoading$: Observable<boolean>;

    isLoadingSubject: BehaviorSubject<boolean>;

    constructor(private httpService: ProductHttpService, private swalService: SwalService) {
        this.isLoadingSubject = new BehaviorSubject<boolean>(false);
        this.isLoading$ = this.isLoadingSubject.asObservable();
    }

    // By Tanguy pour notifier les composants lorsqu'il a un changement ou evenement
    private productAddedSource = new Subject<void>();
    productAdded$ = this.productAddedSource.asObservable();

    notifyProductEvent() {
        this.productAddedSource.next();
    }

    getAllProducts(): Observable<any> {
        this.isLoadingSubject.next(true);
        return this.httpService.getAllProduct().pipe(
            map((response) => response),
            catchError((err) => {
                this.swalService.toastError(err.error.message);
                return of(undefined);
            }),
            finalize(() => this.isLoadingSubject.next(false))
        );
    }
    createProduct(request: ProductDTO): Observable<any> {
        this.isLoadingSubject.next(true);
        return this.httpService.createProduct(request.libelle,request.prixProduit,request.idCategorie).pipe(
            map((response) => response),
            catchError((err) => {
                this.swalService.toastError(err.error.message);
                return of(undefined);
            }),
            finalize(() => this.isLoadingSubject.next(false))
        );
    }

    updateProduct(request: ProductDTO): Observable<any> {
        this.isLoadingSubject.next(true);
        return this.httpService.updateProduct(request).pipe(
            map((response) => response),
            catchError((err) => {
                this.swalService.toastError(err.error.message);
                return of(undefined);
            }),
            finalize(() => this.isLoadingSubject.next(false))
        );
    }
}
