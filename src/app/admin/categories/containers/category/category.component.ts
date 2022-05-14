import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { Category } from 'src/app/core/models/category.model';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  category: Category;
  constructor(
    private categoriesService: CategoriesService,
    private activatedRoute:ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getCategoryById();
  }

  private getCategoryById(){
    this.activatedRoute.params.subscribe((data) => {
      const id = data.id;
      if (id) {
        this.categoriesService.getCategoryById(id)
          .subscribe((data) => {
            this.category = data;

          })
      }
    })
  }

  createCategory(data) {

    this.categoriesService.createCategory(data)
      .subscribe(data => {
        console.log('create', data);
        this.router.navigate(['./admin/categories']);
      }, err => {
        console.log(err);
      })
  }

  updateCategory(data){
    this.categoriesService.updateCategory(this.category._id, data)
      .subscribe(data => {
        console.log('update', data);
        this.router.navigate(['./admin/categories']);
      })
  }

}
