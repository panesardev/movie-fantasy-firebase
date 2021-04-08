import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LoginUser, SignupUser, User } from '../models/user.model';
import firebase from 'firebase/app';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {

  public user$: Observable<User>;

  constructor(
		private readonly ngAuth: AngularFireAuth, 
		private readonly firestore: AngularFirestore, 
		private readonly router: Router
	) { 
		this.user$ = ngAuth.authState.pipe(
			switchMap(user => {
				return user ? this.userDoc(user).valueChanges() : of(null);
			})
		);
  }

	async signUp(credentials: SignupUser): Promise<void> {
		if (credentials.displayName && credentials.email && credentials.password) {
			const credential = await this.ngAuth.createUserWithEmailAndPassword(
				credentials.email, credentials.password
			);
			await credential.user.updateProfile({ displayName: credentials.displayName });
			await this.updateUser(credential.user);
			await this.router.navigate(['/']);
		}
		else throw Error('Insufficient Information to create Account');
	}

	async login(credentials: LoginUser): Promise<void> {
		if (credentials.email && credentials.password) {
			await this.ngAuth.signInWithEmailAndPassword(
				credentials.email, credentials.password
			);
			this.router.navigate(['/']);
		}
		else throw Error('Invalid Credentials');
	}
  
	async googleLogin(): Promise<void> {
		const credential = await this.ngAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
	
		if (credential.additionalUserInfo.isNewUser) {
			await this.updateUser(credential.user);
		} 
		await this.router.navigate(['/']);
	}
  
	async updateUser(user: User | any, payload?: any): Promise<void> {
		const userRef = this.userDoc(user);
		const userPayload: User = {
			displayName: user.displayName,
			email: user.email,
			photoURL: user.photoURL,
			uid: user.uid,
      type: 28
		};

		if (payload && payload.type) 
			userPayload.type = payload.type;
		
		await userRef.set(userPayload, { merge: true });
	}

	async logout(): Promise<void> {
		await this.ngAuth.signOut();
		this.user$ = of(null);
	}

	private userDoc(user: any): AngularFirestoreDocument<User> {
		return this.firestore.doc(`users/${user.uid}`);
	}

}
