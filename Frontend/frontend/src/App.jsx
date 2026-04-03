import Chat from "./components/Chat";
import Form from "./components/Form";
import "./App.css";

function App() {
  return (
    <div>
      <h1>🏥 Mini Healthcare Support App</h1>

      {/* ✅ Form Section */}
      <Form />

      {/* ✅ AI Chat Section */}
      <Chat />
    </div>
  );
}

export default App;