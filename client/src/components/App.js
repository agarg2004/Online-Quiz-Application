import '../styles/App.css';

import{ createBrowserRouter, RouterProvider} from 'react-router-dom'

import Main from './Main.js'
import Quiz from './Quiz.js'
import Result from './Result'

const router= createBrowserRouter([
  {
    path:'/',
    element: <Main></Main>
  },
  {
    path:'/quiz',
    element: <Quiz></Quiz>
  },
  {
    path:'/result',
    element: <Result></Result>
  }
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
