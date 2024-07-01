import { Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import GlobalContextProvider from "./contexts/store";
import Layout from "./components/Layout";
import MainLayout from "./MainLayout";
import ChatContextProvider from "./contexts/chatProvider";
import PingPongContextProvider from "./contexts/pingPongProvider";
import { Suspense, lazy } from "react";
import LoadingPage from "./components/LoadingPage";
import withAuth from  './guards/withAuth'
import withoutAuth from  './guards/withoutAuth'
import AuthContextProvider from "./contexts/authProvider";
import GlobalWebSocketContextProvider, { GlobalWebSocketContext } from "./contexts/globalWebSokcketStore";
import withProfile from "./guards/withProfile";

const Home = lazy(() => import('./pages/Home/Index'));
const Chat = lazy(() => import('./pages/Chat/Index'));
const Login = lazy(() => import('./pages/Login/Index'));
const SignUp = lazy(() => import('./pages/Sign-up/Index'));
const Profile = lazy(() => import('./pages/Profile/Index'));
const Settings = lazy(() => import('./pages/Settings/Index'));
const Dashboard = lazy(() => import('./pages/Dashboard/Index'));
const PingPong = lazy(() => import('./pages/PingPong/Index'));
const Play = lazy(() => import('./pages/PingPong/Play/Index'));
const VsFriend = lazy(() => import('./pages/PingPong/VsFriend/Index'));
const MatchMaking = lazy(() => import('./pages/PingPong/MatchMaking/Index'));

function App() {
  return (
      <GlobalContextProvider>
        <AuthContextProvider>
          <ChatContextProvider>
            <PingPongContextProvider>
              <GlobalWebSocketContextProvider>
              <Suspense fallback={<LoadingPage />}>
                <Routes>
                  <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/signup" element={withoutAuth(SignUp)} />
                    <Route path="/login" element={withoutAuth(Login)} />
                    <Route path="/chat" element={withAuth(Chat)} />
                    <Route element={withAuth(Layout)}>
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/profile" element={withProfile(Profile)} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path='/users'>
                        <Route path=':id' element={withProfile(Profile)} />
                        <Route path='*' element={<>Not Found</>} />
                      </Route>
                      <Route path='/ping-pong'>
                        <Route index element={<PingPong />} />
                        <Route path='play' element={<Play />} />
                        <Route path='match-making' element={<MatchMaking />} />
                        <Route path='vs-friend' element={<VsFriend />} />
                        <Route path='*' element={<>Not Found</>} />
                      </Route>
                    </Route>
                    <Route path='*' element={<>Not Found</>} />
                  </Route>
                </Routes>
              </Suspense>
              </GlobalWebSocketContextProvider>
            </PingPongContextProvider>
          </ChatContextProvider>
        </AuthContextProvider>
      </GlobalContextProvider>
  )
}

export default App;
