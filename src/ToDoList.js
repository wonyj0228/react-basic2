import React, { useState } from 'react';

function ToDoList() {
  const [toDo, setToDo] = useState('');
  const [toDos, setToDos] = useState([]);

  const onChange = (e) => setToDo(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    if (toDo === '') {
      return;
    }
    setToDos((curArr) => [toDo, ...curArr]);
    setToDo('');
  };
  const onClick = (idx) => {
    setToDos((curArr) => curArr.filter((_, i) => i !== idx));
  };

  return (
    <div>
      <h1>My To Dos ({toDos.length})</h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={toDo}
          type="text"
          placeholder="Write your to do..."
        />
        <button>Add To Do</button>
      </form>
      <hr></hr>
      <ul>
        {toDos.map((item, idx) => (
          <li key={idx}>
            {item}
            <button onClick={() => onClick(idx)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
