import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NoticeBoard from './pages/NoticeBoard';

function App() {
  return (
      <Router>
        <Routes>
          {/* 메인 페이지 */}
          <Route path="/" element={<Home />} />
          {/* 공지사항 페이지 */}
          <Route path="/notices" element={<NoticeBoard />} />
        </Routes>
      </Router>
  );
}

export default App;