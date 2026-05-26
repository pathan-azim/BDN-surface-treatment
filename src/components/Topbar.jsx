import logo from "../assets/logo.png";
export default function Topbar() {
  return (
    <header className="topbar">
      <div className="brand"><img src={logo} alt="Power Coating Logo" /></div>
      <nav className="navbtns">
        <h4><a href="#work">WORK</a></h4>
        <h4><a href="#services">SERVICES</a></h4>
        <h4><a href="#about">ABOUT</a></h4>
        <h4><a href="#process">PROCESS</a></h4>
        <h4><a href="#contact">CONTACT</a></h4>
      </nav>
      <div className="location"><button>Get a quote</button></div>
    </header>
  );
}