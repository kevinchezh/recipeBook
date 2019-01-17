import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  // //import service at recipe component allow all its child to access the same service

  //if we add recipeService here, when we navigate to shoppinglist, this component would
  //be destroied, so if we add a recipe and go to shopping list, then return this recipe
  //would gone, because app re render the recipe component.
  //to fix this, we import recipe service in app componentwhich would not destroy all the time
  // providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;
  constructor(private recipeService: RecipeService) { }

  //without a service, we first pass data from recipe-detail to recipe-item through event 
  //then pass that daata from item to recipe component through another event,
  //but now we only need to define an event in service, and place emit at starting end 
  //and then place the subscribe at the receiving end, which saves a lot of complexity
  ngOnInit() {
    // this.recipeService.recipeSelected.subscribe(
    //   (recipe: Recipe) => {
    //     this.selectedRecipe = recipe;
    //   }
    // )
  }

}
