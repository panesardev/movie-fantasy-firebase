import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  movies$: Observable<Movie[]>;
  IMG_URL: string = environment.API_IMG_URL;

  constructor(
    private movieService: MovieService,
    public route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.movies$ = this.route.params.pipe(
      switchMap(params => this.movieService.search(params.text)),
    );
  }

}
