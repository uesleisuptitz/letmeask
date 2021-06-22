import { Home, NewRoom } from "./pages";
import { BrowserRouter, Route } from "react-router-dom";
import { AuthProvider } from "./context";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" component={NewRoom} />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
