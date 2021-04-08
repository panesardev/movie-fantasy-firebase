import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';
import { Movie, MovieResponse } from '../models/movie.model';
import { map } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class MovieService {

	private searchUrl = `${env.API_URL}/search/movie?api_key=${env.API_KEY}&language=en-US&query=#%#&include_adult=true`;
	private trendingUrl = `${env.API_URL}/trending/movie/day?api_key=${env.API_KEY}`;
	private popularUrl = `${env.API_URL}/movie/popular?api_key=${env.API_KEY}&language=en-US&page=1`;
	private getUrl = `${env.API_URL}/movie/#%#?api_key=${env.API_KEY}&language=en-US`;
	private keywordsUrl = `${env.API_URL}/movie/#%#/keywords?api_key=${env.API_KEY}`;
	private upcomingUrl = `${env.API_URL}/movie/upcoming?api_key=${env.API_KEY}&language=en-US&page=1`;

  constructor(private http: HttpClient) {}

  search(text: string): Observable<Movie[]> {
    return this.http.get<MovieResponse>(this.searchUrl.replace('#%#', text)).pipe(
			map(response => response.results)
		);
  }

	trending(): Observable<Movie[]> {
		return this.http.get<MovieResponse>(this.trendingUrl).pipe(
			map(response => response.results)
		);
	}

	popular(): Observable<Movie[]> {
		return this.http.get<MovieResponse>(this.popularUrl).pipe(
			map(response => response.results)
		);
	}

	recommended(genreId: number): Observable<Movie[]> {
		return this.popular().pipe(map((movies: Movie[]) => {
			let recommended = [];
			movies.forEach(movie => {
				movie.genre_ids.forEach(gid => {
					gid == genreId && recommended.push(movie);
				})
			})
			return recommended;
		}));
	}

	get(movieId: any): Observable<Movie> {
		return this.http.get<Movie>(this.getUrl.replace('#%#', movieId));
	}

	keywords(movieId: any): Observable<any> {
		return this.http.get(this.keywordsUrl.replace('#%#', movieId));
	}

	upcoming(): Observable<Movie[]> {
		return this.http.get<MovieResponse>(this.upcomingUrl).pipe(
			map(response => response.results)
		);
	}

	movieGenres(): { id: number, name: string }[] {
		return [
			{ id: 28, name: 'Action' },
			{ id: 12, name: 'Adventure' },
			{ id: 16, name: 'Animation' },
			{ id: 35, name: 'Comedy' },
			{ id: 80, name: 'Crime' },
			{ id: 18, name: 'Drama' },
			{ id: 10751, name: 'Family' },
			{ id: 14, name: 'Fantasy' },
			{ id: 36, name: 'History' },
			{ id: 27, name: 'Horror' },
			{ id: 878, name: 'Science Fiction' },
			{ id: 53, name: 'Thriller' },
		];
	}

}
