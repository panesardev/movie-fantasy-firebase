import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment as env } from '../environments/environment';
import { HomeMovieListComponent } from './components/home-movie-list/home-movie-list.component';
import { ProfileComponent } from './routes/profile/profile.component';
import { HomeComponent } from './routes/home/home.component';
import { ViewMovieComponent } from './routes/view-movie/view-movie.component';
import { ViewMoviesComponent } from './routes/view-movies/view-movies.component';
import { LoginComponent } from './routes/login/login.component';
import { SignUpComponent } from './routes/sign-up/sign-up.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { HttpClientModule } from '@angular/common/http';
import { MovieService } from './services/movie.service';
import { AuthService } from './services/auth.service';
import { FormsModule } from '@angular/forms';
import { SearchResultsComponent } from './components/search-results/search-results.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeMovieListComponent,
    ProfileComponent,
    HomeComponent,
    ViewMovieComponent,
    ViewMoviesComponent,
    LoginComponent,
    SignUpComponent,
    NavbarComponent,
    SearchbarComponent,
    SearchResultsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(env.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    MovieService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
