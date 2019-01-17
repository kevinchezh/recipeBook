import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy{
  ingredients:Ingredient[] = [];
  private subScription : Subscription;
  constructor(private shoppingListService: ShoppingListService) { }
  private ingredientsSub : Subscription;
  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.subScription = this.shoppingListService.onIngrediensChanged.subscribe(
      (ingrediens:Ingredient[]) => {
        this.ingredients = ingrediens;
      }
    )
    this.ingredientsSub = this.shoppingListService.ingredientsSubject.subscribe(
      (ingredients:Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }
  // //now after we get the new ingredient, we push this new ingredient in the list
  // addNewIngredient(ingredient){
  //   this.ingredients.push(new Ingredient(ingredient.name,ingredient.amount));
  // }
  onEditItem(index : number){
    //emit the index to shopping edit component
    this.shoppingListService.startedEditing.next(index);
  }
  ngOnDestroy(){
    this.subScription.unsubscribe();
    this.ingredientsSub.unsubscribe();
  }
}
