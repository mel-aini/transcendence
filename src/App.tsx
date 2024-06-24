import { Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import GlobalContextProvider from "./contexts/store";
import Layout from "./components/Layout";
import MainLayout from "./MainLayout";
import ChatContextProvider from "./contexts/chatStore";
import PingPongContextProvider from "./contexts/pingPongStore";
import { Suspense, lazy } from "react";
import LoadingPage from "./components/LoadingPage";
import withAuth from  './guards/withAuth'

const Home = lazy(() => import('./pages/Home/Index'));
const Chat = lazy(() => import('./pages/Chat/Index'));
const Login = lazy(() => import('./pages/Login/Index'));
const SignUp = lazy(() => import('./pages/Sign-up/Index'));
const Profile = lazy(() => import('./pages/Profile/Index'));
const Settings = lazy(() => import('./pages/Settings/Index'));
const Dashboard = lazy(() => import('./pages/Dashboard/Index'));
const PingPong = lazy(() => import('./pages/PingPong/Index'));
const Play = lazy(() => import('./pages/PingPong/Play/Index'));

function App() {
  return (
      <GlobalContextProvider>
        <ChatContextProvider>
          <PingPongContextProvider>
            <Suspense fallback={<LoadingPage />}>
              <Loading />
              <Routes>
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<Home />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="loading" element={<LoadingPage />}/>
                  <Route path="/login" element={<Login />} />
                  <Route path="/chat" element={withAuth(Chat)} />
                  <Route element={withAuth(Layout)}>
                    <Route path="/settings" element={withAuth(Settings)} />
                    <Route path="/profile" element={withAuth(Profile)} />
                    <Route path="/dashboard" element={withAuth(Dashboard)} />
                    <Route path='/users'>
                      <Route path=':id' element={withAuth(Profile)} />
                      <Route path='*' element={<>Not Found</>} />
                    </Route>
                    <Route path='/ping-pong'>
                      <Route index element={withAuth(PingPong)} />
                      <Route path='play' element={withAuth(Play)} />
                      <Route path='*' element={<>Not Found</>} />
                    </Route>
                  </Route>
                  <Route path='*' element={<>Not Found</>} />
                </Route>
              </Routes>
            </Suspense>
          </PingPongContextProvider>
        </ChatContextProvider>
      </GlobalContextProvider>
  )
}

export default App;
