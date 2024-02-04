import './App.css';

import { useState } from 'react';

import ActivityCard from './components/ActivityCard';
import ActivityForm from './components/ActivityForm';
import { IActivity, IActivityDetail } from './components/types/activity.types';

const App = () => {
  const [activities, setActivities] = useState<IActivityDetail[]>([]);

  const addActivity = (newActivity: IActivityDetail) => {
    setActivities([...activities, newActivity]);
  };

  return (
    <div className="App">
      <ActivityForm addActivity={addActivity} />

      {activities.length > 0 && (
        <>
          <h2>Activties:</h2>
          <div className="card-wrapper">
            {activities.map((activity, idx) => (
              <ActivityCard
                user={activity.user}
                activities={activity.activities}
                key={idx}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
