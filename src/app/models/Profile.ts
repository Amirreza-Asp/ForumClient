export interface Profile {
  userName: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  isMale: boolean;
  age: Date;
  photo: Photo;
  commentsCount: number;
  topicsCount: number;
}

export interface Photo {
  id: string;
  url: string;
  name: string;
}
