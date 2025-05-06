import {useState} from "react";
import "./RecipeCTA.scss";

interface RecipeCTAProps {
  ingredients: string[];
}

function RecipeCTA({ingredients}: RecipeCTAProps) {
  const [isShown, setIsShown] = useState<boolean>(false);

  function toggleRecipe() {
    const apiKey = import.meta.env.VITE_HF_API_KEY;
    if (!apiKey) {
      console.error(
        "API-Schlüssel nicht gefunden. Bitte setze deinen API Key in die Umgebungsvariable VITE_HF_API_KEY in der .env-Datei ein."
      );
      return;
    } else {
      setIsShown((prev) => !prev);
    }
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
            <button onClick={toggleRecipe}>Gib mir mein Rezept</button>
          </div>
        </div>
      );
    }
  }

  return (
    <>
      {getDiv()}
      {isShown && (
        <section>
          <h2>Der Rezeptomat empfiehlt:</h2>
          <article className="suggested-recipe-container" aria-live="polite">
            <p>
              Ausgehend von den Zutaten, die Sie zur Verfügung haben, würde ich
              empfehlen ein einfaches und leckeres{" "}
              <strong>Beef Bolognese Pasta</strong>. Hier ist dein Rezept:
            </p>
            <h3>Beef Bolognese Pasta</h3>
            <strong>Zutaten:</strong>
            <ul>
              <li>1 kg Rinderhackfleisch</li>
              <li>1 Zwiebel, gewürfelt</li>
              <li>3 Knoblauchzehen, gehackt</li>
              <li>2 Esslöffel Tomatenmark</li>
              <li>1 Dose stückige Tomaten</li>
              <li>1 Tasse Rinderbrühe</li>
              <li>1 Teelöffel getrockneter Oregano</li>
              <li>1 Teelöffel getrocknetes Basilikum</li>
              <li>Salz und Pfeffer nach Geschmack</li>
              <li>
                8 oz Pasta nach Wahl (z. B. Spaghetti, Penne oder Linguine)
              </li>
            </ul>
            <strong>Anleitung:</strong>
            <ol>
              <li>
                Einen großen Topf mit Salzwasser für die Pasta zum Kochen
                bringen.
              </li>
              <li>
                In einer großen Pfanne oder einem Schmortopf das
                Rinderhackfleisch bei mittlerer bis hoher Hitze anbraten, mit
                einem Holzlöffel zerkleinern, bis es durchgebraten und gebräunt
                ist, etwa 5-7 Minuten.
              </li>
              <li>
                Die gewürfelte Zwiebel und den gehackten Knoblauch in die Pfanne
                geben und 2-3 Minuten braten, bis die Zwiebel glasig ist.
              </li>
              <li>Das Tomatenmark einrühren und 1 Minute mitbraten.</li>
              <li>
                Die stückigen Tomaten, die Rinderbrühe, den Oregano und das
                Basilikum hinzufügen. Mit Salz und Pfeffer nach Geschmack
                würzen.
              </li>
              <li>
                Die Hitze reduzieren und die Sauce 15-20 Minuten köcheln lassen,
                gelegentlich umrühren, damit sich die Aromen verbinden.
              </li>
              <li>
                Während die Sauce köchelt, die Pasta nach Packungsanweisung
                kochen. Die Pasta abgießen und zurück in den Topf geben.
              </li>
              <li>
                Die Bolognese-Sauce zur gekochten Pasta geben und gut vermengen.
              </li>
              <li>
                Heiß servieren, nach Wunsch mit frischem Basilikum oder
                geriebenem Parmesan garnieren.
              </li>
            </ol>
          </article>
        </section>
      )}
    </>
  );
}

export default RecipeCTA;
