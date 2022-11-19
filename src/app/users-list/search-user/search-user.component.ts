import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {
  searchQuery = new FormControl("", [Validators.required]);

  result: { firstname: string, lastname: string, id: string } | null | undefined = undefined;


  loading = false;

  constructor() {
  }

  ngOnInit(): void {
  }


  async searchUser(event: SubmitEvent) {
    event.preventDefault();
    try {
      this.loading = true;
      // sleep for 2 seconds
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log(this.searchQuery.value);
      this.result = {
        firstname: "John",
        lastname: "Doe",
        id: "123"
      };
    } catch (e) {

    } finally {
      this.loading = false;
    }


  }
}
