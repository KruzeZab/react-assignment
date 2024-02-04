import './index.scss';

import { IActivityDetail } from '../types/activity.types';

const ActivityCard = (props: IActivityDetail) => {
  const { user, activities } = props;

  if (!activities || !user) {
    return <p className="not-found">No activities available.</p>;
  }

  return (
    <div className="card">
      <p>Fullname: {user.fullname}</p>
      <p>Age: {user.age}</p>
      <p>Phone no: {user.phone}</p>
      <div className="card-gap" />

      {activities.map((activity, index) => (
        <div key={index}>
          <h4 className="activity-title">Acitivty {index + 1}</h4>
          <p className="card-desc">
            Description: {'  '}
            {activity.description}
          </p>
          <p className="card-time">
            Time spent: {'  '} {activity.timeSpent}
          </p>
          {activities.length > 0 && activities.length !== index + 1 && (
            <div className="card-gap" />
          )}
        </div>
      ))}
    </div>
  );
};

export default ActivityCard;
