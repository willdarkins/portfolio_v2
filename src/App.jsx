function App() {

  return (
    <>
      <div className="flex min-h-screen w-full subpixel-antialiased">
        <HeaderLeft />
        <main className="flex-3">
          <Home />
          <Experience />
          <Projects />
          <Contact />
        </main>
      </div>
    </>
  )
}

export default App
