import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Account from './pages/Account/Account';
import AccountEdit from './pages/AccountEdit/AccountEdit';
import MainMap from './pages/MainMap/MainMap';
import SearchMap from './pages/MainMap/SearchMap';
import Login from './pages/Authenticate/Login';
import Register from './pages/Authenticate/Register';
import Error from './pages/Error/Error';
import InfoDetail from './pages/InfoDetail/InfoDetail';
import AuthLayout from './pages/Authenticate/AuthLayout';
import AccountLayout from './pages/Account/AccountLayout';
import FavoriteList from './pages/FavoriteList/FavoriteList';

import MapLayout from './pages/MainMap/MapLayout';
import InfoLayout from './pages/InfoDetail/InfoLayout';
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          
          <Route element={<MapLayout />}>
            <Route path="/" element={<MainMap />} />
            <Route path="/search" element={<SearchMap />} />
          </Route>
          
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/*" element={<Error />} />
          </Route>
          {/* TODO: add params: /info/:pieceInfo */}
          <Route element={<InfoLayout />}>
            <Route path="/info" element={<InfoDetail/>}/>
          </Route>
          {/* <Route path="/favoritelist" element={<FavoriteList />}/> */}
          <Route path="/favoritelist" element={<FavoriteList />}/>
          <Route path="/account" element={<AccountLayout />}>
            <Route path="" element={<Account />} />
            <Route path="edit" element={<AccountEdit />} />
            {/* <Route path="favoritelist" element={<FavoriteList />}/> */}
          </Route>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
