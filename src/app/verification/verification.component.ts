import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { VerificationService } from "../verification.service";

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {

  message: string = "";
  titlemessage: string = "";

  constructor(private route: ActivatedRoute,
              private verificationService: VerificationService,
              private router: Router) {


  }

  async ngOnInit(): Promise<void> {
    this.route.queryParams
      .subscribe(async params => {
          if (params["t"] === undefined) {
            this.titlemessage = "Error";
            this.message = "Your account could not be verified. Your token is incorrect.";
          }
          try {
            this.verificationService.verify(params["t"]).then((res) => {
              res.subscribe(response => {
                this.titlemessage = "Success";
                this.message = "Your account has been verified. You can now login.";
              }, error => {
                if(error.status === 404) {
                  this.titlemessage = "Error";
                  this.message = "Your account could not be verified. Your token is incorrect.";
                }
                else if(error.status === 403) {
                  this.titlemessage = "Already Verified";
                  this.message = "Your account is already verified.";
                } else {
                  this.titlemessage = "Error";
                  this.message = "Your account could not be verified. An unknown error occurred.";
                }
              });
            });
          } catch (e) {
            this.titlemessage = "Error";
            this.message = "Your account could not be verified. An unknown error occurred.";
          }
        }
      );
  }


  async login(){
    await this.router.navigate(['/login']);
  }



}
