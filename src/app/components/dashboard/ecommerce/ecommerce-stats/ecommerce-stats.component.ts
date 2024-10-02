import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Category } from 'src/app/components/category/models/category';
import { Product } from 'src/app/components/pages/ecommerce/models/product';

@Component({
    selector: 'app-ecommerce-stats',
    templateUrl: './ecommerce-stats.component.html',
    styleUrls: ['./ecommerce-stats.component.scss']
})
export class EcommerceStatsComponent implements OnInit, OnDestroy {

    @Input() products: Product [] = []
    @Input() categories: Category[] = [];

    constructor(
    ) {}


    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }
    ngOnDestroy(): void {
        throw new Error('Method not implemented.');
    }



}
