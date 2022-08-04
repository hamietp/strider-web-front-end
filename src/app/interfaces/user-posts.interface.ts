export interface UserPostsInterface {
  username: string;
  nickname: string;
  message: string;
  timestamp: string;
  portrait: string;
  dateJoined?: string;
  followers?: Array<string>;
  following?: Array<string>;
  repost?: boolean;
  repostFrom?: string;
  repostNickname?: string;
  repostTimestamp?: string;
  repostPortrait?: string;
  quotePost? : boolean;
  quoteMessage?: string;
}
