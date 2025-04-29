import "./IngredientList.scss";

interface IngredientListProps {
  ingredients: string[];
  setIngredients: (newIngredients: string[]) => void;
}

function IngredientList({ingredients, setIngredients}: IngredientListProps) {
  function deleteIngredient(indexToDelete: number) {
    // .filter braucht 2 Parameter 1.Element 2.Index da wir das Element also die Zutat an index 0,1,2 usw. nicht brauchen bietet JS und TS
    // den Platzhalter "_" an was sagt hier muss eigentlich ein Parameter sein aber ich brauche den nicht. Man könnte auch Zutat oder Item oder
    // so hin geschreiben aber dann wird es Gelb unterkringelt, weil TS meckert das die Variable nie genutzt wird obwohl sie Deklariert wird.
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
    <div id="ingredients">
      <h2>Vorhandene Zutaten:</h2>
      <ul id="ingredientsList">{ingredientsList}</ul>
    </div>
  );
}

export default IngredientList;
