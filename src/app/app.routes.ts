import { Routes } from '@angular/router';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { HomeComponent } from './routes/home/home.component';
import { LoginComponent } from './routes/login/login.component';
import { ProfileComponent } from './routes/profile/profile.component';
import { SignUpComponent } from './routes/sign-up/sign-up.component';
import { ViewMovieComponent } from './routes/view-movie/view-movie.component';
import { ViewMoviesComponent } from './routes/view-movies/view-movies.component';
import { AuthGuard } from './services/auth.guard';
import { PreloadMoviesGuard } from './services/preload-movies.guard';

export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'view/movie/:id', component: ViewMovieComponent },
	{ path: 'view/movies/:type', component: ViewMoviesComponent, resolve: [PreloadMoviesGuard] },
	{ path: 'search/:text', component: SearchResultsComponent },
	{ path: 'auth/login', component: LoginComponent },
	{ path: 'auth/sign-up', component: SignUpComponent },
	{ path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
	{ path: '**', redirectTo: '', pathMatch: 'full' }
];
