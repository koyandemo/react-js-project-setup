import {
  RouterProvider
} from "react-router-dom";
import {browserRouter} from "./utils/routes";
import 'primereact/resources/themes/lara-light-blue/theme.css';


function App() {

  return (
   <RouterProvider router={browserRouter} />
  )
}

export default App
