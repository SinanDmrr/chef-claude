import "./IngredientInput.scss";
import addToList from "../../assets/img/add-to-list.png";
import {useRef, useState, useEffect} from "react";
import IngredientList from "../IngredientList/IngredientList";
import RecipeCTA from "../RecipeCTA/RecipeCTA";
import RecipeHistory from "../RecipeHistory/RecipeHistory";

function IngredientInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const recipeSectionRef = useRef<HTMLDivElement>(null);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<string>("");
  const [recipeHistoryKey, setRecipeHistoryKey] = useState(0);

  useEffect(() => {
    const handleStorageChange = () => setRecipeHistoryKey((prev) => prev + 1);
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  function handleSubmitAction(formData: FormData) {
    const ingredient = (formData.get("ingredient") as string).trim();

    if (ingredient !== "") {
      const capitalizedIngredient =
        ingredient[0].toUpperCase() + ingredient.slice(1).toLowerCase();
      setIngredients(
        [...ingredients, capitalizedIngredient].sort((a, b) =>
          a.localeCompare(b)
        )
      );
    }
  }

  useEffect(() => {
    if (selectedRecipe && recipeSectionRef.current) {
      recipeSectionRef.current.scrollIntoView({behavior: "smooth"});
    }
  }, [selectedRecipe]);

  const clearIngredients = () => setIngredients([]);

  return (
    <div id="main">
      <div id="main-content">
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
        <RecipeHistory
          key={recipeHistoryKey}
          onSelectRecipe={setSelectedRecipe}
        />
        <div id="ingredients-list">
          <IngredientList
            ingredients={ingredients}
            setIngredients={setIngredients}
          />
        </div>
        <div id="ingredients-recipe" ref={recipeSectionRef}>
          <RecipeCTA
            ingredients={ingredients}
            selectedRecipe={selectedRecipe}
            clearIngredients={clearIngredients}
          />
        </div>
      </div>
    </div>
  );
}

export default IngredientInput;
