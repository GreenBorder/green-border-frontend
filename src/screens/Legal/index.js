import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Legal() {
  const location = useLocation();
  const fileId = location.state?.file_id;
  const navigate = useNavigate();
  const [attestOne, setAttestOne] = useState(false);
  const [attestTwo, setAttestTwo] = useState(false);
  const [showError, setShowError] = useState(false);

  const exportFile = async () => {
    if (!attestOne || !attestTwo) {
      setShowError(true);
      return;
    }

    navigate("/export", { state: { file_id: fileId } });
  };

  return (
    <div style={{ padding: "24px", maxWidth: "720px" }}>
      <h1 style={{ marginBottom: "16px" }}>Validation finale</h1>

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

      <div style={{ marginBottom: "12px" }}>
        Green-Border a exécuté des contrôles techniques automatisés sur la structure du fichier.
      </div>

      <div style={{ marginBottom: "24px" }}>
        Vous restez responsable de l'exactitude des tracés et de leur conformité réglementaire.
      </div>

      <div style={{ marginBottom: "12px" }}>
        <input
          type="checkbox"
          checked={attestOne}
          onChange={(e) => setAttestOne(e.target.checked)}
          style={{ marginRight: "8px", cursor: "pointer" }}
        />
        J'atteste que ces tracés correspondent aux parcelles réelles.
      </div>

      <div style={{ marginBottom: "24px" }}>
        <input
          type="checkbox"
          checked={attestTwo}
          onChange={(e) => setAttestTwo(e.target.checked)}
          style={{ marginRight: "8px", cursor: "pointer" }}
        />
        J'ai vérifié la conformité de ces tracés avec mes documents de référence.
      </div>

      <div style={{ marginBottom: "8px" }}>
        Green-Border ne vérifie pas :
      </div>

      <div style={{ marginBottom: "4px" }}>
        - La propriété foncière
      </div>
      <div style={{ marginBottom: "4px" }}>
        - L'historique d'usage des sols
      </div>
      <div style={{ marginBottom: "4px" }}>
        - La conformité cadastrale
      </div>
      <div style={{ marginBottom: "24px" }}>
        - La conformité réglementaire EUDR
      </div>

      {showError && (
        <div style={{ marginBottom: "16px" }}>
          Les deux attestations doivent être cochées pour continuer.
        </div>
      )}

      <div style={{ marginBottom: "16px" }}>
        <button
          onClick={exportFile}
          disabled={!(attestOne && attestTwo)}
          style={{
            cursor: attestOne && attestTwo ? "pointer" : "default",
            opacity: attestOne && attestTwo ? 1 : 0.5,
          }}
          onMouseOver={(e) => {
            if (attestOne && attestTwo) e.currentTarget.style.opacity = "0.8";
          }}
          onMouseOut={(e) => {
            if (attestOne && attestTwo) e.currentTarget.style.opacity = "1";
          }}
        >
          Exporter le fichier
        </button>
      </div>

      <div>
        <button
          onClick={() => navigate(-1)}
          style={{ cursor: "pointer" }}
          onMouseOver={(e) => (e.currentTarget.style.opacity = "0.8")}
          onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Annuler
        </button>
      </div>
    </div>
  );
}
