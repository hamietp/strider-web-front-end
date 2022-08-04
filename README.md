# Strider Web Frontend Assessment 2.3

# Author

Hamilton Lopes, 2022.

## Packages used

![image](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![image](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)
![image](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![image](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)

- Angular Version 14.1.0
- NodeJS Version 16.16
- [Material Angular](https://material.angular.io/) version 14.1.1

## Installing the packages

Run `npm install` in the root directory of the project to install all required packages.

## Development server

After installing all packages, run `ng serve` for a dev server.  
Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

# How-to Instructions

## Using the application

You can write the post in the top box of the page, and submit with the blue button. The post is limited to 777 characters and you can submit 5 posts a day -- including reposts and quoteposts. Users cannot delete or edit their posts.

## User profiles

In order to access the profile menus, you need to click in the user's portrait to access his/her profile.

## Following users

Inside their profile, you can follow other users by clicking the follow button. You can unfollow them by clicking the unfollow button.

## Switching between the two views

You can switch between the two views (all/following) by clicking the switch button, located below the "write post" input. Users can also type "/all" or "/following" in the URL to switch between the two views.

## Reposting and Quote-posting

Users can click on the buttons located below each post, inside the users' profiles, to repost or quote-post.

The repost action is instant, while when you quote-post, you need to type the message in the input box and click on the blue button to submit.

# Planning

## New feature request: 'reply-to-post'

## Questions

- Users can reply to their own posts?
- Users can reply to ALL other users' posts OR only if they follow and/or are followed back?
- Users can only access their own "Posts-and-replies" page or everyones?

## Implementation ideas

- The "Posts-and-replies" button, inside the profile, would be located at the top of the page, routing the view to "/posts-and-replies";
- A new interface will be created for the "Posts-and-replies" feature, as the current UserPostInterface would be crowded with information and objects, this would be a lot more complex to maintain;
- Segregate the reposts and quote-posts API from the new posts-and-replies API;
- Database would be a NoSQL since the beginning.

# Critique

- I would not have used the localStorage method to store user data, since it is not secure and it is a bit more complicated to work with.
  - Instead, I would have used a NoSQL like Firestore (which I have prior experience) or MongoDB, for example.
- Maybe Angular was not the best framework for this project, but I feel more confortable with it. I believe Vue or React would have been a better choice, but I would need more time to learn better that frameworks.
- An authentication system would be a good idea to implement, since it is not that complicated. I would use a Firebase authentication system.

## Scaling

- This app could be written using some Cloud architecture features, like OpenStack or GCP/AWS.
- This app, **as it is right now**, if scaled up, it would be a mess to keep using localStorage. The solution would be to use a NoSQL database, like Firestore or MongoDB. This app would perform really well with thousands of users and huge content if it were made using Firebase.
    - NoSQL are very performant, and they do not require much computational power to store data. The data processing (for a huge database) could be made part server-side and part client-side, but this would be more complicated.
- To handle multiple (thousands) of simoultaneous users and requests, would be a good idea to implement a queue system in the API.
    - This would be the first thing that would fail: multiple simoutaneous requests to the API could cause the requests to not reach its destination and be forever lost.
- Two Factor Authentication for login could be used to retrieve a new password if the user forgot it.