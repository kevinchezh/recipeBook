import { Recipe } from "./recipe.model";
import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService{
    //to inform which recipe is selected
    // recipeSelected = new EventEmitter<Recipe>();
    private recipes:Recipe[] = [
        new Recipe("A test recipe", "just a test", 
        "https://cdn.apartmenttherapy.info/image/fetch/f_auto,q_auto,w_600,h_750,c_fit,fl_strip_profile/https://s3.amazonaws.com/pixtruder/original_images/d83512a0fe4e2d338f89ccde0c5de227646921cf",
        [new Ingredient("juice",1) , new Ingredient("orange", 2)]),
        new Recipe("recipe 2", "some recipe", 
        "https://cdn.apartmenttherapy.info/image/fetch/f_auto,q_auto,w_600,h_750,c_fit,fl_strip_profile/https://s3.amazonaws.com/pixtruder/original_images/d83512a0fe4e2d338f89ccde0c5de227646921cf",
        [new Ingredient("bread",2)])
    ];
    recipesSubject = new Subject<Recipe[]>();
    constructor(private shoppingListService: ShoppingListService){}
    getRecipes(){
        //this return the reference of this array, not copy
        // return this.recipes;

        //if want to return copy
        return this.recipes.slice();
    }
    onAddToShoppingList(ingredients : Ingredient[]){
        this.shoppingListService.addIngredients(ingredients);
    }

    getRecipe(index: number) : Recipe{
        return this.recipes[index];
    }
    addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipesSubject.next(this.recipes.slice());
    }

    updateRecipe(index:number, recipe:Recipe){
        this.recipes[index] = recipe;
        this.recipesSubject.next(this.recipes.slice());
    }
    updateRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesSubject.next(this.recipes.slice());
    }
    deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipesSubject.next(this.recipes.slice());
    }
}