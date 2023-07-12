import routes from "./routes";
import { useRoutes } from "react-router";

function App() {
  const appRoutes = useRoutes(routes());

  return appRoutes;
}

export default App;
