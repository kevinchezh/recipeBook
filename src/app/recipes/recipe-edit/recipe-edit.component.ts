import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { updateBinding } from '@angular/core/src/render3/instructions';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id:number;
  editMode = false;
  recipeForm : FormGroup;
  curRecipe:Recipe;
  constructor(private route : ActivatedRoute,
    private recipeService: RecipeService,
    private router : Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        //if id is undefined then new mode, otherwise is edit mode
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
  }
  private initForm(){
    
    let recipeName = '';
    let recipeImg = '';
    let description = '';
    let ingredients = new FormArray([]);
    if(this.editMode){
      this.curRecipe = this.recipeService.getRecipe(this.id);
      recipeName = this.curRecipe.name;
      recipeImg = this.curRecipe.imagePath;
      description = this.curRecipe.description;
      if(this.curRecipe['ingredients']){
        for(let ingredient of this.curRecipe.ingredients){
          ingredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, 
                [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }
      }

    }
    this.recipeForm = new FormGroup({

        'name' : new FormControl(recipeName, Validators.required),
        'imagePath': new FormControl(recipeImg, Validators.required),
        'description': new FormControl(description, Validators.required),

      'ingredients': ingredients
    })
  }

  onSubmit(){
    console.log(this.recipeForm);
    const newRecipe = new Recipe(this.recipeForm.value['name'],
      this.recipeForm.value['description'], this.recipeForm.value['imagePath'], 
      this.recipeForm.value['ingredients']);
    if(this.editMode){
      this.recipeService.updateRecipe(this.id, newRecipe);
      this.router.navigate(['/recipes', this.id]); 
    }
    else {
      this.recipeService.addRecipe(newRecipe);
      this.router.navigate(['/recipes'])
    }
    

    
    // this.recipeForm.reset();
  }
  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  addIngredient(){
    const temp = new FormGroup({
      'name': new FormControl(null,Validators.required),
      'amount': new FormControl(null,[Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    });
    (<FormArray> this.recipeForm.get('ingredients')).push(temp);
  }
  onDelete(index: number){
    (<FormArray> this.recipeForm.get('ingredients')).removeAt(index);
  }

}
