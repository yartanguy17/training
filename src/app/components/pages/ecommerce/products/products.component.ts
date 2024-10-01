import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CreateUserComponent } from 'src/app/components/user/create-user/create-user.component';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { CreateProductComponent } from '../create-product/create-product.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { UpdateProductComponent } from '../update-product/update-product.component';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy, AfterViewInit {

    products: Product[][]
    displayedColumns: string[] = ['libelle', 'prix', 'categorie', 'action'];

    dataSource: any


    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private productService: ProductService, public dialog: MatDialog) {
        this.productService.productAdded$.subscribe(() => {
            this.getAllProducts();
        });
    }

    ngOnInit(): void {
        this.getAllProducts();
    }
    ngOnDestroy(): void {
        throw new Error('Method not implemented.');
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    getAllProducts() {
        this.productService.getAllProducts().subscribe({
            next: (value) => {
                console.log("This content of value Usererrrrrrrrrr---:", value);
                this.products = value;
                this.dataSource = this.products;
            },
            error: (err) => {
                console.error("Erreur: ", err);
            },
            complete: () => {
                console.log('Completed');
            },
        });
    }

    addProductModal(enterAnimationDuration: string, exitAnimationDuration: string) {
        const dialogRef = this.dialog.open(CreateProductComponent, {
            width: '600px',
            enterAnimationDuration,
            exitAnimationDuration
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.getAllProducts();
            }
        });
    }

    ProductDetailModal(product: Product, event: Event, enterAnimationDuration: string, exitAnimationDuration: string) {
        const dialogRef = this.dialog.open(ProductDetailsComponent, {
            width: '1000px',
            enterAnimationDuration,
            exitAnimationDuration,
            data: { product: product }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                console.log('Dialog closed with result:', result);
            }
        });
    }

    ProductUpdateModal(product: Product, event: Event, enterAnimationDuration: string, exitAnimationDuration: string) {
        const dialogRef = this.dialog.open(UpdateProductComponent, {
            width: '1000px',
            enterAnimationDuration,
            exitAnimationDuration,
            data: { product: product }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.getAllProducts();
            }
        });
    }


}

