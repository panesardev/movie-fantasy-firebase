import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Movie } from 'src/app/models/movie.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  upcoming$: Observable<Movie[]>;
  recommended$: Observable<Movie[]>;
  trending$: Observable<Movie[]>;
  popular$: Observable<Movie[]>;
  user: User;
  userType: string;

  private subscription: Subscription;

  constructor(
    private movieService: MovieService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.subscription = this.auth.user$.subscribe(user => {
      this.user = user;
      this.recommended$ = this.movieService.recommended(user ? this.user.type : 28);
      this.userType = this.movieService.movieGenres()
        .filter(genre => user.type === genre.id)[0].name;
    });
    this.popular$ = this.movieService.popular();
    this.trending$ = this.movieService.trending();
    this.upcoming$ = this.movieService.upcoming();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
