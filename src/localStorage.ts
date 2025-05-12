export interface Recipe {
  title: string;
  content: string;
}

export function saveRecipeToHistory(recipe: string) {
  let title = "Rezept ohne Titel";
  const titleMatch = recipe.match(/^## (.+)$/m);
  if (titleMatch) {
    title = titleMatch[1].trim();
  } else {
    const firstLine = recipe.split("\n")[0].trim();
    if (firstLine && !firstLine.startsWith("#")) {
      title =
        firstLine.length > 20 ? firstLine.substring(0, 20) + "..." : firstLine;
    } else {
      title = `Rezept ${new Date().toLocaleDateString()}`;
    }
  }
  const newRecipe: Recipe = {title, content: recipe};

  const history = getRecipeHistory();
  history.unshift(newRecipe);
  if (history.length > 3) {
    history.pop();
  }
  localStorage.setItem("recipeHistory", JSON.stringify(history));
}

export function getRecipeHistory(): Recipe[] {
  const history = localStorage.getItem("recipeHistory");
  return history ? JSON.parse(history) : [];
}
