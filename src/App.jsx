import { RouterProvider } from "react-router-dom";
import { router } from "@/router/index.jsx";

// Layout Components
function App() {
  return <RouterProvider router={router} />;
}
export default App;