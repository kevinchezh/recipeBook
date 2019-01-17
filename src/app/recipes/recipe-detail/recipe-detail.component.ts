import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe:Recipe;
  id : number;
  constructor(private shoppingListService: ShoppingListService,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    //fetch recipe by name, name comes from the route
    this.id = +this.route.params['id'];
    this.recipe = this.getRecipe(this.route.params['id']);
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.getRecipe(params['id']);
      }
    )
  }
  //one way, directly access shopping-list service and add ingredients
  // toShoppingList(){
  //   var n  = this.recipe.ingredients.length;
  //   for(var i = 0; i < n; i++ ){
  //     this.shoppingListService.addNewIngredient(this.recipe.ingredients[i].name, this.recipe.ingredients[i].amount);
  //   }
  // }

  //second way, use recipe service and inject shopping list service inside that
  toShoppingList(){
    this.recipeService.onAddToShoppingList(this.recipe.ingredients);
  }
  //get recipe by name
  getRecipe(index: number) : Recipe {
      return this.recipeService.getRecipe(index);
  }
  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(["/recipes"]);
  }

}
