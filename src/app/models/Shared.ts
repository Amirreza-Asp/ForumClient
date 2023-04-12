export interface Pagenation<T> {
  data: T[];
  total: number;
  page: number;
  size: number;
  totalPages: number;
}

export interface SelectOptions {
  text: string;
  value: string | number;
}

export interface Dashboard {
  numberOfTopicPerMonth: [
    {
      month: string;
      count: number;
    }
  ];
  usersCount: number;
  communitiesCount: number;
  topicsCount: number;
  commentsCount: number;
  newMembersJoined: [
    {
      month: string;
      count: string;
    }
  ];
  communitiesWithMostTopics: [
    {
      community: string;
      topicsCount: number;
    }
  ];
  topicsWithMostComments: [
    {
      topic: string;
      commentsCount: number;
    }
  ];
  usersGender: [
    {
      isMale: boolean;
      count: number;
    }
  ];
  usersCountByAge: [
    {
      age: number;
      count: number;
    }
  ];
}
