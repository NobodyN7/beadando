import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router, ActivatedRoute } from "@angular/router";
import { StorageServiceService } from "../../services/storage-service.service";

@Component({
  selector: "app-modify",
  templateUrl: "./modify.component.html",
  styleUrls: ["./modify.component.css"],
})
export class ModifyComponent implements OnInit {
  name: String;
  chapters: String;
  genre: String;
  modifiedProduct: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private flashService: FlashMessagesService,
    private storageService: StorageServiceService
  ) {}

  ngOnInit() {
    this.modifiedProduct = this.storageService.returnData();
    console.log(this.modifiedProduct);
    this.authService.getProduct(this.modifiedProduct).subscribe((data) => {
      this.name = data.name;
      this.chapters = data.chapters;
      this.genre = data.genre;
    });
  }

  onModifySubmit() {
    const product = {
      name: this.name,
      chapters: this.chapters,
      genre: this.genre,
    };

    this.authService.modifyProduct(product).subscribe((data) => {
      if (data.success) {
        this.flashService.show(data.msg, {
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
