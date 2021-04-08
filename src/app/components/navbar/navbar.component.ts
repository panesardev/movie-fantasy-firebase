import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  @ViewChild('nav') nav: ElementRef;
  user: User;

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.auth.user$.subscribe(user => this.user = user);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async logout(): Promise<void> {
    await this.auth.logout();
    await this.router.navigate(['/']);
  }
  
  toggle(): void {
    if (window.innerWidth > 700) return;
    if (this.nav.nativeElement.style.transform == 'translateX(0%)') {
      this.nav.nativeElement.style.transform = 'translateX(-100%)'; 
    } else {
      this.nav.nativeElement.style.transform = 'translateX(0%)';    
    }
  }

}
