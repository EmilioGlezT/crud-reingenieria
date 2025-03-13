function Home() {
  console.log("🏠 Home se está renderizando");

  return (
    <div style={{ padding: "20px", background: "#f8f9fa", border: "1px solid black" }}>
      <h1 style={{ color: "black" }}>Bienvenido al CRUD</h1>
      <p style={{ color: "black" }}>Selecciona una opción del menú.</p>
    </div>
  );
}

export default Home;