import { useState } from 'react';
import axios from 'axios';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg'; // 경로 수정
import './App.css';
import { getCookie } from 'typescript-cookie'

const App = () => {
  const [count, setCount] = useState(0);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleIncrement = async () => {
    try {
      // Axios를 사용하여 POST 요청을 보냅니다.
      const response = await axios.post('http://localhost:3000/login/', {
        user_id: userId,
        password: password,
      });

      // 서버 응답 확인
      console.log('서버 응답:', response.data);
      getCookie(response.data)

      // 상태 업데이트
      setCount((prevCount) => prevCount + 1);

    } catch (error) {
      // 에러 처리
      console.error('에러 발생:', error);
    }
  };

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={handleIncrement}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <div>
        {/* 사용자 ID 및 비밀번호 입력 폼 */}
        <label>
          사용자 ID:
          <input type="text" value={userId} onChange={handleUserIdChange} />
        </label>
        <br />
        <label>
          비밀번호:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <button onClick={handleIncrement}>전송</button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

export default App;