import { Session } from 'next-auth';

export interface SessionWithAvatar extends Session {
  user: {
    avatar_url: string;
  } & Session['user'];
}
