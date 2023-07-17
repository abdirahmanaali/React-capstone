import Characters from './pages/Characters/Characters';
import Comics from './pages/Creators/Creators';
import Series from './pages/Series/Series';

const Pages = [
    {
        path: "/",
        exact: true,
        main: Characters
    },
    {
        path: "/comics",
        exact: true,
        main: Comics
    },
    { 
        path: "/series",
        exact: true,
        main: Series
    }
]

export default Pages;