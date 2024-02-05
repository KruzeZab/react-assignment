import './index.scss';

import { Link } from 'react-router-dom';

const DayFive = () => {
  return (
    <div className="assignments">
      <ul>
        <li>
          <Link to="/daytwo" className="nav-link">
            Day Two
          </Link>
        </li>
        <li>
          <Link to="/daythree" className="nav-link">
            Day Three
          </Link>
        </li>
        <li>
          <Link to="/dayfour" className="nav-link">
            Day Four
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default DayFive;
