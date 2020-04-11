import { Component, OnInit } from "@angular/core";
import { ValidateService } from "../../services/validate.service";
import { AuthService } from "../../services/auth.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService,
    private flashService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  onRegisterSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password,
    };

    //Validate fields
    if (!this.validateService.validateRegister(user)) {
      this.flashService.show("Please fill in all fields", {
        cssClass: "alert alert-danger",
        timeout: 3000,
      });
      return false;
    }
    if (!this.validateService.validateEmail(user.email)) {
      this.flashService.show("Please use a valid email", {
        cssClass: "alert alert-danger",
        timeout: 3000,
      });
      return false;
    }

    //Register user
    this.authService.registerUser(user).subscribe((data) => {
      if (data.success) {
        this.flashService.show("You are now registered and can login", {
          cssClass: "alert alert-success",
          timeout: 3000,
        });
        this.router.navigate(["/login"]);
      } else {
        this.flashService.show("Something went wrong", {
          cssClass: "alert alert-danger",
          timeout: 3000,
        });
        this.router.navigate(["/register"]);
      }
    });
  }
}
