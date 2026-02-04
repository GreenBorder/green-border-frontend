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

      if (!response.ok) {
        throw new Error("validation_failed");
      }

      const data = await response.json();
      setResult(data);
      setBlockingErrors(data.blocking_anomalies || []);
    } catch (err) {
    } finally {
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
      [X] anomalie(s) bloquante(s) détectée(s).
    </div>

    <div>
      Format JSON invalide.
    </div>
    <div>
      Ligne [X], caractère [Y] : [détail erreur]
    </div>

    <div>
      Type de géométrie non accepté.
    </div>
    <div>
      Géométrie détectée : [Point/LineString]
    </div>
    <div>
      Types acceptés : Polygon, MultiPolygon
    </div>
    <div>
      Feature concerné : [ID ou index]
    </div>

    <div>
      Polygone non fermé.
    </div>
    <div>
      Le premier et le dernier point doivent être identiques.
    </div>
    <div>
      Feature concerné : [ID ou index]
    </div>
    <div>
      Première coordonnée : [lon, lat]
    </div>
    <div>
      Dernière coordonnée : [lon, lat]
    </div>

    <div>
      Auto-intersection détectée.
    </div>
    <div>
      Le polygone se croise lui-même.
    </div>
    <div>
      Feature concerné : [ID ou index]
    </div>

    <div>
      Orientation des anneaux non conforme RFC 7946.
    </div>
    <div>
      Anneau extérieur : sens anti-horaire requis.
    </div>
    <div>
      Trous intérieurs : sens horaire requis.
    </div>
    <div>
      Feature concerné : [ID ou index]
    </div>

    <div>
      Coordonnées hors limites géographiques.
    </div>
    <div>
      Latitude : -90 à +90
    </div>
    <div>
      Longitude : -180 à +180
    </div>
    <div>
      Feature concerné : [ID ou index]
    </div>
    <div>
      Coordonnée détectée : [lon, lat]
    </div>

    <div>
      Système de coordonnées non accepté.
    </div>
    <div>
      Système détecté : [EPSG:XXXX ou nom]
    </div>
    <div>
      Système requis : WGS84 (EPSG:4326)
    </div>
  </>
)}

    </div>
  );
}
