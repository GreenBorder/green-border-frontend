import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Preview() {
  const location = useLocation();
  const fileId = location.state?.file_id;
  const result = location.state?.result;
  const preview = result?.preview || {};
  const warnings = Array.isArray(result?.warnings) ? result.warnings : [];
  const navigate = useNavigate();

  const goToLegal = () => {
    navigate("/legal", { state: { file_id: fileId, result } });
  };

  return (
    <div style={{ padding: "24px", maxWidth: "720px" }}>
      <h1 style={{ marginBottom: "16px" }}>Prévisualisation</h1>

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

      <div style={{ marginBottom: "16px" }}>
        Carte interactive
      </div>

      <div style={{ marginBottom: "8px" }}>
        Nombre de parcelles : {preview.parcels_count ?? "—"}
      </div>

      <div style={{ marginBottom: "8px" }}>
        Surface totale : {preview.total_area_ha ?? "—"} hectares
      </div>

      <div style={{ marginBottom: "16px" }}>
        Système de coordonnées : {preview.crs ?? "—"}
      </div>

      {preview.sample_feature && (
        <div style={{ marginBottom: "16px" }}>
          <div style={{ marginBottom: "4px" }}>
            Feature ID : {preview.sample_feature.id ?? "—"}
          </div>
          <div style={{ marginBottom: "4px" }}>
            Type : {preview.sample_feature.type ?? "—"}
          </div>
          <div style={{ marginBottom: "4px" }}>
            Surface : {preview.sample_feature.area_ha ?? "—"} hectares
          </div>
          <div>
            Périmètre : {preview.sample_feature.perimeter_m ?? "—"} mètres
          </div>
        </div>
      )}

      <div style={{ marginBottom: "8px" }}>
        Propriétés :
      </div>

      <div style={{ marginBottom: "4px" }}>
        — : —
      </div>

      <div style={{ marginBottom: "16px" }}>
        — : —
      </div>

      {warnings.length > 0 && (
        <div style={{ marginBottom: "16px" }}>
          <div style={{ marginBottom: "4px" }}>
            {warnings.length} avertissement(s) détecté(s).
          </div>
          <div>
            Features concernés : {warnings.map(w => w.feature_id).join(", ")}
          </div>
        </div>
      )}

      <div style={{ marginBottom: "16px" }}>
        <div
          onClick={goToLegal}
          style={{ cursor: "pointer", display: "inline-block" }}
          onMouseOver={(e) => (e.currentTarget.style.opacity = "0.8")}
          onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Valider et exporter
        </div>
      </div>

      <div style={{ marginBottom: "8px" }}>
        <div
          onClick={() => navigate("/warnings", { state: { file_id: fileId, result } })}
          style={{ cursor: "pointer", display: "inline-block" }}
          onMouseOver={(e) => (e.currentTarget.style.opacity = "0.8")}
          onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Voir les avertissements
        </div>
      </div>
    </div>
  );
}
