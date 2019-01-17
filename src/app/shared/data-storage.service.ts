import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import {Http, Response} from "@angular/http"
import { map } from 'rxjs/operators'
import { Recipe } from "../recipes/recipe.model";
import { AuthService } from "../core/auth/auth.service";



@Injectable()
export class DataStorageService{
    constructor(private recipeService: RecipeService,
        private http : Http,
        private authService: AuthService){

    }

    storeRecipes(){
        const token = this.authService.getToken();
        return this.http.put("https://testproject-d8097.firebaseio.com/recipes.json?auth=" + token,
        this.recipeService.getRecipes())
    }

    fetchRecipes(){
        const token = this.authService.getToken();
        return this.http.get("https://testproject-d8097.firebaseio.com/recipes.json?auth=" + token)
        .pipe(map(
            (response: Response) => {
                const recipes: Recipe[] = response.json();
                for(let recipe of recipes){
                    if(!recipe['ingredients']){
                        recipe['ingredients'] = [];
                    }
                }
                return recipes;
            }
            
        ))
        .subscribe(
            (recipes: Recipe[]) => {
                this.recipeService.updateRecipes(recipes);
            }
        );
        
    }
}