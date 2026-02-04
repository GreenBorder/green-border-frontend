import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Validation() {

  const location = useLocation();
  const fileId = location.state?.file_id;
  const [result, setResult] = useState(null);
  const [blockingErrors, setBlockingErrors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  if (!fileId) return;

  const runValidation = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/validate/${fileId}`,
      { method: "POST" }
    );

    // CAS BLOQUANT — HTTP 422
    if (response.status === 422) {
      const data = await response.json();
      setBlockingErrors(Array.isArray(data) ? data : [data]);
      return;
    }

    // AUTRES ERREURS
    if (!response.ok) {
      throw new Error("validation_failed");
    }

    // CAS OK — HTTP 200
    const data = await response.json();
    setResult(data);
    setBlockingErrors([]);
  } catch (err) {
    // rien ici volontairement
  }
};

  runValidation();
}, [fileId]);

  useEffect(() => {
  if (!result) return;

  const hasWarnings =
    Array.isArray(result.warnings) && result.warnings.length > 0;

  if (hasWarnings) {
    navigate("/warnings", { state: { file_id: fileId, result } });
  } else {
    navigate("/preview", { state: { file_id: fileId, result } });
  }
  }, [result, fileId, navigate]);

  return (
    <div>
      <h1>Validation</h1>

      <div>
        Vérification du fichier
      </div>

      <div>
        Contrôles techniques en cours
      </div>

      <div>
        Barre de progression : [0-100%]
      </div>

      <div>
        Étape actuelle : [nom du contrôle]
      </div>

      <div>
        □ Format JSON
      </div>
      <div>
        □ Structure GeoJSON
      </div>
      <div>
        □ Types de géométries
      </div>
      <div>
        □ Fermeture des polygones
      </div>
      <div>
        □ Intersections
      </div>
      <div>
        □ Orientation des anneaux
      </div>
      <div>
        □ Coordonnées valides
      </div>
      <div>
        □ Système de coordonnées
      </div>

      <div>
        Contrôles techniques terminés.
      </div>

      <div>
        [X] parcelles vérifiées.
      </div>

      <div>
        Contrôles techniques non passés.
      </div>

    {blockingErrors.length > 0 && (
  <>
    <div>
      Contrôles techniques non passés.
    </div>

    <div>
      {blockingErrors.length} anomalie(s) bloquante(s) détectée(s).
    </div>

    {blockingErrors.map((err, index) => (
      <div key={index}>
        <div>{err.message}</div>
        {err.feature_id && (
          <div>Feature concerné : {err.feature_id}</div>
        )}
      </div>
    ))}
  </>
)}

    </div>
  );
}
