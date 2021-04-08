import { Component, OnInit } from '@angular/core';
import { SignupUser } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  user: SignupUser = new SignupUser();
  error: string;
  
	genres: { id: number, name: string }[];
	selectedGenre = 12;

  constructor(private auth: AuthService, private movieService: MovieService) { }

  ngOnInit(): void {
		this.genres = this.movieService.movieGenres();
  }

  async signUp(): Promise<void> {
    try {
      await this.auth.signUp(this.user);
    } catch (e) {
      this.error = e.message
    }
  }

  async googleLogin(): Promise<void> {
    try {
      await this.auth.googleLogin();
    } catch (e) {
      this.error = e.message
    }
  }
}
