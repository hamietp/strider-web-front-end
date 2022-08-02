export interface UserPostsInterface {
    username: string;
    nickname: string;
    message: string;
    timestamp: string;
    portrait: string;
    followers?: Array<string>;
    following?: Array<string>;
  }