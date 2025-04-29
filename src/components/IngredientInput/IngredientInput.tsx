import "./IngredientInput.scss";
import addToList from "../../assets/img/add-to-list.png";
import {useRef, useState} from "react";
import IngredientList from "../IngredientList/IngredientList";

function IngredientInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [ingredients, setIngredients] = useState<string[]>([]);

  // Mit React19 (5.Dez.2024) kann man dem action attribut vom Form Element eine Funktion geben was ausgelöst wir beim submit
  // Vor React19 musste man über onSubmit das Event vom Form abfangen und über diesen dann currentTarget nehmen und über diesen an die Name Values ran
  function handleSubmitAction(formData: FormData) {
    const ingredient = (formData.get("ingredient") as string).trim();
    if (ingredient != "") {
      setIngredients([...ingredients, ingredient]);
    }
  }
  return (
    <div id="main">
      <form id="input-section" action={handleSubmitAction}>
        <input
          ref={inputRef}
          id="ingredientInput"
          type="text"
          placeholder="z.B. Salz, Mehl, Milch"
          name="ingredient"
        />
        <button type="submit">
          <img src={addToList} alt="Hinzufügen Icon" />
          <p>Hinzufügen</p>
        </button>
      </form>
      <IngredientList
        ingredients={ingredients}
        setIngredients={setIngredients}
      />
    </div>
  );
}

export default IngredientInput;
