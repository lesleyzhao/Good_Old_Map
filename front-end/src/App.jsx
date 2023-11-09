import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Account from './pages/Account/Account';
import MainMap from './pages/MainMap/MainMap';
import SearchMap from './pages/MainMap/SearchMap';
import Login from './pages/Authenticate/Login';
import Register from './pages/Authenticate/Register';
import Error from './pages/Error/Error';
import InfoDetail from './pages/InfoDetail/InfoDetail';
import AuthLayout from './pages/Authenticate/AuthLayout';
import AccountLayout from './pages/Account/AccountLayout';
import FavoriteList from './pages/FavoriteList/FavoriteList';
import AppLayout from './AppLayout';

import MapLayout from './pages/MainMap/MapLayout';
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          
          <Route element={<AppLayout/>}>
            
            <Route element={<MapLayout />}>
              <Route path="/" element={<MainMap />} />
              <Route path="/search" element={<SearchMap />} />
            </Route>
            
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            
            {/* TODO: add params: /info/:pieceInfo */}
            <Route path="/info" element={<InfoDetail/>}/>
            <Route path="/favoritelist" element={<FavoriteList />}/>

            <Route element={<AccountLayout />}>
              <Route path="/account" element={<Account />} />
            </Route>

            <Route path="/*" element={<Error />} />
          </Route>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
