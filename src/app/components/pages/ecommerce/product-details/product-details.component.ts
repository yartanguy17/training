import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CreateCategoryComponent } from 'src/app/components/category/create-category/create-category.component';
import { Product } from '../models/product';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy{

    product: Product

	constructor(
        public dialogRef: MatDialogRef<ProductDetailsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { product: Product }
    ) {
    }


    ngOnInit(): void {
        this.product = this.data.product;
    }
    ngOnDestroy(): void {
        throw new Error('Method not implemented.');
    }

}
