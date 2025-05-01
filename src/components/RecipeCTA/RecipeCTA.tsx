import "./RecipeCTA.scss";

interface RecipeCTAProps {
  ingredients: string[];
}

function RecipeCTA({ingredients}: RecipeCTAProps) {
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
        <div className="get-recipe-container">
          <div>
            <h3>Fast geschafft!</h3>
            <p>Mit dem Klick auf den Button erstellen wir dir dein Rezept</p>
          </div>
          <button>Gib mir mein Rezept</button>
        </div>
      );
    }
  }

  return getDiv();
}

export default RecipeCTA;
