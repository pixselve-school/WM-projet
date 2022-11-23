import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiHelperService } from '../api-helper.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  id: string = this.route.snapshot.paramMap.get('id') ?? '';
  deleteLoading: boolean = false;
  user: { firstname: string; lastname: string; id: number; age: number } = {
    firstname: '',
    lastname: '',
    id: 0,
    age: 0,
  };

  constructor(
    private route: ActivatedRoute,
    private api: ApiHelperService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    // check if the id is valid
    try {
      this.user = await this.api.get({ endpoint: `/users/${this.id}` });
      console.log(this.user);
    } catch (e) {
      // redirect to /users
      this.router.navigate(['/users']);
    }
  }

  /**
   * Delete the user
   */
  async deleteUser(): Promise<void> {
    try {
      this.deleteLoading = true;
      await this.api.delete({ endpoint: `/users/${this.id}` });
      this.router.navigate(['/users']);
    } catch (e) {
      console.log(e);
    } finally {
      this.deleteLoading = false;
    }
  }
}
