import "./header.scss";
import chefClaude from "../../assets/img/chefClaude.png";

export default function Header() {
  return (
    <div id="header">
      <img src={chefClaude} alt="chef claude logo" />
      <h1>Chef Claude</h1>
    </div>
  );
}
