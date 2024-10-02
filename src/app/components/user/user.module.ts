import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserComponent } from './create-user/create-user.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatAnchor, MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatMenu, MatMenuItem} from "@angular/material/menu";
import {MatPaginator} from "@angular/material/paginator";
import {MatTooltip} from "@angular/material/tooltip";
import {RouterLink} from "@angular/router";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { UsersComponent } from './users/users.component';



@NgModule({
  declarations: [
    CreateUserComponent,
    DeleteUserComponent,
    UsersComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
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
export class UserModule { }
