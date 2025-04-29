import "./IngredientInput.scss";
import addToList from "../../assets/img/add-to-list.png";
// Wenn man im Form das Action nutzt dann braucht man kein FormEvent mehr
// import {FormEvent, useRef, useState} from "react";
import {useRef, useState} from "react";

function IngredientInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [ingredients, setIngredients] = useState<string[]>([]);

  // Veraltet seit React19: Wenn man im Form das Action wie React19 Like nutzt dann braucht man handleSubmit und addIngredient nicht mehr
  // function handleSubmit(event: FormEvent) {
  //   event.preventDefault();
  //   const targetForm = event.currentTarget as HTMLFormElement;
  //   // Dadurch das man das ganze Formevent hier erhält kann man auch die Werte z.B. von Inputfeldern anhand des name-attributes auslesen
  //   // Beispiel:
  //   // const formData = new FormData(targetForm);
  //   // console.log(formData.get("ingredient"));

  //   if (inputRef.current) {
  //     targetForm.reset();
  //   }
  // }

  // function addIngredient() {
  //   if (inputRef.current && inputRef.current.value != "") {
  //     const inputValue = inputRef.current.value.trim();
  //     setIngredients([...ingredients, inputValue]);
  //   }
  // }

  // Mit React19 (5.Dez.2024) kann man dem action attribut vom Form Element eine Funktion geben was ausgelöst wir beim submit
  // Dadurch kann man sich addIngredient() sparen und direkt im handleSubmitAction alles ausführen
  function handleSubmitAction(formData: FormData) {
    const ingredient = (formData.get("ingredient") as string).trim();
    if (ingredient != "") {
      setIngredients([...ingredients, ingredient]);
    }
  }

  function deleteIngredient(indexToDelete: number) {
    setIngredients(ingredients.filter((_, index) => index !== indexToDelete));
  }

  const ingredientsList = ingredients.map((ingredient, index) => (
    <li key={index}>
      <div id="li-btn-container">
        <span>{ingredient}</span>
        <button onClick={() => deleteIngredient(index)}>X</button>
      </div>
    </li>
  ));

  return (
    <div id="main">
      {/* <form id="input-section" onSubmit={handleSubmit} method="POST"> */}
      <form id="input-section" action={handleSubmitAction}>
        <input
          ref={inputRef}
          id="ingredientInput"
          type="text"
          placeholder="z.B. Salz, Mehl, Milch"
          name="ingredient"
        />
        {/* Mit action im Form kein onclick mehr nötig */}
        {/* <button onClick={addIngredient}> */}
        <button type="submit">
          <img src={addToList} alt="Hinzufügen Icon" />
          <p>Hinzufügen</p>
        </button>
      </form>
      <div id="ingredients">
        <h2>Vorhandene Zutaten:</h2>
        <ul id="ingredientsList">{ingredientsList}</ul>
      </div>
    </div>
  );
}

export default IngredientInput;
