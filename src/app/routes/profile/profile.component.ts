import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  user: User;
  genres: { id: number, name: string }[];
  selectedGenre: any = this.auth.user$;
  
  constructor(
    private auth: AuthService, 
    private movieService: MovieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.genres = this.movieService.movieGenres();
    this.subscription = this.auth.user$.subscribe(user => {
      this.user = user;
      this.selectedGenre = user.type;
    });
  }

  update(): void {
    this.auth.updateUser(this.user, { type: this.selectedGenre })
      .then(() => this.router.navigate(['/']));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
