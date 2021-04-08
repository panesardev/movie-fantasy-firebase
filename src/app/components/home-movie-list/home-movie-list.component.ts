import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { environment as env } from '../../../environments/environment';

@Component({
  selector: 'app-home-movie-list',
  templateUrl: './home-movie-list.component.html',
  styleUrls: ['./home-movie-list.component.scss']
})
export class HomeMovieListComponent implements OnInit {

  env: any;
  @Input() movies: Movie[];
  @Input() type: string;

  constructor() { }

  ngOnInit(): void {
    this.env = env;
    this.movies = this.getRandom(this.movies, 8);
  }

  getRandom(arr: any[], n: number) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        return arr;
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

}
