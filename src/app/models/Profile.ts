export interface Profile {
  userName: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  isMale: boolean;
  age: Date;
  photos: Photo[];
}

export interface Photo {
  id: string;
  url: string;
  isMain: string;
  name: string;
}
