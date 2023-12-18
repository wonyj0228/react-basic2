// import Button from './Button';
// import styles from './UseEffect.module.css';
import { useState, useEffect } from 'react';

// unmount
// 컴포넌트가 destroyed. 화면에서 사라지면서 분석 결과를 API로 보내는 그런 케이스도 있음.
// return 으로 function
function Hello() {
  // 1. 함수 표현식
  useEffect(() => {
    console.log('hi :)');
    return () => {
      console.log('bye :(');
    };
  }, []);

  // 2. 함수 선언식
  useEffect(function () {
    console.log('hi :)');
    return function () {
      console.log('bye :(');
    };
  }, []);

  return <h1>Hello</h1>;
}

// useEffect : 컴포넌트의 LifeCycle을 관리하는 hook
// useEffect(fnc, depth) => function은 실행할 코드, depth는 array

// 1. 컴포넌트 첫 렌더 후 한 번만 실행하고 싶은 코드가 있을 때
// 2. 컴포넌트가 화면에서 사라질 때 마지믁올 실행하고 싶은 코드가 있을 때
// 3. 컴포넌트의 props나 state가 변경되어 rerender가 발생할 때 넣고싶은 코드가 있을 때 -> 컴포넌트 내부의 특정코드를 변화가 있을 때만 실행시키고 싶을 때

// useMemo는 props의 변경되지 않았음에도 rerender가 발생하는 상황을 막는 것. useEffect와는 다름.
function App() {
  const [counter, setCounter] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [showing, setShowing] = useState(false);

  const onClick = () => setCounter((prev) => prev + 1);
  const onChange = (e) => setKeyword(e.target.value);
  const btnShow = () => setShowing((prev) => !prev);

  // mount
  useEffect(() => {
    console.log('I run only once.');
  }, []);

  // update
  useEffect(() => {
    if (keyword !== '' && keyword.length > 5) {
      console.log('I run when keyword changes : ', keyword); // counter 버튼을 클릭했을 때도 search가 진행되는걸 막고, 검색 조건 추가.
    }
  }, [keyword]);
  useEffect(() => {
    console.log('I run when counter changes : ', counter);
  }, [counter]);

  useEffect(() => {
    console.log('I run when keyword & counter changes'); // 변화를 감지할 대상이 2개여도 가능. 둘중에 하나라도 변화가 감지되면 실행됨.
  }, [keyword, counter]);

  return (
    <div>
      <input
        value={keyword}
        onChange={onChange}
        type="text"
        placeholder="Search here..."
      />

      <h1>{counter}</h1>
      <button onClick={onClick}>Click me</button>
      {showing ? <Hello /> : null}
      <button onClick={btnShow}>{showing ? 'Hide' : 'Show'}</button>
    </div>
  );

  // 버튼에 스타일 넣는 모듈화
  // return (
  //   <div>
  //
  //     <div className={styles.border}>
  //       <h3>5.0 button style module</h3>
  //       <Button text={'Continue'} />
  //     </div>
  //   </div>
  // );
}

export default App;
