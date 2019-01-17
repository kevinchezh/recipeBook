import { NgModule } from "@angular/core";
import { RecipesComponent } from "./recipes.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../core/auth/auth-guard.service";
const recipesRoutes: Routes = [
    {path: '', component: RecipesComponent, children : [
        {path: '', component: RecipeStartComponent},
        {path: 'new', component: RecipeEditComponent, canActivate:[AuthGuard]},
        {path: ':id', component: RecipeDetailComponent},
        {path: ':id/edit', component: RecipeEditComponent, canActivate:[AuthGuard]},
    ]},
]

@NgModule({
    //we should only call forRoot in app module, all other routing module should 
    //call forChild 
    imports : [
        RouterModule.forChild(recipesRoutes)
    ],
    exports : [RouterModule]
})
export class RecipesRoutingModule{

}