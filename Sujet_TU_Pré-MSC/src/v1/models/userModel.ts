export interface userToCreate {
  username: string;
  email: string;
  password: string;
  locale: string;
  language: Array<string>;
}

export interface User {
  _id: string;
  banned: boolean;
  username: string;
  email: string;
  password: string;
  locale: string;
  language: Array<string>;
  roles: Array<string>;
}

export interface UserPublicProfile {
  _id: string;
  banned: boolean;
  username: string;
  locale: string;
  language: Array<string>;
  roles: Array<string>;
}
