import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ApiHelperService } from '../../api-helper.service';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css'],
})
export class SearchUserComponent implements OnInit {
  searchQuery = new FormControl('', [Validators.required]);
  queryOnSearch = '';
  result:
    | { firstname: string; lastname: string; id: number; age: number }
    | null
    | undefined = undefined;

  loading = false;

  constructor(private api: ApiHelperService) {}

  ngOnInit(): void {}

  async searchUser(event: SubmitEvent) {
    event.preventDefault();
    try {
      this.loading = true;
      this.queryOnSearch = this.searchQuery.value ?? '';
      this.result = await this.api.get({
        endpoint: `/users/${this.searchQuery.value}`,
      });
    } catch (e) {
      this.result = null;
    } finally {
      this.loading = false;
    }
  }
}
