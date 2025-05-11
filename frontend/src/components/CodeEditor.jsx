import { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ solution, onCodeChange }) => {
  const [language, setLanguage] = useState('html');
  const [code, setCode] = useState(solution);
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
    <div style={{ padding: '1rem', backgroundColor: '#fdfdfd' }}>
      <div style={{ marginBottom: '10px' }}>
        <label
          htmlFor="lang"
          style={{ marginRight: '10px', fontWeight: 'bold' }}
        >
          Select Language:
        </label>
        <select
          id="lang"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{
            padding: '5px 10px',
            border: '1px solid #1e88e5',
            borderRadius: '4px',
            color: '#1e88e5',
            fontWeight: '500',
          }}
        >
          <option value="html">HTML</option>
          <option value="javascript">JavaScript</option>
          <option value="css">CSS</option>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
        </select>
        <button
          onClick={handleRun}
          style={{
            marginLeft: '15px',
            backgroundColor: '#1e88e5',
            color: 'white',
            padding: '6px 16px',
            border: 'none',
            borderRadius: '4px',
            fontWeight: '500',
            cursor: 'pointer',
          }}
        >
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
            border: '2px solid #1e88e5',
            borderRadius: '4px',
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
            borderRadius: '4px',
            border: '2px solid #1e88e5',
          }}
        >
          {output}
        </pre>
      )}
    </div>
  );
};

export default CodeEditor;
