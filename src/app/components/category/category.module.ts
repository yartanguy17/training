import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategorysComponent } from './categorys/categorys.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { DeleteCategoryComponent } from './delete-category/delete-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAnchor, MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenu, MatMenuItem } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable } from '@angular/material/table';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { CdkAccordionModule } from '@angular/cdk/accordion';



@NgModule({
    declarations: [
        CategorysComponent,
        CreateCategoryComponent,
        DeleteCategoryComponent
    ],
    imports: [
        CommonModule,
        CdkAccordionModule,
        FormsModule,
        ReactiveFormsModule,
        MatAnchor,
        MatButton,
        MatCard,
        MatCardContent,
        MatCardHeader,
        MatCell,
        MatCellDef,
        MatCheckbox,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderRow,
        MatHeaderRowDef,
        MatMenu,
        MatMenuItem,
        MatPaginator,
        MatRow,
        MatRowDef,
        MatTable,
        MatTooltip,
        MatFormFieldModule,
        MatOptionModule,
        ReactiveFormsModule,
        RouterLink
    ]
})
export class CategoryModule { }
