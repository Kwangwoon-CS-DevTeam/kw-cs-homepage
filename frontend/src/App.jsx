import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Specialization from "./pages/Specialization.jsx";
import NoticeBoard from './pages/NoticeBoard.jsx';
import ResourceRoom from './pages/ResourceRoom.jsx';
import IntelligentComputingSystems from "./pages/IntelligentComputingSystems.jsx";
import IntelligentInfo from "./pages/IntelligentInfo.jsx";
import NotFoundPage from './pages/404.jsx';
import QnaBoard from "./pages/QnaBoard.jsx";
import NoticeCreatePage from "./pages/NoticeCreatePage.jsx";

function App() {
  return (
      <Router>
            <Routes>
                {/* 메인 페이지 */}
                <Route path="/" element={<Home />} />

                {/* 공지사항 페이지 */}
                <Route path="/notices" element={<NoticeBoard />} />

                {/* 공지사항 작성 페이지 */}
                <Route path="/notices/new-notice" element={<NoticeCreatePage />} />

                {/* 자료실 페이지 */}
                <Route path="/resources" element={<ResourceRoom />} />

                {/* 세부전공 페이지 */}
                <Route path="/specializations" element={<Specialization />} />

                {/* 세부전공 지능컴퓨팅시스템 상세 페이지 */}
                <Route path="/specializations/ics" element={<IntelligentComputingSystems />} />

                {/* 세부전공 지능정보 상세 페이지 */}
                <Route path="/specializations/ii" element={<IntelligentInfo />} />

                {/* QnA 페이지 */}
                <Route path="/qna" element={<QnaBoard />} />

                {/* 로그인 페이지 */}
                <Route path="/login" element={<Login />} />

                {/* 404 페이지 */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
      </Router>
  );
}

export default App;