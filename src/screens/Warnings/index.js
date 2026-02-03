import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Warnings() {

const location = useLocation();
const fileId = location.state?.file_id;
const result = location.state?.result;
const navigate = useNavigate();
const warnings = Array.isArray(result?.warnings) ? result.warnings : [];
const [acknowledged, setAcknowledged] = useState(false);

const goToPreview = () => {
  navigate("/preview", { state: { file_id: fileId, result } });
};

  return (
    <div>
      <h1>Warnings</h1>

      {warnings.length === 0 && (
  <div>
    Aucun avertissement détecté.
  </div>
)}

      {warnings.length > 0 && (
  <>
    <div>
      [X] avertissement(s) détecté(s).
    </div>

      <div>
        Ces éléments ne bloquent pas l'export.
      </div>

      <div>
        Avertissement 1/X : [Type]
      </div>

      <div>
        [Détail factuel]
      </div>

      <div>
        Feature concerné : [ID ou index]
      </div>

      <div>
        [Mesure ou valeur si applicable]
      </div>

      <div>
  <input
    type="checkbox"
    checked={acknowledged}
    onChange={(e) => setAcknowledged(e.target.checked)}
  />
  J'ai pris connaissance de ces avertissements
</div>

      <div
  onClick={acknowledged ? goToPreview : undefined}
  style={{ opacity: acknowledged ? 1 : 0.5 }}
>
  Continuer
</div>

      <div>
        Corriger le fichier
      </div>

            <div>
        Taille du fichier : [X] MB
      </div>
      <div>
        Limite TRACES documentée : 25 MB
      </div>
      <div>
        Le fichier dépasse 25 MB.
      </div>

      <div>
        Chevauchement détecté.
      </div>
      <div>
        Features concernés : [ID1] et [ID2]
      </div>
      <div>
        Surface de chevauchement : [X] m²
      </div>

      <div>
        Surface inférieure à 1 m².
      </div>
      <div>
        Feature concerné : [ID]
      </div>
      <div>
        Surface : [X] m²
      </div>

      <div>
        Ratio longueur/largeur élevé.
      </div>
      <div>
        Feature concerné : [ID]
      </div>
      <div>
        Ratio : [X]
      </div>
  </>
)}
    </div>
  );
}
