import { Ingredient } from "../shared/ingredient.model";
import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";

export class ShoppingListService{
    //instead of using eventEmitter, we use subject instead which is more easy to implement,
    //also a better practice
    onIngrediensChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    ingredientsSubject = new Subject<Ingredient[]>();
    private ingredients:Ingredient[] = [new Ingredient("Apple", 12),
        new Ingredient("chips", 1)
    ];

    getIngredients(){

        return this.ingredients.slice();
    }
    getIngredient(index:number){
        return this.ingredients[index];
    }
    addNewIngredient(name: string, amount:number){
        this.ingredients.push(new Ingredient(name,amount));
        this.onIngrediensChanged.next(this.ingredients.slice());
    }
    addIngredients(ingredients: Ingredient[]){
        this.ingredients.push(... ingredients);
        this.onIngrediensChanged.next(this.ingredients.slice());
    }
    updateIngredient(index:number, name:string, amount:number){
        this.ingredients[index].name = name;
        this.ingredients[index].amount = amount;
    }
    deleteIngredient(index:number){
        
        this.ingredients.splice(index,1);
        this.ingredientsSubject.next(this.ingredients.slice());
    }
}