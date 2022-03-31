import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, map, Observable, of, tap} from "rxjs";
import {AuthResponse, Usuario} from "../interfaces/auth.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _usuario!: Usuario;

  get usuario() {
    return { ...this._usuario };
  }

  constructor(
    private http: HttpClient
  ) { }

  registro( name: string, email: string, password: string ) {
    const url = ` ${ this.baseUrl }/auth/newUser`;
    const body = { name: name, email: email, password: password };
    return this.http.post<AuthResponse>( url, body)
      .pipe(
        tap( resp => {
          if ( resp.ok ) {
            localStorage.setItem('token', resp.token || '' );
          }
        }),
        map( status => status.ok ),
        catchError( error => of(error.error) )
      );
  }

  login( email: string, password: string ) {
    const url = ` ${ this.baseUrl }/auth`;
    const body = { email: email, password: password }
    return this.http.post<AuthResponse>( url , body)
      .pipe(
        tap( resp => {
          if ( resp.ok ) {
          localStorage.setItem('token', resp.token! );
          }
        } ),
        map( status => status.ok ),
        catchError( error => of(error.error) )
      );
  }

  validarToken() {
    const url = ` ${ this.baseUrl }/auth/renew`;
    const headersHttp = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '' )

    return this.http.get<AuthResponse>( url, { headers: headersHttp } )
      .pipe(
        map( resp => {
          localStorage.setItem('token', resp.token! );
          this._usuario = {
            name: resp.name,
            uid: resp.uid,
            email: resp.email
          }
          return resp.ok;
        }),
        catchError( err => of(false) )
      );
  }

  logout() {
    // localStorage.removeItem('token');
    localStorage.clear();
  }

}
