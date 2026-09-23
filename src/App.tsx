import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Facilities from "./pages/Facilities";
import Gallery from "./pages/Gallery";
import News from "./pages/News";
import Book from "./pages/Book";
import NewsPost from "./pages/NewsPost";
import AddPost from "./pages/AddPost";
import NotFound from "./pages/NotFound";

// Components
import ScrollToTop from "./pages/components/ScrollToTop";
import LoadingScreen from "./pages/components/LoadingScreen";

function AppContent() {
    const location = useLocation();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
        const timer = setTimeout(() => {
            setVisible(false);
        }, 800);
        return () => clearTimeout(timer);
    }, [location.pathname]);

    return (
        <>
            <ScrollToTop />
            <LoadingScreen visible={visible} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about-us" element={<About />} />
                <Route path="/facilities" element={<Facilities />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/news-and-events" element={<News />} />
                <Route path="/news-and-events/:slug" element={<NewsPost />} />
                <Route path="/book" element={<Book />} />
                <Route path="/add-post" element={<AddPost />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}

export default App;
