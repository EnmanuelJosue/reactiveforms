import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit {
  form: FormGroup;



  constructor(
    private fb: FormBuilder
  ){
    this.buildForm();
  }

  ngOnInit(): void {
    // this.form.valueChanges
    // .subscribe(value => {
    //     console.log(value);
    // })
  }

  getNameValue(){
    console.log(this.nameField.value);

  }
  get nameField(){
    return this.form.get('fullName.name');
  }
  get lastField(){
    return this.form.get('fullName.last');
  }
  get emailField(){
    return this.form.get('email');
  }
  get phoneField(){
    return this.form.get('phone');
  }
  get colorField(){
    return this.form.get('color');
  }
  get dateField(){
    return this.form.get('date');
  }
  get numberField(){
    return this.form.get('number');
  }
  get categoryField(){
    return this.form.get('category');
  }
  get tagField(){
    return this.form.get('tag');
  }
  get agreeField(){
    return this.form.get('agree');
  }
  get genderField(){
    return this.form.get('gender');
  }
  get zoneField(){
    return this.form.get('zone');
  }


  get isNameFieldValid(){
    return this.nameField.touched && this.nameField.valid;
  }

  get isNameFieldInValid(){
    return this.nameField.touched && this.nameField.invalid;
  }

  save(){
    this.form.valid ? console.log(this.form.value) : this.form.markAllAsTouched();
  }
  private buildForm(){
    this.form = this.fb.group({
      fullName: this.fb.group({
        name: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^[a-zA-Z]+$/)]],
        last: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^[a-zA-Z]+$/)]]
      }),
      email:['', [Validators.required, Validators.email]],
      phone:['', Validators.required],
      color:['#000000'],
      date: [''],
      number: [18, [Validators.required, Validators.min(18), Validators.max(100)]],
      category: [''],
      tag: [''],
      agree: [false, [Validators.requiredTrue]],
      gender: [''],
      zone: ['']
    });
  }
}
