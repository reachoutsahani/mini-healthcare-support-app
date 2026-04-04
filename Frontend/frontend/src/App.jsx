import Chat from "./components/Chat";
import Form from "./components/Form";
import "./App.css";

function App() {
  return (
    <div className="container">
      
      {/* 🔥 Header */}
      <h1>🏥 Mini Healthcare Support App</h1>

      {/* 🔥 Layout Wrapper */}
      <div className="main-layout">
        
        {/* ✅ Form Section */}
        <div className="section">
          <Form />
        </div>

        {/* ✅ Chat Section */}
        <div className="section">
          <Chat />
        </div>

      </div>
    </div>
  );
}

export default App;