import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../models/product';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { ProductService } from '../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Category } from 'src/app/components/category/models/category';
import { CategoriesService } from 'src/app/components/category/services/categories.service';
import { SwalService } from 'src/app/services/swal.service';
import { ProductDTO } from '../models/product-tdo';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent implements OnInit, OnDestroy{

    requestProductForm: FormGroup;
    isLoading$: Observable<boolean>;

    categories: Category[]=[]

    product: Product

    private unsubscribe: Subscription[] = [];

	constructor(
        public dialogRef: MatDialogRef<ProductDetailsComponent>,
        private productService: ProductService,
        private categoryService: CategoriesService,
        private fb: FormBuilder,
        private swalService: SwalService,
        @Inject(MAT_DIALOG_DATA) public data: { product: Product }
    ) {
    }

    ngOnInit(): void {
        this.product = this.data.product;
        this.initProductForm()
        this.getCategories()
    }

    ngOnDestroy(): void {
        throw new Error('Method not implemented.');
    }

    private initProductForm(): void {
        this.requestProductForm = this.fb.group({
            libelle: [this.product?.libelleProduit || '', Validators.required],
            prixProduit: [this.product?.prix || '', Validators.required],
            idCategorie: [this.product?.categorie.idCategorie || '', Validators.required],
        });
    }

    getCategories(): void {
        const subscription = this.categoryService.getAllCategories().subscribe({
            next: (value: Category[]) => {
                this.categories = value;

                if (this.product?.categorie.idCategorie) {
                    this.requestProductForm.get('idCategorie')?.setValue(this.product?.categorie.idCategorie);
                }

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


    updateProduct(): void {
        if (this.requestProductForm.valid) {
            const product: ProductDTO = {
                libelle: this.requestProductForm.get('libelle')?.value,
                prixProduit: this.requestProductForm.get('prixProduit')?.value,
                idCategorie: this.requestProductForm.get('idCategorie')?.value,
                id: this.product?.idProduit,
            };

            this.productService.updateProduct(product).subscribe({
                next: (value) => {
                    this.swalService.toastSuccess("Produit mis à jour avec succès !");
                    this.dialogRef.close(true);
                    this.productService.notifyProductEvent();
                },
                error: (err) => {
                    console.log("Erreur:", err);
                    this.swalService.toastError("Erreur lors de la mis à du Produit.");
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
