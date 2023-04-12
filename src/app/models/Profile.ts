export interface Profile {
  userName: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  isMale: boolean;
  age: Date;
  photo: Photo;
}

export interface Photo {
  id: string;
  url: string;
  name: string;
}
