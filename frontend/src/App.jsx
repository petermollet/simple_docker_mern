import axios from "axios";
import React from "react";

const apiBackEnd = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

const App = () => {
  const [state, setState] = React.useState();

  React.useEffect(() => {
    apiBackEnd.get("/api/hello").then((res) => {
      console.log(res);
      setState(res.data);
    });
  }, []);

  if (!state) return <div>Loading...</div>;
  return (
    <div>
      <h1>{state}</h1>
    </div>
  );
};

export default App;
