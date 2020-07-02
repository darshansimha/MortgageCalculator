import { Component, forwardRef, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR, AbstractControl, Validators, NG_VALIDATORS } from "@angular/forms";

@Component({
  selector: 'text-box',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TextboxComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => TextboxComponent), multi: true }
]
})
export class TextboxComponent implements  ControlValueAccessor {
  @Input() isRequired: boolean;
  private onChange = (_: any) => { };
    private onTouched = (_: any) => { };
    value: string = '';
    disabled = false;

    constructor() {  }

    writeValue(value: any) { this.value = value; }

    registerOnChange(fn: (value: any) => void) { this.onChange = fn; }

    registerOnTouched(fn: any) { this.onTouched = fn; }

    setDisabledState(disabled: boolean) { this.disabled = disabled; }

    validate(ctrl: AbstractControl) { 
      if(this.isRequired)
        return Validators.required(ctrl);
      else
        return null; 
    }

}
