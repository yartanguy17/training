import {User} from "../components/user/models/user";

export class JwtModel {
    access_token: string;
    refresh_token: string;
    user:User;
    actif:boolean;
    enabled:boolean;
    authorities:[];
    accountNonLocked:boolean;
    credentialsNonExpired:boolean;
    accountNonExpired:boolean;
    deleted:boolean;
}
