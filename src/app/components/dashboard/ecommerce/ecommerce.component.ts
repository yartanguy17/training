import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from '../../category/models/category';
import { Product } from '../../pages/ecommerce/models/product';
import { CategoriesService } from '../../category/services/categories.service';
import { Subscription } from 'rxjs';
import { ProductService } from '../../pages/ecommerce/services/product.service';

@Component({
    selector: 'app-ecommerce',
    templateUrl: './ecommerce.component.html',
    styleUrls: ['./ecommerce.component.scss']
})
export class EcommerceComponent implements OnInit, OnDestroy {


    categories: Category[] = [];
    products: Product[] = [];

    private unsubscribe: Subscription[] = [];

    constructor(
        private categoryService: CategoriesService,
        private productService: ProductService,
    ) { }

    ngOnInit(): void {
        this.getCategories();
        this.getAllProducts();
    }
    ngOnDestroy(): void {
        this.unsubscribe.forEach((sb) => sb.unsubscribe());
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

    getAllProducts() {
        this.productService.getAllProducts().subscribe({
            next: (value) => {
                this.products = value;
                console.log("PRODUCT :::::::::", this.products);

            },
            error: (err) => {
                console.error("Erreur: ", err);
            },
            complete: () => {
                console.log('Completed');
            },
        });
    }
}
