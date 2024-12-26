import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import NoticeBoard from './pages/NoticeBoard';
import ResourceRoom from './pages/ResourceRoom';
import NotFoundPage from './pages/404';

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

                {/* 세부전공 페이지 */}
                <Route path="/specializations" element={<NotFoundPage />} />

                {/* QnA 페이지 */}
                <Route path="/qna" element={<NotFoundPage />} />

                {/* 로그인 페이지 */}
                <Route path="/login" element={<Login />} />

                {/* 404 페이지 */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
      </Router>
  );
}

export default App;