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
    <div>
      <h1>Prévisualisation</h1>

      <div>
        Carte interactive
      </div>

      <div>
  Nombre de parcelles : {preview.parcels_count}
</div>

<div>
  Surface totale : {preview.total_area_ha} hectares
</div>

<div>
  Système de coordonnées : {preview.crs}
</div>

{preview.sample_feature && (
  <>
      <div>
  Feature ID : {preview.sample_feature.id}
</div>

<div>
  Type : {preview.sample_feature.type}
</div>

<div>
  Surface : {preview.sample_feature.area_ha} hectares
</div>

<div>
  Périmètre : {preview.sample_feature.perimeter_m} mètres
</div>
  </>
)}

      <div>
        Propriétés :
      </div>

      <div>
        [clé1] : [valeur1]
      </div>

      <div>
        [clé2] : [valeur2]
      </div>

      {warnings.length > 0 && (
  <>
    <div>
      {warnings.length} avertissement(s) détecté(s).
    </div>

    <div>
      Features concernés : {warnings.map(w => w.feature_id).join(", ")}
    </div>
  </>
)}

      <div onClick={goToLegal}>
        Valider et exporter
      </div>

      <div>
        Voir les avertissements
      </div>

      <div>
        Retour
      </div>
    </div>
  );
}
