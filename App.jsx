import Navbar from "./component/Navbar"
import Parent from "./component/Parent"
import Counter from "./component/Counter"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Home from "./pages/Home"
import Service from "./pages/Service"
import Login from "./Auth/Login"

const App = () => {
  //const message = "<script>alert('Hacked!!!`)</script>"
  return (
    <div>
      <Navbar/>
    </div>
   //<p className ='text-7xl font-bold bg-blue-600'>Welcome</p>
  )
}

export default App;