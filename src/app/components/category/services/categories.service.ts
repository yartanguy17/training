import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, map, catchError, of, finalize, Subject } from 'rxjs';
import { SwalService } from 'src/app/services/swal.service';
import { CategorieHttpService } from './categories-http/categorie-http.service';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {


    isLoading$: Observable<boolean>;

    isLoadingSubject: BehaviorSubject<boolean>;

    constructor(private httpService: CategorieHttpService, private swalService: SwalService) {
        this.isLoadingSubject = new BehaviorSubject<boolean>(false);
        this.isLoading$ = this.isLoadingSubject.asObservable();
    }

    // By Tanguy pour notifier les composants lorsqu'il a un changement ou evenement
    private categoryAddedSource = new Subject<void>();
    categoryAdded$ = this.categoryAddedSource.asObservable();

    notifyCategoryAdded() {
        this.categoryAddedSource.next();
    }

    getAllCategories(): Observable<any> {
        this.isLoadingSubject.next(true);
        return this.httpService.getAllCategories().pipe(
            map((response) => response),
            catchError((err) => {
                this.swalService.toastError(err.error.message);
                return of(undefined);
            }),
            finalize(() => this.isLoadingSubject.next(false))
        );
    }
    createCategory(libelle: string): Observable<any> {
        this.isLoadingSubject.next(true);
        return this.httpService.createCategory(libelle).pipe(
            map((response) => response),
            catchError((err) => {
                this.swalService.toastError(err.error.message);
                return of(undefined);
            }),
            finalize(() => this.isLoadingSubject.next(false))
        );
    }
}
