import { Route, Routes } from "react-router-dom";
import { default as SignUp } from "./pages/Sign-up/Index";
import { default as Login } from "./pages/Login/Index"; 
import { default as Home } from "./pages/Home/Index";
import { default as Chat } from "./pages/Chat/Index";
import { default as Game } from "./pages/Game/Index";
import { default as Settings } from "./pages/Settings/Index";
import { default as Profile } from "./pages/Profile/Index";
import { default as Dashboard } from "./pages/Dashboard/Index";
import Loading from "./components/Loading";
import GlobalContextProvider from "./contexts/store";

function App() {
  return (
      <GlobalContextProvider>
            <Loading />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/game" element={<Game />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
      </GlobalContextProvider>
  )
}

export default App;
