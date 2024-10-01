import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Editor, Toolbar } from 'ngx-editor';
import { Observable, Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/components/category/services/categories.service';
import { CreateUserComponent } from 'src/app/components/user/create-user/create-user.component';
import { RoleEnum } from 'src/app/components/user/models/role-enum';
import { SwalService } from 'src/app/services/swal.service';
import { ProductDTO } from '../models/product-tdo';
import { ProductService } from '../services/product.service';
import { Category } from 'src/app/components/category/models/category';

@Component({
    selector: 'app-create-product',
    templateUrl: './create-product.component.html',
    styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent {

    requestProductForm: FormGroup;
    isLoading$: Observable<boolean>;

    categories: Category[]=[]

    private unsubscribe: Subscription[] = [];

    constructor(
        private productService: ProductService,
        private categoryService: CategoriesService,
        public dialogRef: MatDialogRef<CreateProductComponent>,
        private fb: FormBuilder,
        private swalService: SwalService
    ) { }

    ngOnInit(): void {
        this.initProductForm()
        this.getCategories()
    }

    ngOnDestroy(): void {
    }

    private initProductForm(): void {
        this.requestProductForm = this.fb.group({
            libelle: ['', Validators.required],
            prixProduit: ['', Validators.required],
            idCategorie: ['', Validators.required],
        });
    }

    getCategories(): void {
        const subscription = this.categoryService.getAllCategories().subscribe({
            next: (value: Category[]) => {
                this.categories = value;
            },
            error: (err) => {
                console.error("Erreur: ", err);
            },
            complete: () => {
                console.log('Completed');
            },
        });

        this.unsubscribe.push(subscription);
    }


    saveProduct(): void {
        if (this.requestProductForm.valid) {
            const product: ProductDTO = {
                libelle: this.requestProductForm.get('libelle')?.value,
                prixProduit: this.requestProductForm.get('prixProduit')?.value,
                idCategorie: this.requestProductForm.get('idCategorie')?.value,
            };

            this.productService.createProduct(product).subscribe({
                next: (value) => {
                    this.swalService.toastSuccess("Produit enregistré avec succès !");
                    this.dialogRef.close(true);
                },
                error: (err) => {
                    console.log("Erreur:", err);
                    this.swalService.toastError("Erreur lors de l'enregistrement du Produit.");
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
