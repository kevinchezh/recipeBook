import { CanActivate } from "@angular/router";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private authService: AuthService){}
    canActivate(router:ActivatedRouteSnapshot, state:RouterStateSnapshot){
        return this.authService.isAuthenticated();
    }
}