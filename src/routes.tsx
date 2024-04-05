import { Route, Routes } from "react-router-dom";

import { Home } from "./pages/home";
import { Sobre } from "./pages/sobre";
import { Register } from "./pages/register";
import { Screen } from "./pages/screen";



import { Private } from "./routes/Private";

function RoutesApp(){
    return(
    <Routes>
        <Route  path="/" element={ <Private><Home /></Private> } />
        <Route  path="/register" element={<Private> <Register /> </Private> } />
        <Route  path="/sobre" element={ <Private><Sobre /></Private> } />
        <Route path="/screen" element={  <Private><Screen /></Private> } />
       
    </Routes>  
    )
       
}

export default RoutesApp;
  

