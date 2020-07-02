import { Component, forwardRef, Input, Output, EventEmitter } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR, AbstractControl, Validators, NG_VALIDATORS } from "@angular/forms";

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DropdownComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => DropdownComponent), multi: true }
  ]
})
export class DropdownComponent implements ControlValueAccessor {
  @Input() isRequired: boolean;
  @Input() isSequence: boolean;
  @Input() low: number;
  @Input() high: number;
  @Input() postFix: string;
  @Input() options: Array<any>;
  @Input() label: string;
  @Input() id: string;
  @Input() default: number;
  @Output() changedValueEmitter: EventEmitter<any> = new EventEmitter<any>();
  numbers: Array<number>;
  private onChange = (_: any) => { };
  private onTouched = (_: any) => { };
  value: string;
  disabled = false;

  constructor() { }

  ngOnInit() {
    if(this.isSequence && this.high > this.low){
      const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
      this.numbers = range(this.low, this.high, 1);
    }
    this.writeValue(this.default);
  }

  writeValue(value: any) { this.value = value; }

  registerOnChange(fn: (value: any) => void) { 
    this.onChange = fn;
    if(this.value == null) {
      this.onChange(this.default);
    }
  }

  registerOnTouched(fn: any) { this.onTouched = fn; }

  setDisabledState(disabled: boolean) { this.disabled = disabled; }

  validate(ctrl: AbstractControl) {
    return null;
  }
  valueChanged($event) {
    this.value = $event.target.value;
    let output = {}
    output["key"] = this.id;
    output["value"] = $event.target.value;
    this.changedValueEmitter.emit(output);
  }

}
