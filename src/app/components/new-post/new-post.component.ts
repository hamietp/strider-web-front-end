import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent implements OnInit {
  public formTextarea = new FormControl([], Validators.maxLength(777));
  public postFeed: any[] = [];
  public assetsPath = '../../../assets/portraits/';

  constructor() {}

  ngOnInit(): void {}

  onSubmit(message: string): void {
    let userPosts: string[] = [];
    let newPost: string[] = [];

    if (localStorage.getItem('payload') !== null) {
      userPosts = JSON.parse(localStorage.getItem('payload') || '');
    }

    const newPostObject = {
      username: 'Hamilton',
      nickname: '@lewishamilton',
      message: message,
      timestamp: new Date().toISOString(),
      portrait: 'Lewis-Hamilton',
    };

    newPost = [...userPosts, newPostObject] as string[];

    localStorage.setItem('payload',
          JSON.stringify(newPost) || 'Post something to your feed!')!;
  }
}
