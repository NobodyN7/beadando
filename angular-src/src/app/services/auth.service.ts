import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { tokenNotExpired } from "angular2-jwt";

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: Http) {}

  registerUser(user) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .post("http://localhost:5000/users/register", user, { headers: headers })
      .map((res) => res.json());
  }

  addProduct(product) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .post("http://localhost:5000/products/addProduct", product, {
        headers: headers,
      })
      .map((res) => res.json());
  }

  deleteProduct(product) {
    let headers = new Headers();
    this.loadToken();
    headers.append("Authorization", this.authToken);
    headers.append("Content-Type", "application/json");
    return this.http
      .post("http://localhost:5000/products/deleteProduct", product, {
        headers: headers,
      })
      .map((res) => res.json());
  }

  modifyProduct(product) {
    const headers = new Headers();
    this.loadToken();
    headers.append("Authorization", this.authToken);
    headers.append("Content-Type", "application/json");
    return this.http
      .post("http://localhost:5000/products/modifyProduct", product, {
        headers: headers,
      })
      .map((res) => res.json());
  }

  getProduct(product) {
    const headers = new Headers();
    this.loadToken();
    headers.append("Authorization", this.authToken);
    headers.append("Content-Type", "application/json");
    return this.http
      .post("http://localhost:5000/products/getProduct", product, {
        headers: headers,
      })
      .map((res) => res.json());
  }

  getProducts() {
    const headers = new Headers();
    this.loadToken();
    headers.append("Authorization", this.authToken);
    headers.append("Content-Type", "application/json");
    return this.http
      .get("http://localhost:5000/products/Products", {
        headers: headers,
      })
      .map((res) => res.json());
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .post("http://localhost:5000/users/authenticate", user, {
        headers: headers,
      })
      .map((res) => res.json());
  }

  getProfile() {
    const headers = new Headers();
    this.loadToken();
    headers.append("Authorization", this.authToken);
    headers.append("Content-Type", "application/json");
    return this.http
      .get("http://localhost:5000/users/profile", {
        headers: headers,
      })
      .map((res) => res.json());
  }

  loadToken() {
    const token = localStorage.getItem("id_token");
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired("id_token");
  }

  storeUserData(token, user) {
    localStorage.setItem("id_token", token);
    localStorage.setItem("user", JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
