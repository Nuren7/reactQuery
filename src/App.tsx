import Card from "./Card";
import { Suspense } from "react";

function App() {
  return (
    <>
      <Suspense fallback={<img src="/x"/>}>
        <Card />
      </Suspense>
    </>
  );
}

export default App;
