import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';
import { environment as env } from '../../../environments/environment';

@Component({
  selector: 'app-view-movie',
  templateUrl: './view-movie.component.html',
  styleUrls: ['./view-movie.component.scss']
})
export class ViewMovieComponent implements OnInit {

  movie$: Observable<Movie>;
  env: any;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const movieId = this.route.snapshot.params.id;
    this.movie$ = this.movieService.get(movieId);
    this.env = env;
  } 

  convert(labelValue: number): string | number {
    return Math.abs(Number(labelValue)) >= 1.0e+9
      ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"
      : Math.abs(Number(labelValue)) >= 1.0e+6
      ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M"
      : Math.abs(Number(labelValue)) >= 1.0e+3
      ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K"
      : Math.abs(Number(labelValue));
  }

}
