import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { SharedModule } from './shared/shared.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './core/auth/auth.module';
@NgModule({
  // declarations cannot duplicate 
  declarations: [
    // lazy loading see app-routing module!!!
    AppComponent,
  ],
  imports: [
    // BrowserModule contains all features of commonModule and along side of some functions
    //related to launch the app
    BrowserModule,
    
    AppRoutingModule,
    HttpModule,

    // sharedModule could be import multiple times, the purpose is to shared some
    // commonly used delarations (like commonModule, dropDownDirective, these 
    //things are likely to be used in multiple modules, but they can only be declear once,
    // to solve that, we use shard module, the structure of this module is bit different)
    SharedModule,
    AuthModule,
    ShoppingListModule,
    // core module basically bundle some component which would only be used in app component
    // as a result coreModule could only be used in app module as well
    CoreModule
  ],
  providers : [],
  // this determines which is the main component(root component)
  bootstrap: [AppComponent]
})
export class AppModule { }
