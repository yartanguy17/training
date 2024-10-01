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

    constructor(
        private service: UserService,
        private fb: FormBuilder,
        private swalService: SwalService,
    ) { }
    ngOnInit(): void {
        this.initForm()

        this.me()
    }
    ngOnDestroy(): void {

    }

    private initForm(): void {
        this.requestAccountForm = this.fb.group({
            emailAdresse: [this.user.emailAdresse ,'', Validators.compose([Validators.required,])],
            username: [this.user.username ,'', Validators.compose([Validators.required,])],
        });
    }

    me(){
       this.user = this.service.getMe()
    }

    update() {
        if (this.requestAccountForm.valid) {
            let user: UserDto = {
                username: this.requestAccountForm.get('username')?.value,
                emailAdresse: this.requestAccountForm.get('emailAdresse')?.value,
                password: this.requestAccountForm.get('password')?.value,
                role: this.requestAccountForm.get('role')?.value,
            };
            this.service.updateUser(user).subscribe({
                next: (value) => {
                    this.swalService.toastSuccess("User enregistré avec succé !")
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

}
