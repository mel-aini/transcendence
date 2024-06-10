import { Route, Routes } from "react-router-dom";
import { default as SignUp } from "./pages/Sign-up/Index";
import { default as Login } from "./pages/Login/Index"; 
import { default as Home } from "./pages/Home/Index";
import { default as Chat } from "./pages/Chat/Index";
import { default as Game } from "./pages/PingPong/Index";
import { default as Settings } from "./pages/Settings/Index";
import { default as Profile } from "./pages/Profile/Index";
import { default as Dashboard } from "./pages/Dashboard/Index";
import Loading from "./components/Loading";
import GlobalContextProvider from "./contexts/store";
import Layout from "./components/Layout";
import MainLayout from "./MainLayout";
import ChatContextProvider from "./contexts/chatStore";

import { default as PingPong } from './pages/PingPong/Index'
import { default as Play } from './pages/PingPong/Play/Index'
import PingPongContextProvider from "./contexts/pingPongStore";

function App() {
  return (
      <GlobalContextProvider>
        <ChatContextProvider>
          <PingPongContextProvider>
            <Loading />
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/chat" element={<Chat />} />
                <Route element={<Layout />}>
                  <Route path="/game" element={<Game />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path='/users'>
                    <Route path=':id' element={<Profile />} />
                    <Route path='*' element={<>Not Found</>} />
                  </Route>
                  <Route path='/ping-pong'>
                    <Route index element={<PingPong />} />
                    <Route path='play' element={<Play />} />
                    <Route path='*' element={<>Not Found</>} />
                  </Route>
                </Route>
                <Route path='*' element={<>Not Found</>} />
              </Route>
            </Routes>
          </PingPongContextProvider>
        </ChatContextProvider>
      </GlobalContextProvider>
  )
}

export default App;
