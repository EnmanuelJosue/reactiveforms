import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { CategoriesService } from '../../../../core/services/categories.service'
import { Router, ActivatedRoute } from '@angular/router';
import { MyValidators } from 'src/app/utils/validators';
import { Category } from 'src/app/core/models/category.model';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  form: FormGroup;
  isNew: boolean = false;
  @Input()
  set category(data:Category) {
    if (data) {
      this.isNew = true;
      this.form.patchValue(data);
    }
  }
  @Output() create =  new EventEmitter();
  @Output() update = new EventEmitter();


  constructor(
    private categoriesService: CategoriesService,
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private router: Router,
    private cd: ChangeDetectorRef
  ){
    this.buildForm();
  }

  ngOnInit(): void {

  }

  private buildForm(){
    this.form = this.fb.group({
      name: ['',[Validators.required, Validators.minLength(4)], MyValidators.validateCategory(this.categoriesService)],
      image: ['', [Validators.required]]
    });
  }
  get nameField(){
    return this.form.get('name');
  }
  get imageField(){
    return this.form.get('image');
  }

  save(){
    if (this.form.valid) {
      this.isNew ? this.update.emit(this.form.value) : this.create.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }

  }
  uploadFile(event){
    const image = event.target.files[0];
    const name = image.name;
    const ref = this.storage.ref(name);
    const task = this.storage.upload(name, image);

    task.snapshotChanges()
      .pipe(
        finalize(() => {
          const urlImg$ = ref.getDownloadURL();
          urlImg$.subscribe(url => {
            console.log(url);
            this.imageField.setValue(url);
          })
        })
      )
      .subscribe()
  }


  getBack(){
    this.router.navigate(['./admin/categories']);
  }
}
