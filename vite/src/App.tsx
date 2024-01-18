import { useEffect, useState } from 'react';
import axios from 'axios';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { useCookies } from 'react-cookie';
import { getCookie } from 'typescript-cookie';

const App = () => {
  const [count, setCount] = useState<number>(0);
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userCookies, setUserCookies] = useState<any>({
    user_id : "",
    user_name : "",
    email : "",
    is_admin : "",
    status : ""
  });
  const [cookies, setCookie] = useCookies(['COOKIE']);

  useEffect(() => {
      console.log(cookies)
  }, [useCookies])

  const axiosInstance = axios.create({
    withCredentials: true,
  });

  const handleLogin = async () => {
    try {
      // Axios를 사용하여 POST 요청을 보냅니다.
      const response = await axiosInstance.post('http://localhost:3000/api/login', {
        user_id: userId,
        password: password,
      });

    // 서버 응답 확인
    console.log('서버 응답:', response.data);
    setCookie('COOKIE', response.data, { maxAge : 360 })

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
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <div>
      {
        userCookies.user_id === "" ?
        <>
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
          <button onClick={handleLogin}>전송</button>
        </>
        :
        <>
          <p> { userCookies.user_id } </p>
        </>
      }
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

export default App;