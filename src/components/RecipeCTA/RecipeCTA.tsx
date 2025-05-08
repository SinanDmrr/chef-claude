import {useState} from "react";
import "./RecipeCTA.scss";
import ReactMarkdown from "react-markdown";
import {getRecipeFromChefClaude} from "../../../ai";

interface RecipeCTAProps {
  ingredients: string[];
}

function RecipeCTA({ingredients}: RecipeCTAProps) {
  const [hasRequestedRecipe, setHasRequestedRecipe] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [recipeMarkdown, setRecipeMarkdown] = useState<string>("");

  async function getRecipe() {
    if (isLoading) {
      return;
    }
    setHasRequestedRecipe(true);
    setIsLoading(true);
    const markdown = await getRecipeFromChefClaude(ingredients);
    setRecipeMarkdown(markdown);
    setIsLoading(false);
  }

  function getDiv() {
    if (ingredients.length < 3) {
      return (
        <div className="get-recipe-container">
          <div>
            <h3>Bereit für dein Rezept?</h3>
            <p>
              Bitte gebe zu erst mindestens 3 Zutaten an, damit wir dir das
              Perfekte Rezept raus suchen können.
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
              <h2>Der Rezeptomat empfiehlt:</h2>
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
