import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie } from 'src/app/models/movie.model';
import { environment as env } from '../../../environments/environment';

@Component({
  selector: 'app-view-movies',
  templateUrl: './view-movies.component.html',
  styleUrls: ['./view-movies.component.scss']
})
export class ViewMoviesComponent implements OnInit {

  movies$: Observable<Movie[]>;
  type: string;
  env: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.movies$ = this.route.data.pipe(
      map(data => data['0'])
    );
    this.type = this.route.snapshot.paramMap.get('type') 
      .replace(/^\w/, (c) => c.toUpperCase()); // Capitalize 
    this.env = env;
  }

}
