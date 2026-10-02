import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import SessionsPage from "./pages/SessionsPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import ProfilePage from "./pages/ProfilePage";

export function App() {
  return (
    <Router>
      <div className="flex min-h-screen flex-col bg-[#070C1C] text-[#FFFFFF] selection:bg-red-500 selection:text-white">
        <Header />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sessions" element={<SessionsPage />} />
            <Route path="/movie/:id" element={<MovieDetailsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
