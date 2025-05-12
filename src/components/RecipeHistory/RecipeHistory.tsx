import {getRecipeHistory, Recipe} from "../../localStorage";
import "./RecipeHistory.scss";

interface RecipeHistoryProps {
  onSelectRecipe: (recipe: string) => void;
}

function RecipeHistory({onSelectRecipe}: RecipeHistoryProps) {
  const recipes = getRecipeHistory();

  if (recipes.length === 0) {
    return null;
  }

  return (
    <div id="recipe-history">
      <h2>Frühere Rezepte:</h2>
      <ul>
        {recipes.map((recipe: Recipe, index: number) => (
          <li key={index}>
            <button
              className="recipe-title"
              onClick={() => onSelectRecipe(recipe.content)}>
              {recipe.title},
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeHistory;
