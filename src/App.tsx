import { Outlet } from "react-router";
import { Button } from "./components/ui/button";


const App = () => {
  return (
    <div>
      <h1>App Main File</h1>
      <Button>Shadcn Button</Button>
      <Outlet />
    </div>
  );
};

export default App;