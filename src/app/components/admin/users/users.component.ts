import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: any;
  pageSize = 8;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private authService: AuthService
  ){}

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers(): void {
    this.authService.getUsers(1, this.pageSize).pipe(takeUntil(this.destroy$)).subscribe(res => {
      this.users = res.data;
    })
  }

}
