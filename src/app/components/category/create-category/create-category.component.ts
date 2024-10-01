import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { SwalService } from 'src/app/services/swal.service';
import { CategoriesService } from '../services/categories.service';
import { CategoryDTO } from '../models/category-dto';

@Component({
    selector: 'app-create-category',
    templateUrl: './create-category.component.html',
    styleUrl: './create-category.component.scss'
})
export class CreateCategoryComponent implements OnInit, OnDestroy {


    requestCategoryForm: FormGroup;

    isLoading$: Observable<boolean>;

    private unsubscribe: Subscription[] = [];

    constructor(
        private categoryService: CategoriesService,
        public dialogRef: MatDialogRef<CreateCategoryComponent>,
        private fb: FormBuilder,
        private swalService: SwalService
    ) {
        this.isLoading$ = this.categoryService.isLoading$;
    }
    ngOnInit(): void {
        this.initCategoryForm();
    }
    ngOnDestroy(): void {
        throw new Error('Method not implemented.');
    }

    private initCategoryForm(): void {
        this.requestCategoryForm = this.fb.group({
            libelle: ['', Validators.required]
        });
    }

    saveCategory(): void {
        if (this.requestCategoryForm.valid) {
            const category: CategoryDTO = {
                libelle: this.requestCategoryForm.get('libelle')?.value
            };
            console.log("Categorie:", category);

            this.categoryService.createCategory(category.libelle).subscribe({
                next: (value) => {
                    console.log("Value:", value);
                    this.swalService.toastSuccess("Catégorie enregistrée avec succès !");
                    this.dialogRef.close(true);
                    this.categoryService.notifyCategoryAdded();
                },
                error: (err) => {
                    console.log("Erreur:", err);
                    this.swalService.toastError("Erreur lors de l'enregistrement de la catégorie.");
                },
                complete: () => {
                    console.log('Completed');
                },
            });
        } else {
            this.swalService.toastError("Veuillez remplir les champs obligatoires");
        }
    }

    close() {
        this.dialogRef.close(true);
    }

}
