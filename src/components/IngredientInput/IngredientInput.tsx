import "./IngredientInput.scss";
import addToList from "../../assets/img/add-to-list.png";

function IngredientInput() {
  return (
    <div id="input-section">
      <input type="text" placeholder="z.B. Salz, Mehl, Milch" />
      <button>
        <img src={addToList} alt="" />
        <p>Hinzufügen</p>
      </button>
    </div>
  );
}

export default IngredientInput;
