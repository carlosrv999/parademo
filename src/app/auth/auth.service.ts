import { Response } from '@angular/http';
import { Empresa } from './../models/empresa';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { AppUtil } from "app/models/application-util";
@Injectable()
export class AuthService {
  empresa: Empresa;

  constructor(private http: Http) {}

  loginUser(emailOrUsername: string, password: string, isEmail: boolean) {
    if(isEmail) {
      return this.http.post('http://'+AppUtil.IP+':'+AppUtil.PORT+"/api/empresas/login", {
        "email" : emailOrUsername,
        "password" : password
      }).map((response: Response) => {
        return response.json();
      });
    } else {
      return this.http.post('http://'+AppUtil.IP+':'+AppUtil.PORT+"/api/empresas/login", {
        "username" : emailOrUsername,
        "password" : password
      }).map((response: Response) => {
        return response.json();
      });
    }
    
  }

  logoutUser() {
    localStorage.clear();
  }

  isLoggedIn() {
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          if(localStorage.key(0)) {
            resolve(true);
          }
          else {
            resolve(false);
          };
        }, 100);
      }
    );
    return promise;
  }

  public isLoggedInSync(): boolean {
    if(localStorage.key(0)) {
      return true;
    }
    else {
      return false;
    };
  }

}