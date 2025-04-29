import "./Header.scss";
import chefClaude from "../../assets/img/chefClaude.png";

function Header() {
  return (
    <div id="header">
      <img src={chefClaude} alt="chef claude logo" />
      <h1>Rezeptomat</h1>
      <img src={chefClaude} alt="chef claude logo" />
    </div>
  );
}

export default Header;
