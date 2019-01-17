import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules} from '@angular/router';
import { HomeComponent } from "./core/home/home.component";
const appRoutes : Routes = [
    {path:'', component: HomeComponent},
    // {path : '' , redirectTo: 'recipes', pathMatch : 'full'},

    // because some users might never visit recipes routes, and recipes
    //module contains lots of code, so to improve performance we use lazy loading
    //to set this up, we need to clarify the route here, instead use component 
    //property, we use loadChildren property and that takes in a string contains
    //the path of module file and # and module class name,
    //to indicate only render this module when the path is activated

    /**
     * also, if eagerly loaded module have the same providers with app module, 
     * they would use the same providers, same instance
     * But if have same providers for lazy loaded module, then this module would
     * create a whole new instance different with others!! Because it is rendered later
     * So this may be the behavior we want and also may not, just need to keep it in mind
     * 
     * And the case is even complex if we provide that in shared module, so 
     * never do that!!
     */

     /**
      * even though we decide to lazy loading some module, but we can still pre load that
      * large chunk of data when user is doing something else that is already loaded, in 
      * this way, user would not feel the loading time when they click the lazy loaded 
      * module,
      * by setting that, use second argument of RouterModule.forRoot(), which is an object
      * there is a property called preloadingStrategy, and select PreloadAllModules to do
      * that.
      */
    {path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'}

    

]

@NgModule({
    //config routes to RouterModule
    // also set up preloadingStrategy
    imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy:PreloadAllModules})],
    //after config it export it
    exports: [RouterModule]
})
// remember to add router-outlet in the app component !!!!
export class AppRoutingModule{

}