import { createBrowserRouter } from 'react-router-dom';

import DayFive from '../pages/DayFive';
import DayFour from '../pages/DayFour';
import DayThree from '../pages/DayThree';
import DayTwo from '../pages/DayTwo';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DayFive />,
  },
  {
    path: '/daytwo',
    element: <DayTwo />,
  },
  {
    path: '/daythree',
    element: <DayThree />,
  },
  {
    path: '/dayfour',
    element: <DayFour />,
  },
  {
    path: '*',
    element: <>Not Found!</>,
  },
]);

export default router;
