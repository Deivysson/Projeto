import { Route, Routes } from "react-router-dom";

import { Home } from "./pages/home";
import { Sobre } from "./pages/sobre";
import { Register } from "./pages/register";
import Admin  from "./pages/admin";

function RoutesApp(){
    return(
    <Routes>
        <Route  path="/" element={ <Home /> } />
        <Route  path="/register" element={ <Register /> } />
        <Route  path="/sobre" element={ <Sobre /> } />
        <Route path="/Admin" element={ <Admin /> } />
    </Routes>  
    )
       
}

export default RoutesApp;
  

