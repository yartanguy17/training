import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { SwalService } from 'src/app/services/swal.service';
import { UserService } from '../../user/services/user.service';
import { ProfileDto, UserDto } from '../../user/models/user-dto';
import { User } from '../../user/models/user';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {

    user: any
    requestAccountForm: FormGroup = new FormGroup({});
    isLoading$: Observable<boolean>;

    private unsubscribe: Subscription[] = [];

    hide = true;
    hider = true;

    constructor(
        private service: UserService,
        private fb: FormBuilder,
        private swalService: SwalService,
    ) { }

    ngOnInit(): void {
        this.initForm()
        this.user = this.service.getMe()
        console.log("UUUUUU::::::::::::::::", this.user);
    }
    ngOnDestroy(): void {

    }

    private initForm(): void {
        this.requestAccountForm = this.fb.group({
            emailAdresse: ['', Validators.compose([Validators.required,])],
            username: ['', Validators.compose([Validators.required,])],
            new_password: ['', Validators.compose([Validators.required,])],
            cf_password: ['', Validators.compose([Validators.required,])],
            role: ['', Validators.compose([Validators.required,])],
        });
    }

    update() {
        if (this.requestAccountForm.valid) {

            const new_password = this.requestAccountForm.get('new_password')?.value
            const cf_password = this.requestAccountForm.get('cf_password')?.value

            if (new_password !== cf_password) {
                this.swalService.toastError("Confirmation du mot de passe incorrecte !");
            } else {
                let userDTO: UserDto = {
                    username: this.requestAccountForm.get('username')?.value,
                    emailAdresse: this.requestAccountForm.get('emailAdresse')?.value,
                    password: this.requestAccountForm.get('new_password')?.value,
                    role: this.requestAccountForm.get('role')?.value,
                    id: this.user.id
                };

                this.service.updateUser(userDTO).subscribe({
                    next: (value) => {
                        this.swalService.toastSuccess("Profile mis à jour avec succé !")
                    }, error(err) {
                        console.log("Erreur::::::::::::::::", err);
                    },
                    complete() {
                        console.log('Completed');
                    },
                })
            }

        } else {
            this.swalService.toastError("Veuillez remplir les champs obligatoires");
        }
    }

}
