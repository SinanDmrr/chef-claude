import "./IngredientInput.scss";
import addToList from "../../assets/img/add-to-list.png";
import {useRef} from "react";

// Unsauberer Weg (AUßERHALB der IngredientInput Function), deshalb nicht nutzen
// function addIngredient() {
//   const ingredient = document.getElementById("ingredientInput");
//   if (ingredient) {
//     const inputValue = (ingredient as HTMLInputElement).value.trim();
//     console.log("Zutat:", inputValue);
//     (ingredient as HTMLInputElement).value = "";
//   } else {
//     console.error("Input-Element nicht gefunden!");
//   }
//   console.log(ingredient);
// }

function IngredientInput() {
  //Sauberer Weg, deshalb nutzen!
  const inputRef = useRef<HTMLInputElement>(null);
  function addIngredient() {
    if (inputRef.current && inputRef.current.value != "") {
      const inputValue = inputRef.current.value;
      console.log("Zutat:", inputValue.trim());
      inputRef.current.value = "";
    }
  }

  return (
    <div id="input-section">
      <input
        ref={inputRef}
        id="ingredientInput"
        type="text"
        placeholder="z.B. Salz, Mehl, Milch"
      />
      <button onClick={addIngredient}>
        <img src={addToList} alt="Hinzufügen Icon" />
        <p>Hinzufügen</p>
      </button>
    </div>
  );
}

export default IngredientInput;
