import { Component, Input } from '@angular/core';
import { Category } from 'src/app/components/category/models/category';

@Component({
    selector: 'app-best-selling-products',
    templateUrl: './best-selling-products.component.html',
    styleUrls: ['./best-selling-products.component.scss']
})
export class BestSellingProductsComponent {
    @Input() categories: Category[] = [];
    constructor(
    ) {}

}
