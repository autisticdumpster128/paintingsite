import { PiInstagramLogo, PiHandbag } from "react-icons/pi";


function Header(props: {
  cartCount: number;
  onCartClick:()=> void
}) {

  return (
    <header className="header">
      <a
        href="https://instagram.com/autisticdumpster128"
        target="_blank"
        rel="noreferrer"
        aria-label="Instagram"
      >
        <PiInstagramLogo />
      </a>
      <button aria-label="Cart"
        onClick={props.onCartClick}>
        <PiHandbag />
        {props.cartCount}
      </button>
    </header>
  );
}

export default Header