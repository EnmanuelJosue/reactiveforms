import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StepperComponent),
      multi: true
    }

  ]
})
export class StepperComponent implements OnInit, ControlValueAccessor {

  currentValue = 5;
  onChange = (_: any) => {};
  onTouch = () => {};
  isDisable: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  add () {
    this.currentValue += 1;
    this.onTouch();
    this.onChange(this.currentValue);
  }
  sub () {
    this.currentValue -= 1;
    this.onTouch();
    this.onChange(this.currentValue);
  }
  writeValue(value: number): void {
    if (value){
      this.currentValue = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisable = isDisabled;
  }

}
