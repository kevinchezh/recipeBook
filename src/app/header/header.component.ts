import { Component, EventEmitter, Output } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { Response } from "@angular/http";
import { Router } from "@angular/router";
import { AuthService } from "../core/auth/auth.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})


export class HeaderComponent{
    @Output() contentSelected = new EventEmitter<String>();
    constructor(private dataService : DataStorageService,
        private router: Router,
        private authService: AuthService){}
    onSelect(content:String){
        // console.log("OnSelect method");
        this.contentSelected.emit(content);
    }
    onSaveData(){
        this.dataService.storeRecipes()
        .subscribe(
            (response:Response) => {
                console.log(response)
            }
        );
    }

    onFetchData(){
        this.dataService.fetchRecipes();  
    }

    onLogout(){
        this.authService.logout();
    }
    isAuth(){
        return this.authService.isAuthenticated();
    }
}