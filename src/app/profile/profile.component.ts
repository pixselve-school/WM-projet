import { Component, OnInit } from '@angular/core';
import { User, UsersService } from '../users.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profile!: User;

  userForm = this.fb.group({
    email: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    firstname: ['', [Validators.required]],
    age: ['', [Validators.required]],
    password: [''],
  });
  loading = false;

  constructor(
    private tokenStorageService: TokenStorageService,
    private usersService: UsersService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  async onSubmit(event: SubmitEvent): Promise<void> {
    try {
      event.preventDefault();
      this.loading = true;
      const id = this.tokenStorageService.getId();
      const user = await this.usersService
        .updateUser(id, {
          email: this.userForm.value.email ?? '',
          lastname: this.userForm.value.lastname ?? '',
          firstname: this.userForm.value.firstname ?? '',
          age: parseInt(this.userForm.value.age ?? '0'),
          password:
            this.userForm.value.password?.length === 0
              ? undefined
              : this.userForm.value.password ?? undefined,
        })
        .toPromise();
      if (user === undefined) throw new Error('User not found');
      this.profile = user;
      this.userForm.setValue({
        email: user.email,
        lastname: user.lastname,
        firstname: user.firstname,
        age: user.age.toString(),
        password: '',
      });
    } catch (e) {
    } finally {
    }
  }

  async ngOnInit(): Promise<void> {
    try {
      const id = this.tokenStorageService.getId();
      const user = await this.usersService.getOneUser(id).toPromise();
      if (user === undefined) throw new Error('User not found');
      this.profile = user;
      console.log(user);
      this.userForm.setValue({
        email: user.email,
        lastname: user.lastname,
        firstname: user.firstname,
        age: user.age.toString(),
        password: '',
      });
    } catch (e) {
      console.error(e);
      this.router.navigate(['/']);
    }
  }
}
