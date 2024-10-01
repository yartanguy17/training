import {Component, HostListener, OnInit} from '@angular/core';
import { ToggleService } from './toggle.service';
import { DatePipe } from '@angular/common';
import {AuthService} from "../../authentication/services/auth/auth.service";
import {SwalService} from "../../../services/swal.service";
import {Router} from "@angular/router";
import {environment} from "../../../../environments/environment.development";
import {JwtModel} from "../../../utils/Jwt.model";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    isSticky: boolean = false;

    infoUser: JwtModel | undefined;

     authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

    @HostListener('window:scroll', ['$event'])
    checkScroll() {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (scrollPosition >= 50) {
            this.isSticky = true;
        } else {
            this.isSticky = false;
        }
    }

    isToggled = false;

    constructor(
        private toggleService: ToggleService,
        private datePipe: DatePipe,
        private authService: AuthService,
        private swalService: SwalService,
        private router: Router
    ) {
        this.toggleService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    ngOnInit(): void {
       this.getAuthFromLocalStorage();
    }

    getAuthFromLocalStorage(): JwtModel | undefined {
     this.infoUser =   this.authService.getAuthFromLocalStorage();
        return   this.infoUser;
    }

    toggle() {
        this.toggleService.toggle();
    }

    logout() {
        this.authService.logout().subscribe({
            next: (value) => {
                this.swalService.toastSuccess("Deconnexion effectuée avec succès !");
                this.router.navigate(['/']);
            },
            error: (err) => {
                console.error("Erreur: ", err);
            },
            complete: () => {
                console.log('Completed');
            },
    });
    }


    currentDate: Date = new Date();
    formattedDate: any = this.datePipe.transform(this.currentDate, 'dd MMMM yyyy');

}
