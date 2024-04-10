import { Route, Routes } from "react-router-dom";

import { Home } from "./pages/home";
import { Register } from "./pages/register";
import { Screen } from "./pages/screen";
import { Form } from './pages/form';
import { Gerar } from './pages/gerar'



import { Private } from "./routes/Private";

function RoutesApp(){
    return(
    <Routes>
        <Route  path="/" element={ <Private><Home /></Private> } />
        <Route  path="/register" element={<Private> <Register /> </Private> } />
        <Route path="/screen" element={  <Private><Screen /></Private> } />
        <Route path="/form" element={ <Private><Form /></Private> } />
        <Route  path="/gerar" element={ <Private> <Gerar /> </Private> } />
       
       
    </Routes>  
    )
       
}

export default RoutesApp;
  

