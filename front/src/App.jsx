import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NoticeBoard from './pages/NoticeBoard';
import ResourceRoom from './pages/ResourceRoom';

function App() {
  return (
      <Router>
            <Routes>
                {/* 메인 페이지 */}
                <Route path="/" element={<Home />} />

                {/* 공지사항 페이지 */}
                <Route path="/notices" element={<NoticeBoard />} />

                {/* 자료실 페이지 */}
                <Route path="/resources" element={<ResourceRoom />} />

            </Routes>
      </Router>
  );
}

export default App;