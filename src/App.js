import Button from './Button';
import styles from './App.module.css';
import { useState, useEffect } from 'react';

function App() {
  const [counter, setCounter] = useState(0);
  const onClick = () => setCounter((prev) => prev + 1);

  console.log('i run all the time');
  const iRunOnlyOnce = () => {
    console.log('i run only once.');
  };
  useEffect(iRunOnlyOnce, []);

  return (
    <div>
      <h1 className={styles.title}>Welcome!</h1>

      {/* 버튼에 스타일 넣는 것 모듈화 */}
      <div className={styles.border}>
        <h3>5.0 button style module</h3>
        <Button text={'Continue'} />
      </div>

      <div className={styles.border}>
        <h3>6.0</h3>
        <h4>{counter}</h4>
        <button onClick={onClick}>Click me</button>
      </div>
    </div>
  );
}

export default App;
