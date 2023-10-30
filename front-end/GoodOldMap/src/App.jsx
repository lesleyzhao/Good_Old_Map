import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Account from './pages/Account/Account';
import AccountEdit from './pages/AccountEdit/AccountEdit';
import MainMap from './pages/MainMap/MainMap';
import Login from './pages/Authenticate/Login';
import Register from './pages/Authenticate/Register';
import Error from './pages/Error/Error';
import InfoDetail from './pages/InfoDetail/InfoDetail';
import Favorite from './pages/FavoriteList/Favorite';
import AuthLayout from './pages/Authenticate/AuthLayout';
import AccountLayout from './pages/Account/AccountLayout';
import MapLayout from './pages/MainMap/MapLayout';
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          
          <Route element={<MapLayout />}>
            <Route path="/" element={<MainMap />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/*" element={<Error />} />
          </Route>
          {/* TODO: add params: /info/:pieceInfo */}
          <Route path="/info" element={<InfoDetail/>}/>
          
          <Route path="/account" element={<AccountLayout />}>
            <Route path="" element={<Account />} />
            <Route path="favorite" element={<Favorite />}/>
            <Route path="edit" element={<AccountEdit />} />
          </Route>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
