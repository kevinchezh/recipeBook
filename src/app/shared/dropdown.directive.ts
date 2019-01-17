import { Directive, HostListener, HostBinding, ElementRef } from "@angular/core";

@Directive({
    selector: "[appDropdown]"
})
export class DropdownDrective{
    constructor(private element: ElementRef){
        console.log("in directive")
    }
    @HostBinding("class.open") open:boolean = false;
    @HostListener("click")
    onclick(){
        console.log("in onclick");
        this.open = !this.open;
    }

}