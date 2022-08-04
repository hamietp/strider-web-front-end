import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserPostsInterface } from '../interfaces/user-posts.interface';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.initializeUserPosts();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UserProfileComponent);

    dialogRef.afterClosed().subscribe((result) => {});
  }

  initializeUserPosts(): void {
    // Initialize a few mocked-up user posts if they don't exist
    if (localStorage.getItem('payload') === null) {
      const newPostObject: UserPostsInterface[] = [
        {
          username: 'jeannie is a genie',
          nickname: 'sudojeanette',
          message: `mee too, jane, me too`,
          portrait: 'Jeanette-fields',
          timestamp: new Date('03 August 2022 21:22 UTC').toISOString(),
          dateJoined: new Date('01 December 2016 09:09 UTC').toISOString(),
          following: ['lewishamilton', 'srslyjane'],
          followers: ['fr4nk13', 'annepostrr'],
        },
        {
          username: 'jeannie is a genie',
          nickname: 'sudojeanette',
          message: `oh lord i've almost broken another glass,,,`,
          portrait: 'Jeanette-fields',
          timestamp: new Date('02 August 2022 13:10 UTC').toISOString(),
          dateJoined: new Date('15 February 2017 09:09 UTC').toISOString(),
          repost: true,
          repostFrom: 'j a n e',
          repostNickname: 'srslyjane',
          repostPortrait: 'Jane-doe',
          repostTimestamp: new Date('02 August 2022 12:02 UTC').toISOString(),
          following: ['lewishamilton', 'srslyjane'],
          followers: ['fr4nk13', 'annepostrr'],
        },
        {
          username: 'jeannie is a genie',
          nickname: 'sudojeanette',
          message: `Need a name for my new cat. I just cant think about a good name for her!!!`,
          portrait: 'Jeanette-fields',
          timestamp: new Date('03 August 2022 21:22 UTC').toISOString(),
          dateJoined: new Date('01 December 2016 09:09 UTC').toISOString(),
          following: ['lewishamilton', 'srslyjane'],
          followers: ['fr4nk13', 'annepostrr'],
        },
        {
          username: 'frankie @ #HungaryGP',
          nickname: 'fr4nk13',
          message: `You know I'm always gonna support you when you're making questionable choices. Let me know when you schedule a test drive, I wanna drive that new car too`,
          portrait: 'Frank-doe',
          timestamp: new Date('03 August 2022 18:58 UTC').toISOString(),
          quoteMessage: 'The only thing holding me back from the fact that I NEED a new car is that... I already have a new car. This is getting out of hand',
          quotePost: true,
          repostFrom: 'rich',
          repostNickname: 'stvnsn',
          repostPortrait: 'Richard-Stevenson',
          repostTimestamp:new Date('25 July 2022 10:12 UTC').toISOString(),
          following: ['lewishamilton', 'happyfields', 'annepostrr', 'srslyjane'],
          followers: ['lewishamilton', 'happyfields', 'annepostrr', 'srslyjane'],
        },
        {
          username: 'j a n e',
          nickname: 'srslyjane',
          message: `just realized i'm running out of glasses`,
          portrait: 'Jane-doe',
          timestamp: new Date('02 August 2022 12:02 UTC').toISOString(),
          dateJoined: new Date('12 March 2021 09:09 UTC').toISOString(),
          following: ['lewishamilton'],
          followers: ['fr4nk13', 'annepostrr'],
        },
        {
          username: 'j a n e',
          nickname: 'srslyjane',
          message: `oh lord i've almost broken another glass,,,`,
          portrait: 'Jane-doe',
          timestamp: new Date('02 August 2022 12:01 UTC').toISOString(),
          dateJoined: new Date('12 March 2021 09:09 UTC').toISOString(),
          following: ['lewishamilton'],
          followers: ['fr4nk13', 'annepostrr'],
        },
        {
          username: 'Hamilton',
          nickname: 'lewishamilton',
          message:
            `HungaryGP was such a great race! Had the opportunity to meet Sir Lewis Hamilton yesterday. 
            Thanks for being such a humble person with all those ppl asking for photos and such, hahaha`,
          portrait: 'Lewis-Hamilton',
          timestamp: new Date('02 August 2022 13:10 UTC').toISOString(),
          dateJoined: new Date('15 February 2017 09:09 UTC').toISOString(),
          repost: true,
          repostFrom: 'frankie @ #HungaryGP',
          repostNickname: 'fr4nkieF1',
          repostPortrait: 'Frank-doe',
          repostTimestamp: new Date('01 August 2022 16:21 UTC').toISOString(),
          following: ['lewishamilton', 'happyfields', 'annepostrr'],
          followers: ['lewishamilton', 'happyfields', 'annepostrr'],
        },
        {
          username: 'Hamilton',
          nickname: 'lewishamilton',
          message: 'Great race yesterday!',
          portrait: 'Lewis-Hamilton',
          timestamp: new Date('01 August 2022 10:33 UTC').toISOString(),
          dateJoined: new Date('10 November 2010 09:09 UTC').toISOString(),
          following: ['fr4nk13'],
          followers: ['fr4nk13', 'happyfields', 'annepostrr'],
        },
        {
          username: 'frankie @ #HungaryGP',
          nickname: 'fr4nk13',
          message:
            'HungaryGP was such a great race! Had the opportunity to meet Sir Lewis Hamilton yesterday. Thanks for being such a humble person with all those ppl asking for photos and such',
          portrait: 'Frank-doe',
          timestamp: new Date('01 August 2022 16:21 UTC').toISOString(),
          dateJoined: new Date('15 February 2017 09:09 UTC').toISOString(),
          following: ['lewishamilton', 'happyfields', 'annepostrr', 'stvnsn'],
          followers: ['lewishamilton', 'happyfields', 'annepostrr', 'stvnsn'],
        },
        {
          username: 'Anne-Marie',
          nickname: 'annepostrr',
          message: "You're welcome, David!",
          portrait: 'Anne-Goldberg',
          timestamp: '2022-07-28T18:15:23.695Z',
          dateJoined: new Date('31 August 2020 09:09 UTC').toISOString(),
          quoteMessage: 'Starting spanish course today. Anne has great advices!',
          quotePost: true,
          repostFrom: 'Fields, David',
          repostNickname: 'happyfields',
          repostPortrait: 'David-fields',
          repostTimestamp: '2022-07-27T12:20:00.000Z',
          followers: ['happyfields'],
          following: ['lewishamilton', 'happyfields', 'srslyjane'],
        },
        {
          username: 'Fields, David',
          nickname: 'happyfields',
          message: 'Starting spanish course today. Anne has great advices!',
          portrait: 'David-fields',
          timestamp: new Date('27 July 2022 12:20 UTC').toISOString(),
          dateJoined: new Date('02 January 2018 09:09 UTC').toISOString(),
          following: ['annepostrr'],
          followers: ['happyfields'],
        },
        {
          username: 'Anne-Marie',
          nickname: 'annepostrr',
          message: 'good to be back!',
          portrait: 'Anne-Goldberg',
          timestamp: new Date('25 July 2022 14:48 UTC').toISOString(),
          dateJoined: new Date('31 August 2020 09:09 UTC').toISOString(),
          following: [],
          followers: [],
        },
        {
          username: 'rich',
          nickname: 'stvnsn',
          message: 'The only thing holding me back from the fact that I NEED a new car is that... I already have a new car. This is getting out of hand',
          portrait: 'Richard-Stevenson',
          timestamp: new Date('25 July 2022 10:12 UTC').toISOString(),
          dateJoined: new Date('4 June 2014 09:09 UTC').toISOString(),
          following: ['lewishamilton'],
          followers: ['happyfields', 'fr4nk13'],
        },
      ];

      localStorage.setItem('payload', JSON.stringify(newPostObject));
    }
  }
}
