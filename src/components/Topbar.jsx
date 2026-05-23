import logo from "../assets/logo.png";
export default function Topbar() {
  return (
    <header className="topbar">
      <div className="brand"><img src={logo} alt="Power Coating Logo" /></div>
      <nav>
        <a href="#work">WORK</a>
        <a href="#services">SERVICES</a>
        <a href="#about">ABOUT</a>
        <a href="#process">PROCESS</a>
        <a href="#contact">CONTACT</a>
      </nav>
      <div className="location"><button>Get a quote</button></div>
    </header>
  );
}