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

        if (response.status === 422) {
          const data = await response.json();
          setBlockingErrors(Array.isArray(data) ? data : [data]);
          return;
        }

        if (!response.ok) {
          throw new Error("validation_failed");
        }

        const data = await response.json();
        setResult(data);
        setBlockingErrors([]);
      } catch (err) {
        // volontairement vide
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
    <div style={{ padding: "24px", maxWidth: "720px" }}>
      <h1 style={{ marginBottom: "16px" }}>Validation</h1>

      <div style={{ marginBottom: "16px" }}>
        <button
          onClick={() => navigate(-1)}
          style={{ cursor: "pointer" }}
          onMouseOver={(e) => (e.currentTarget.style.opacity = "0.8")}
          onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Retour
        </button>
      </div>

      <div style={{ marginBottom: "8px" }}>
        Vérification du fichier
      </div>

      <div style={{ marginBottom: "16px" }}>
        Contrôles techniques en cours
      </div>

      <div style={{ marginBottom: "8px" }}>
        Barre de progression : —
      </div>

      <div style={{ marginBottom: "16px" }}>
        Étape actuelle : —
      </div>

      <div style={{ marginBottom: "16px" }}>
        <div>□ Format JSON</div>
        <div>□ Structure GeoJSON</div>
        <div>□ Types de géométries</div>
        <div>□ Fermeture des polygones</div>
        <div>□ Intersections</div>
        <div>□ Orientation des anneaux</div>
        <div>□ Coordonnées valides</div>
        <div>□ Système de coordonnées</div>
      </div>

      <div style={{ marginBottom: "8px" }}>
        Contrôles techniques terminés.
      </div>

      <div style={{ marginBottom: "16px" }}>
        — parcelles vérifiées.
      </div>

      {blockingErrors.length > 0 && (
        <div style={{ marginTop: "24px" }}>
          <div style={{ marginBottom: "8px" }}>
            Contrôles techniques non passés.
          </div>

          <div style={{ marginBottom: "16px" }}>
            {blockingErrors.length} anomalie(s) bloquante(s) détectée(s).
          </div>

          {blockingErrors.map((err, index) => (
            <div key={index} style={{ marginBottom: "12px" }}>
              <div>{err.message}</div>
              {err.feature_id && (
                <div>Feature concerné : {err.feature_id}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
