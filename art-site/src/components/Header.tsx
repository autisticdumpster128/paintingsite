import { PiInstagramLogo, PiHandbag } from "react-icons/pi";


function Header(){
    return(
        <header className="header">
            <a 
            href="https://instagram.com/autisticdumpster128" 
            target="_blank" 
            rel="noreferrer"
            aria-label="Instagram"
            >
             <PiInstagramLogo />
      </a>
      <button aria-label="Cart">
        <PiHandbag/>
      </button>
    </header>
  );
}

export default Header