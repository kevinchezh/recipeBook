import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'shoppingListAndRecipe';
  loadedContent = "recipe";
  ngOnInit(){
    // firebase set up
    firebase.initializeApp({
      apiKey: "",
    authDomain: ""
  });
  }
  onRender(content:string){
    // console.log(content);
    this.loadedContent = content;
  }
}

/**
 * AOT  ahead of time complie allow angular to compile before send to production
 * by default angular would send code to productino along side with it's compiler, and
 * compile in your browser, but that increase the app size a lot, by using aot, we can
 * get rid of angular compiler a lot before send it away, using it:
 * ng build --prod --aot
 */