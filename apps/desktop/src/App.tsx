import { useState } from "react";
import Editor from "@monaco-editor/react";

declare global {
  interface Window {
    api: any;
  }
}

function App() {
  const [files, setFiles] = useState<any[]>([]);
  const [code, setCode] = useState("// ErrorLens 🚀");

  const openFolder = async () => {
    const result = await window.api.openFolder();
    setFiles(result);
  };

  const openFile = async (file: any) => {
    const content = await window.api.readFile(file.path);
    setCode(content);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* Sidebar */}
      <div style={{ width: "250px", background: "#1e1e1e", color: "white" }}>
        <button onClick={openFolder}>Open Folder</button>

        {files.map((file, i) => (
          <div key={i} onClick={() => openFile(file)}>
            {file.name}
          </div>
        ))}
      </div>

      {/* Editor */}
      <div style={{ flex: 1 }}>
        <Editor
          height="100%"
          defaultLanguage="javascript"
          value={code}
          onChange={(val) => setCode(val || "")}
        />
      </div>
    </div>
  );
}

export default App;