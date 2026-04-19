import Contact from "./components/Contact";
import Experience from "./components/Experience";
import HeaderLeft from "./components/HeaderLeft";
import Home from "./components/Home";
import Projects from "./components/Projects";

function App() {
  return (
    <div className="w-full subpixel-antialiased">
      <HeaderLeft />
      <main className="w-full">
        <Home />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

export default App;
