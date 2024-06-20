import './App.css';
import AllRoutes from './Routes/AllRoutes';
import Offline from './Pages/Offline';
import { useEffect, useState } from 'react';

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);

    return () => {
      window.removeEventListener('online', handleOnlineStatusChange);
      window.removeEventListener('offline', handleOnlineStatusChange);
    };
  }, []);

  return (
    <div className="App">
      {
        !isOnline ? <Offline/> :  <AllRoutes/>
      }
    </div>
  );
}

export default App;
