import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef, OnDestroy } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { FormGroup, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
  //get two input value by local reference
  // @ViewChild("nameInput") name: ElementRef;
  // @ViewChild("amountInput") amount : ElementRef;
  constructor(private shoppingListService : ShoppingListService) { }
  // get local form to submit form
  @ViewChild("form") form : NgForm;
  subscription : Subscription;
  editMode = false;
  editedItemIndex:number;
  editedItem: Ingredient;
  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index:number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        // if pass in an index, then it is in edit mode, so reterieve the ingredient
        //then set the form value with that ingredient
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.form.setValue({
          name:this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    );
  }
  @Output() addIngredient = new EventEmitter<{name:string, amount:number}>();

  // onAdd(){
  //   //emit the local reference data through new event
  //   //to emit multiple arguments, we need to encapsulate them in an object
  //   this.shoppingListService.addNewIngredient(this.name.nativeElement.value, this.amount.nativeElement.value);
  // }
  onSubmit(){
    if(this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex,this.form.value.name, this.form.value.amount);
    }
    else this.shoppingListService.addNewIngredient(this.form.value.name, this.form.value.amount);
    this.editMode = false;
    this.form.reset();
  }
  onDelete(){
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
  onClear(){
    this.editMode = false;
    this.form.reset();
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
