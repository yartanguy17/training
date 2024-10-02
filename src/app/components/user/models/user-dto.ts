import {RoleEnum} from "./role-enum";

export class UserDto{
    id?:string;
    emailAdresse: string;
    username: string;
    password: string;
    role: RoleEnum;
}
export class UserDtos{
    emailAdresse: string;
    username: string;
    password: string;
    role: RoleEnum;
}


export class ProfileDto{
    email: string;
    username: string;
}
