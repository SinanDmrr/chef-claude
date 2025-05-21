import {useState, useEffect} from "react";
import "./RecipeCTA.scss";
import ReactMarkdown from "react-markdown";
import {getRecipeFromChefClaude} from "../../../ai";
import {saveRecipeToHistory} from "../../localStorage";

interface RecipeCTAProps {
  ingredients: string[];
  selectedRecipe: string;
  clearIngredients: () => void;
}

function RecipeCTA({
  ingredients,
  selectedRecipe,
  clearIngredients,
}: RecipeCTAProps) {
  const [hasRequestedRecipe, setHasRequestedRecipe] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [recipeMarkdown, setRecipeMarkdown] = useState<string>("");
  const [recipeTitle, setRecipeTitle] = useState<string>("");

  useEffect(() => {
    if (selectedRecipe) {
      setHasRequestedRecipe(true);
      const firstParagraphMatch = selectedRecipe.match(/^[^#]*?(?=\n\n|$)/);
      const firstParagraph = firstParagraphMatch
        ? firstParagraphMatch[0].trim()
        : "";
      const cleanedMarkdown = selectedRecipe.replace(/^[^#]*?\n\n/, "");
      setRecipeTitle(firstParagraph);
      setRecipeMarkdown(cleanedMarkdown);
    }
  }, [selectedRecipe]);

  async function getRecipe() {
    if (isLoading) return;
    setHasRequestedRecipe(true);
    setIsLoading(true);
    const markdown = await getRecipeFromChefClaude(ingredients);
    const firstParagraphMatch = markdown.match(/^[^#]*?(?=\n\n|$)/);
    const firstParagraph = firstParagraphMatch
      ? firstParagraphMatch[0].trim()
      : "";
    const cleanedMarkdown = markdown.replace(/^[^#]*?\n\n/, "");
    setRecipeTitle(firstParagraph);
    setRecipeMarkdown(cleanedMarkdown);
    saveRecipeToHistory(markdown);
    clearIngredients();
    setIsLoading(false);
  }

  function getDiv() {
    if (ingredients.length < 3) {
      return (
        <div className="get-recipe-container">
          <div>
            <h3>Bereit für dein Rezept?</h3>
            <p>
              Bitte gebe zuerst mindestens 3 Zutaten an, damit wir dir das
              perfekte Rezept raussuchen können.
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div id="main-recipe">
          <div className="get-recipe-container">
            <div>
              <h3>Fast geschafft!</h3>
              <p>Mit dem Klick auf den Button erstellen wir dir dein Rezept</p>
            </div>
            <button onClick={getRecipe} disabled={isLoading}>
              {isLoading ? "Rezept wird geladen..." : "Gib mir mein Rezept"}
            </button>
          </div>
        </div>
      );
    }
  }

  console.log(recipeMarkdown);
  return (
    <>
      {getDiv()}
      {hasRequestedRecipe && (
        <section>
          {isLoading ? (
            <>
              <h2>Rezeptomat ist am Nachdenken, einen Moment bitte…</h2>
              <div className="loader"></div>
            </>
          ) : (
            <>
              <h2>{recipeTitle || "Der Rezeptomat empfiehlt:"}</h2>
              <br />
              <article
                className="suggested-recipe-container"
                aria-live="polite">
                <ReactMarkdown>{recipeMarkdown}</ReactMarkdown>
              </article>
            </>
          )}
        </section>
      )}
    </>
  );
}

export default RecipeCTA;
