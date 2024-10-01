import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';
import { MatTableDataSource } from '@angular/material/table';
import { CreateCategoryComponent } from '../create-category/create-category.component';

@Component({
    selector: 'app-categorys',
    templateUrl: './categorys.component.html',
    styleUrl: './categorys.component.scss'
})
export class CategorysComponent implements OnInit, OnDestroy {

    categories: Category[] = [];
    dataSource: MatTableDataSource<Category> = new MatTableDataSource<Category>();

    displayedColumns: string[] = ['libelle'];

    private unsubscribe: Subscription[] = [];

    constructor(private categoryService: CategoriesService, public dialog: MatDialog) {
        this.categoryService.categoryAdded$.subscribe(() => {
            this.getCategories();
        });
    }

    ngOnInit(): void {
        this.getCategories();
    }

    ngOnDestroy(): void {
        this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }

    getCategories(): void {
        const subscription = this.categoryService.getAllCategories().subscribe({
            next: (value: Category[]) => {
                this.categories = value;
                this.dataSource.data = this.categories;
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

    addCategoryModal(enterAnimationDuration: string, exitAnimationDuration: string) {
        const dialogRef = this.dialog.open(CreateCategoryComponent, {
            width: '600px',
            enterAnimationDuration,
            exitAnimationDuration
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.getCategories();
            }
        });
    }
}
