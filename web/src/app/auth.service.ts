import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { JWTService } from './jwt.service';

const GET_ME = gql`
  query me {
    me {
      id
    }
  }
`;

const LOGIN = gql`
  mutation login($credentials: Credentials!) {
    login(credentials: $credentials) {
      accessToken
    }
  }
`;

const SIGNUP = gql`
  mutation signup($credentials: Credentials!) {
    signup(credentials: $credentials) {
      accessToken
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private apollo: Apollo, private jwt: JWTService) { }

  me() {
    return this.jwt.isStoredJwt
      ? this.apollo.query({ query: GET_ME }).pipe(
        catchError(() => of()),
        map(({ data }: any) => data?.me)
      )
      : of();
  }

  login(username: string, password: string) {
    return this.apollo
      .mutate({
        mutation: LOGIN,
        variables: { credentials: { username, password } },
      })
      .pipe(
        catchError((e) => {
          console.log(e)
          return of()
        }),
        mergeMap(({ data }: any) => {
          const { login } = data;
          if (!login) {
            alert('Could not login');
            return of();
          }
          this.jwt.jwt = login.accessToken;
          return this.me();
        })
      );
  }

  signup(username: string, password: string) {
    return this.apollo
      .mutate({
        mutation: SIGNUP,
        variables: { credentials: { username, password } },
      })
      .pipe(
        catchError(() => of()),
        mergeMap(({ data }: any) => {
          const { signup } = data;
          if (!signup) {
            alert('Could not sign up');
            return of();
          }
          this.jwt.jwt = signup.accessToken;
          return this.me();
        })
      );
  }
}
