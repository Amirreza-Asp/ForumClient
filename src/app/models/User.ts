export interface User {
  userName: string;
  fullName: string;
  email: string;
  image: string;
  role: string;
}

export class User implements User {
  constructor(init: UserResult) {
    Object.assign(this, init);
  }
}

export interface UserResult {
  userName: string;
  fullName: string;
  email: string;
  image: string;
  role: string;
  token: string;
  refreshToken: string;
}

export interface Login {
  userName: string;
  password: string;
}

export interface Register {
  userName: string;
  name: string;
  family: string;
  age: Date;
  isMale: boolean | string;
  password: string;
  email?: string;
  phoneNumber?: string;
  role: string;
}

export class Register implements Register {}

export interface UserSummary {
  userName: string;
  name: string;
  family: string;
  age: number;
  gender: string;
  role: string;
}

export interface UserDetails {
  id: string;
  userName: string;
  name: string;
  family: string;
  age: Date;
  isMale: boolean;
  email: string;
  phoneNumber: string;
  role: string;
}

export interface UpsertUser {
  id: string;
  name: string;
  family: string;
  userName: string;
  password: string;
  age: Date | string;
  isMale: boolean | string;
  email: string;
  phoneNumber: string;
  role: string;
}

export class UpsertUser implements UpsertUser {
  constructor(init?: UserDetails) {
    if (init) {
      this.id = init.id;
      this.name = init.name;
      this.family = init?.family;
      this.userName = init.userName;
      this.password = "fake password";
      this.age = init.age.toString().split("T")[0];
      this.isMale = init.isMale.toString();
      this.email = init.email;
      this.phoneNumber = init.phoneNumber;
      this.role = init.role;
    }
  }
}
