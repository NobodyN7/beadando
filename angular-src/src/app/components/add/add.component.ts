import { Component, OnInit } from "@angular/core";
import { ValidateService } from "../../services/validate.service";
import { AuthService } from "../../services/auth.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.css"],
})
export class AddComponent implements OnInit {
  name: String;
  chapters: String;
  genre: String;

  constructor(
    private validateService: ValidateService,
    private flashService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  onAddSubmit() {
    const product = {
      name: this.name,
      chapters: this.chapters,
      genre: this.genre,
    };

    if (!this.validateService.validateAdd(product)) {
      this.flashService.show("Please fill in all fields", {
        cssClass: "alert alert-danger",
        timeout: 3000,
      });
      return false;
    }
    this.authService.addProduct(product).subscribe((data) => {
      if (data.success) {
        this.flashService.show("Your product has been added to the database", {
          cssClass: "alert alert-success",
          timeout: 3000,
        });
        this.router.navigate(["/dashboard"]);
      } else {
        this.flashService.show(data.msg, {
          cssClass: "alert alert-danger",
          timeout: 3000,
        });
        this.router.navigate(["/dashboard"]);
      }
    });
  }
}
