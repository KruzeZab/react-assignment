import { createBrowserRouter } from 'react-router-dom';
import DayFive from '../pages/DayFive';
import DayTwo from '../pages/DayTwo';
import DayThree from '../pages/DayThree';
import DayFour from '../pages/DayFour';

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
  // {
  //   path: '*',
  //   element: <>Not Found!</>,
  // },
]);

export default router;
