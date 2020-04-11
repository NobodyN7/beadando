import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
import { StorageServiceService } from "../../services/storage-service.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  Products: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashService: FlashMessagesService,
    private storageService: StorageServiceService
  ) {}

  ngOnInit() {
    this.authService.getProducts().subscribe(
      (products) => {
        this.Products = products;
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }

  onAddClick() {
    this.router.navigate(["add"]);
  }

  refreshPage() {
    window.location.reload();
  }

  onModifyClick(index) {
    this.storageService.storeData(this.Products[index]);
    this.router.navigate(["modify"]);
  }

  onDeleteClick(index) {
    let deletedProduct = this.Products[index];
    this.authService.deleteProduct(deletedProduct).subscribe((data) => {
      if (data.success) {
        this.flashService.show(
          "Your product has been deleted from the database",
          {
            cssClass: "alert alert-success",
            timeout: 2000,
          }
        );
        setTimeout(() => {
          this.refreshPage();
        }, 2000);
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
