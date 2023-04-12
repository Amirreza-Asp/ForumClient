export interface Community {
  id: string;
  title: string;
  description?: string;
  image?: string;
  icon: string;
  createAt: Date;
  manager?: string;
}

export interface UpsertCommunity {
  id: string;
  title: string;
  description: string;
  image?: string;
  imageExtension?: string;
  icon?: string;
}
