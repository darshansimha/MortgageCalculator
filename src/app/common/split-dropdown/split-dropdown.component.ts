import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, AbstractControl, Validators, NG_VALIDATORS } from "@angular/forms";


@Component({
  selector: 'split-dropdown',
  templateUrl: './split-dropdown.component.html',
  styleUrls: ['./split-dropdown.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SplitDropdownComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => SplitDropdownComponent), multi: true }
  ]
})
export class SplitDropdownComponent implements ControlValueAccessor {
  @Input() isRequired: boolean;
  @Input() options: Array<any>;
  @Input() label: string;
  @Input() id: string;
  numberOfDropDowns: number;
  compositeValue: any;
  private onChange = (_: any) => { };
  private onTouched = (_: any) => { };
  value: string;
  disabled = false;
  constructor() { }
  writeValue(value: any) { this.value = value; }

  registerOnChange(fn: (value: any) => void) { 
    this.onChange = fn;
    let _tempValue: any = {};
    for(let i = 0; i < this.options.length; i++) {
      _tempValue[this.id + i] = this.options[i]['default'];
    }
    this.compositeValue = Object.assign({}, _tempValue);
    this.onChange(this.compositeValue);
  }

  registerOnTouched(fn: any) { this.onTouched = fn; }

  setDisabledState(disabled: boolean) { this.disabled = disabled; }

  validate(ctrl: AbstractControl) {
    return null;
  }

  ngOnInit() {
    this.numberOfDropDowns = 12/this.options.length;
  }

  handleDropDownValueChange($event) {
    this.compositeValue[$event.key] = $event.value;
    this.onChange(this.compositeValue);
  }
}
