import { AdminRoom, Home, NewRoom, Room } from "./pages";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./context";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />
          <Route path="/admin/rooms/:id" component={AdminRoom} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
