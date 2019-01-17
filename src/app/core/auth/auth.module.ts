import { NgModule } from "@angular/core";
import { SignupComponent } from "./signup/signup.component";
import { SigninComponent } from "./signin/signin.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
    declarations:[
        SignupComponent,
        SigninComponent
    ],
    imports :[
        SharedModule,
        AuthRoutingModule
    ]
})

export class AuthModule{}