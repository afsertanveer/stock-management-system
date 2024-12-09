import "./App.css";
import Menu from "./common/Menu";

function App() {
  return (
    <>
      <div className="grid grid-cols-4">
        <Menu />
        <div className="col-span-3 h-screen flex justify-center items-center">
          <div className="">
            <h1 className="text-6xl font-bold text-red-950">
              Welcome To The Demo
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
