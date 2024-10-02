import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from "../services/auth/auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { SwalService } from "../../../services/swal.service";
import { Router } from "@angular/router";
import { LoginDto } from "../modeles/login-dto";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    requestAuthForm: FormGroup = new FormGroup({});
    isLoading$: Observable<boolean>;

    private unsubscribe: Subscription[] = [];

    hide = true;

    constructor(
        private authService: AuthService,
        private fb: FormBuilder,
        private swalService: SwalService,
        private router: Router
    ) {
        this.isLoading$ = this.authService.isLoading$;
    }

    ngOnInit(): void {
        this.initForm();
    }

    ngOnDestroy(): void {
        this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }



    // Initialisation du formulaire

    private initForm(): void {
        this.requestAuthForm = this.fb.group({
            email: ['', Validators.compose([Validators.required,])],
            password: ['', Validators.compose([Validators.required,])],
        });
    }

    login() {
        if (this.requestAuthForm.valid) {
            const email = this.requestAuthForm.get('email')?.value;
            const password = this.requestAuthForm.get('password')?.value;

            if (email && password) {
                const log: LoginDto = { email, password };
                this.authService.login(log).subscribe({
                    next: (value) => {
                        if (value) {
                            this.swalService.toastSuccess("Connexion effectuée avec succès !");
                            this.router.navigate(['/dashboard']);
                        } else {
                            this.swalService.toastError("Email ou mot de passe incorrecte. Veuillez réessayer.");
                        }
                    },
                    error: (err) => {
                        console.error("Erreur: ", err);
                        this.swalService.toastError("Erreur lors de la connexion. Veuillez réessayer.");
                    },
                    complete: () => {
                        console.log('Connexion terminée');
                    },
                });
            } else {
                this.swalService.toastError("Les champs email et mot de passe sont requis.");
            }
        } else {
            this.swalService.toastError("Veuillez remplir les champs obligatoires.");
        }
    }


}
