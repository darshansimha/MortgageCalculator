import { Component, forwardRef, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR, AbstractControl, Validators, NG_VALIDATORS } from "@angular/forms";

@Component({
  selector: 'number-field',
  templateUrl: './number-field.component.html',
  styleUrls: ['./number-field.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NumberFieldComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => NumberFieldComponent), multi: true }
  ]
})
export class NumberFieldComponent implements ControlValueAccessor {

  @Input() isRequired: boolean;
  @Input() placeholder: string;
  @Input() id: string;
  @Input() label: string;
  @Input() currency: symbol;
  @Input() forward: boolean;
  @Input() default: number;
  onChange = (_: any) => { };
  onTouched = (_: any) => { };
  value: string;
  disabled = false;

  constructor() { 
  
  }

  writeValue(value: any) { this.value = value; }

  registerOnChange(fn: (value: any) => void) { 
    this.onChange = fn; 
    this.onChange(this.default);
  }

  registerOnTouched(fn: any) { this.onTouched = fn; }

  setDisabledState(disabled: boolean) { this.disabled = disabled; }

  validate(ctrl: AbstractControl) {
    if (this.isRequired)
      return Validators.required(ctrl);
    else
      return null;
  }

}
