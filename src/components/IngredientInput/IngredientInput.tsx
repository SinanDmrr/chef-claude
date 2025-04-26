import "./IngredientInput.scss";
import addToList from "../../assets/img/add-to-list.png";
import {useRef, useState} from "react";

function IngredientInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [ingredients, setIngredients] = useState<string[]>([]); // React Use-State für ingredients

  function addIngredient(e: React.FormEvent) {
    // Innerhalb vom <from> erhalten die Button den Type "Submit" womit die seite neu geladen wird weil ein GET / POST Request gestartet wird
    // um das zu verhindern kann man den Button Type auf "Button" setzen wodurch man aber nicht mehr per ENTER Inputinhalte senden kann.
    // Um trotzdem per ENTER die NATIVE FORM Funktion bei zu behalten nutzt man "preventDefault()" hier für muss ein React.FormEvent erstellt werden als Parameter
    e.preventDefault();
    if (inputRef.current && inputRef.current.value != "") {
      const inputValue = inputRef.current.value.trim();
      setIngredients([...ingredients, inputValue]); // Fügt die neue Zutat zum State hinzu
      inputRef.current.value = "";
    }
  }

  function deleteIngredient(indexToDelete: number) {
    setIngredients(ingredients.filter((_, index) => index !== indexToDelete)); // Entfernt die Zutat am angegebenen Index
  }

  return (
    <div id="main">
      <form id="input-section">
        <input
          ref={inputRef}
          id="ingredientInput"
          type="text"
          placeholder="z.B. Salz, Mehl, Milch"
        />
        <button onClick={addIngredient} type="submit">
          <img src={addToList} alt="Hinzufügen Icon" />
          <p>Hinzufügen</p>
        </button>
      </form>
      <div id="ingredients">
        <ul id="ingredientsList">
          <h2>Vorhandene Zutaten:</h2>
          {ingredients.map((ingredient, index) => (
            <div>
              <li key={index}>
                {ingredient}{" "}
                <button onClick={() => deleteIngredient(index)}>X</button>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default IngredientInput;
