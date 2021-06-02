import React from 'react';
import Editor from './components/Editor/Editor';

function App() {
  return (
    <div className="App">
      <h1>우아한 테크러닝</h1>
      {/* <div contentEditable="true"><b>안녕하세요</b> 저는 양채훈입니다.</div> */}
      <Editor />
    </div>
  );
}

export default App;
