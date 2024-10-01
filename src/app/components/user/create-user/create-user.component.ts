import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { SwalService } from 'src/app/services/swal.service';
import { UserDto } from '../models/user-dto';
import { RoleEnum } from '../models/role-enum';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-create-user',
    templateUrl: './create-user.component.html',
    styleUrl: './create-user.component.scss'
})
export class CreateUserComponent implements OnInit, OnDestroy {


    requestUserForm: FormGroup;
    isLoading$: Observable<boolean>;

    roles: RoleEnum

    private unsubscribe: Subscription[] = [];

    constructor(
        public dialogRef: MatDialogRef<CreateUserComponent>,
        private fb: FormBuilder,
        private swalService: SwalService,
        private service: UserService,
    ) {
    }

    ngOnInit(): void {
        this.initUserForm();
    }

    ngOnDestroy(): void {
        this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }

    private initUserForm(): void {
        this.requestUserForm = this.fb.group({
            username: ['', Validators.compose([Validators.required,])],
            emailAdresse: ['', Validators.compose([Validators.required,])],
            password: ['', Validators.compose([Validators.required,])],
            role: ['', Validators.compose([Validators.required,])]
        });
    }

    saveUser() {

        if (this.requestUserForm.valid) {
            let user: UserDto = {
                username: this.requestUserForm.get('username')?.value,
                emailAdresse: this.requestUserForm.get('emailAdresse')?.value,
                password: this.requestUserForm.get('password')?.value,
                role: this.requestUserForm.get('role')?.value,
            };
            this.service.createUser(user).subscribe({
                next: (value) => {
                    this.swalService.toastSuccess("User enregistré avec succé !")
                    this.dialogRef.close(true);
                }, error(err) {
                    console.log("Erreur::::::::::::::::", err);
                },
                complete() {
                    console.log('Completed');
                },
            })
        } else {
            this.swalService.toastError("Veuillez remplir les champs obligatoires");
        }
    }

    close() {
        this.dialogRef.close(true);
    }
}
