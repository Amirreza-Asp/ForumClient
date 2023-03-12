export interface Community {
  id: string;
  title: string;
  description?: string;
  image?: string;
  icon: string;
  createAt: Date;
}

export interface UpsertCommunity {
  id: string;
  title: string;
  description: string;
  image?: string;
  imageExtension?: string;
  icon?: string;
}
