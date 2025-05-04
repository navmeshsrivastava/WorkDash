import React, { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ onCodeChange }) => {
  const [language, setLanguage] = useState('html');
  const [code, setCode] = useState('<!-- Write code here -->');
  const [output, setOutput] = useState('');
  const iframeRef = useRef(null);

  const handleCodeChange = (value) => {
    setCode(value || '');
    onCodeChange(value);
  };

  const handleRun = () => {
    if (language === 'html') {
      iframeRef.current.srcdoc = code;
    } else {
      setOutput(`Running ${language} code...\n\n${code}`);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="lang" style={{ marginRight: '10px' }}>
          Select Language:
        </label>
        <select
          id="lang"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="html">HTML</option>
          <option value="javascript">JavaScript</option>
          <option value="css">CSS</option>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
        </select>
        <button onClick={handleRun} style={{ marginLeft: '15px' }}>
          ▶ Run Code
        </button>
      </div>

      <Editor
        height="300px"
        language={language}
        value={code}
        onChange={handleCodeChange}
        theme="vs-dark"
      />

      {language === 'html' ? (
        <iframe
          ref={iframeRef}
          sandbox="allow-scripts"
          title="Live Preview"
          style={{
            marginTop: '20px',
            width: '100%',
            height: '300px',
            border: '1px solid #ccc',
          }}
        />
      ) : (
        <pre
          style={{
            marginTop: '20px',
            backgroundColor: '#1e1e1e',
            color: 'white',
            padding: '10px',
            height: '300px',
            overflow: 'auto',
          }}
        >
          {output}
        </pre>
      )}
    </div>
  );
};

export default CodeEditor;
