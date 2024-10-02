import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { SwalService } from 'src/app/services/swal.service';
import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateProductComponent } from '../../pages/ecommerce/create-product/create-product.component';
import { CreateUserComponent } from '../create-user/create-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit, OnDestroy {
    isLoading$: Observable<boolean>;

    isLoadingSubject: BehaviorSubject<boolean>;

    constructor(private userService: UserService, public dialog: MatDialog) {
    }
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }
    ngOnDestroy(): void {
        throw new Error('Method not implemented.');
    }

    addUserModal(enterAnimationDuration: string, exitAnimationDuration: string) {
        const dialogRef = this.dialog.open(CreateUserComponent, {
            width: '600px',
            enterAnimationDuration,
            exitAnimationDuration
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {

            }
        });
    }
}
