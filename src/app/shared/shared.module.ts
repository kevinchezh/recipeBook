import { NgModule } from "@angular/core";
import { DropdownDrective } from "./dropdown.directive";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        DropdownDrective
    ],
    // imports:[
    //     CommonModule
    // ],
    exports: [
        // in order to share the declarations or module, we need to export them,
        //that is the difference, so that other levels of module could use this as well
        CommonModule,
        DropdownDrective,
        FormsModule,
    ]
})
export class SharedModule{

}