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

  try {
    const response = await fetch(
  `${process.env.REACT_APP_API_BASE_URL}/export/${fileId}`,
  { method: "POST" }
);

    if (!response.ok) {
      throw new Error("export_failed");
    }

    navigate("/export", { state: { file_id: fileId } });
  } catch (err) {
    // aucune gestion UI ici à ce stade
  }
};

  return (
    <div>
      <h1>Validation finale</h1>

      <div>
        Green-Border a exécuté des contrôles techniques automatisés sur la structure du fichier.
      </div>

      <div>
        Vous restez responsable de l'exactitude des tracés et de leur conformité réglementaire.
      </div>

      <div>
  <input
    type="checkbox"
    checked={attestOne}
    onChange={(e) => setAttestOne(e.target.checked)}
  />
  J'atteste que ces tracés correspondent aux parcelles réelles.
</div>

      <div>
  <input
    type="checkbox"
    checked={attestTwo}
    onChange={(e) => setAttestTwo(e.target.checked)}
  />
  J'ai vérifié la conformité de ces tracés avec mes documents de référence.
</div>

      <div>
        Green-Border ne vérifie pas :
      </div>

      <div>
        - La propriété foncière
      </div>
      <div>
        - L'historique d'usage des sols
      </div>
      <div>
        - La conformité cadastrale
      </div>
      <div>
        - La conformité réglementaire EUDR
      </div>

{showError && (
  <div>
    Les deux attestations doivent être cochées pour continuer.
  </div>
)}
      <div
  onClick={exportFile}
  style={{ opacity: attestOne && attestTwo ? 1 : 0.5 }}
>
  Exporter le fichier
</div>

      <div>
        Annuler
      </div>
    </div>
  );
}
