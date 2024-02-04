export interface IActivity {
  description: string;
  timeSpent: string;
}

export interface IActivityDetail {
  user: {
    fullname: string;
    age: number;
    phone: string;
  };
  activities: IActivity[];
}
