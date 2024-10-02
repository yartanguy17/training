import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/components/pages/ecommerce/models/product';

@Component({
    selector: 'app-team-members-list',
    templateUrl: './team-members-list.component.html',
    styleUrls: ['./team-members-list.component.scss']
})
export class TeamMembersListComponent implements OnInit,OnChanges {

    @Input() products: Product[] = [];

    displayedColumns: string[] = ['libelle', 'prix', 'categorie', 'action'];

    dataSource: any

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor() { }


    ngOnInit(): void {
        this.setProductToDataSource();
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['products'] && this.products) {
            this.setProductToDataSource();
        }
    }
    setProductToDataSource(): void {
        console.log("THIS ::::::::", this.products);

        this.dataSource.data = this.products;
    }


}

