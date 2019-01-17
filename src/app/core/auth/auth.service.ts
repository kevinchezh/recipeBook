import * as firebase from 'firebase'
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
@Injectable()
export class AuthService {
    constructor(private router: Router){}
    /**
     * auth logic using firebase: send sign in request to firebase backend,
     * then firebase send back a token, then in our app, we need to append that
     * token to every request to firebase backend to make the request success
     */
    token : string;
    signupUser(email: string, password: string){
        // return a promise
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(
            error => console.log(error)
        )
    }

    signinUser(email:string, password:string){
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then(
            response => {
                this.router.navigate(['/'])
                firebase.auth().currentUser.getIdToken()
                .then(
                    (token:string) => {
                        this.token = token;
                    }
                )
            }
        )
        .catch(
            error=> console.log(error)
        )
    }

    getToken(){
        firebase.auth().currentUser.getIdToken()
                .then(
                    (token:string) => {
                        this.token = token;
                    }
                )
        return this.token;
    }

    isAuthenticated(){
        return this.token!=null;
    }
    logout(){
        firebase.auth().signOut();
        this.token = null;
    }
}