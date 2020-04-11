import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashService: FlashMessagesService
  ) {}

  ngOnInit() {}

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password,
    };

    this.authService.authenticateUser(user).subscribe((data) => {
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        this.flashService.show("You are now logged in", {
          cssClass: "alert-success",
          timeout: 3000,
        });
        this.router.navigate(["profile"]);
      } else {
        this.flashService.show(data.msg, {
          cssClass: "alert-danger",
          timeout: 3000,
        });
        this.router.navigate(["login"]);
      }
    });
  }
}
