import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';

import { map, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchField = new FormControl();
  results: any[] = [];

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.searchField.valueChanges
    .pipe(
      debounceTime(500)
    )
    .subscribe(value => {
      this.getData(value);
    })
  }

  private getData(query: string){
    const API= 'vjMrOOtaIcoB3TcWsfvPqRcWIUye3BS6'

    this.http.get(`https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${API}&limit=12`)
    .pipe(
      map((res:any) => {
        return res.data.map(item => item.images.downsized);
      } )
    )
    .subscribe((data) => {
      this.results = data;
    })
  }
}
