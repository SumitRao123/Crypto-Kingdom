

import { Layout, Space, Typography } from "antd";
import { NavLink, Route, Routes } from "react-router-dom";
// import {Navbar,Exchanges,CryptoDetails,Cryptocurrencies,News,Home} from "./Components/Navbar";
import "./App.css";
import Navbar from "./Components/Navbar";
import Homepage from "./Components/Homepage";
import Exchanges from "./Components/Exchanges";
// import Homepage from "./Components/Homepage";
import CryptoDetails from "./Components/CryptoDetails"
import Cryptocurrencies from "./Components/Cryptocurrencies";
import News from "./Components/News";
import "antd/dist/antd.css"
  // import {Navbar } from "./Components/Navbar"
function App() {
  return (
    <div className="App">
         <div className="navbar">
             <Navbar/>
         </div>
         <div className="main">
           <Layout>
           <div className="routes">
                 <Routes>
                   <Route path="/" element={<Homepage/>}/>
                   <Route path="/exchanges" element={<Exchanges/>}/>
                   <Route path="/cryptocurrencies" element={<Cryptocurrencies/>}/>
                   <Route path="/crypto/:coinId" element={<CryptoDetails/>}/>
                   <Route path="/news" element={<News/>}/>
                  </Routes>
             </div>
           </Layout>
            
         <div className="footer">
             <Typography.Title level={5} style={{color:'white',textAlign:'center'}}>
                CryptoVerse<br/>
                All Rights Are Reserved
             </Typography.Title>
             <Space>
               <NavLink to='/'>HomePage</NavLink>
               <NavLink to="/exchanges">Exchanges</NavLink>
               <NavLink to="/news">News</NavLink>
             </Space>
         </div>
         </div>

    </div>
  );
}

export default App;
