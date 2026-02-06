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
    <div style={{ padding: "24px", maxWidth: "720px" }}>
      <h1 style={{ marginBottom: "16px" }}>Warnings</h1>

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

      {warnings.length === 0 && (
        <div style={{ marginBottom: "16px" }}>
          Aucun avertissement détecté.
        </div>
      )}

      {warnings.length > 0 && (
        <>
          <div style={{ marginBottom: "8px" }}>
            — avertissement(s) détecté(s).
          </div>

          <div style={{ marginBottom: "16px" }}>
            Ces éléments ne bloquent pas l'export.
          </div>

          <div style={{ marginBottom: "8px" }}>
            Avertissement 1/— : —
          </div>

          <div style={{ marginBottom: "8px" }}>
            —
          </div>

          <div style={{ marginBottom: "8px" }}>
            Feature concerné : —
          </div>

          <div style={{ marginBottom: "16px" }}>
            —
          </div>

          <div style={{ marginBottom: "16px" }}>
            <input
              type="checkbox"
              checked={acknowledged}
              onChange={(e) => setAcknowledged(e.target.checked)}
              style={{ marginRight: "8px", cursor: "pointer" }}
            />
            J'ai pris connaissance de ces avertissements
          </div>

          <div style={{ marginBottom: "16px" }}>
            <div
              onClick={acknowledged ? goToPreview : undefined}
              style={{
                cursor: acknowledged ? "pointer" : "default",
                opacity: acknowledged ? 1 : 0.5,
                display: "inline-block",
              }}
              onMouseOver={(e) => {
                if (acknowledged) e.currentTarget.style.opacity = "0.8";
              }}
              onMouseOut={(e) => {
                if (acknowledged) e.currentTarget.style.opacity = "1";
              }}
            >
              Continuer
            </div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            Corriger le fichier
          </div>

          <div style={{ marginBottom: "8px" }}>
            Taille du fichier : —
          </div>
          <div style={{ marginBottom: "8px" }}>
            Limite TRACES documentée : 25 MB
          </div>
          <div style={{ marginBottom: "16px" }}>
            Le fichier dépasse 25 MB.
          </div>

          <div style={{ marginBottom: "8px" }}>
            Chevauchement détecté.
          </div>
          <div style={{ marginBottom: "16px" }}>
            Features concernés : —
          </div>

          <div style={{ marginBottom: "8px" }}>
            Surface inférieure à 1 m².
          </div>
          <div style={{ marginBottom: "8px" }}>
            Feature concerné : —
          </div>
          <div style={{ marginBottom: "16px" }}>
            Surface : —
          </div>

          <div style={{ marginBottom: "8px" }}>
            Ratio longueur/largeur élevé.
          </div>
          <div style={{ marginBottom: "8px" }}>
            Feature concerné : —
          </div>
          <div>
            Ratio : —
          </div>
        </>
      )}
    </div>
  );
}
