import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { UserPostsInterface } from 'src/app/interfaces/user-posts.interface';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss'],
})
export class UserPostsComponent implements OnInit, AfterContentChecked {
  public assetsPath = '../../../assets/portraits/';

  public filteredPosts: UserPostsInterface[] = [];
  public filteredPosts$!: Observable<UserPostsInterface[]>;

  private destroy = new Subject<any>();

  constructor(private cdRef: ChangeDetectorRef, private router: Router) {
    this.filteredPosts = JSON.parse(localStorage.getItem('payload')!);
    this.filteredPosts$ = new Observable<UserPostsInterface[]>();
  }

  ngAfterContentChecked(): void {
    this.getPosts();
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    if (this.router.url.split('/')[1] === 'all') {
      this.filteredPosts = JSON.parse(localStorage.getItem('payload')!);
    } else if (this.router.url.split('/')[1] === 'following') { 
      this.filteredPosts = JSON.parse(localStorage.getItem('payload')!).filter(
        (posts: UserPostsInterface) => {
          return (
            posts.nickname.includes('lewishamilton') ||
            posts.followers?.includes('lewishamilton')
          );
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.destroy.next(void 0);
    this.destroy.complete();
  }
}
