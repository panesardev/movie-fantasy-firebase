import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { Movie } from '../models/movie.model';
import { AuthService } from './auth.service';
import { MovieService } from './movie.service';

@Injectable({ providedIn: 'root' })
export class PreloadMoviesGuard implements Resolve<any> {

  constructor(
    private movieService: MovieService,
    private auth: AuthService,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Movie[]> {

    const type = route.paramMap.get('type');
    
    let result: Observable<any> = null;

    if (type === 'trending') result = this.movieService.trending();
    if (type === 'recommended') result = this.auth.user$
      .pipe(switchMap(user => this.movieService.recommended(user.type))) 
    if (type === 'popular') result = this.movieService.popular();
    if (type === 'upcoming') result = this.movieService.upcoming();

    return result.pipe(take(1));
  }
  
}
