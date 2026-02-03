import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Export() {

  const location = useLocation();
  const fileId = location.state?.file_id;
  const [status, setStatus] = useState("loading"); // loading | success | error

  useEffect(() => {
  if (!fileId) return;

  const download = async () => {
    try {
  setStatus("loading");

  const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/export/${fileId}`
      );

      if (!response.ok) {
        throw new Error("download_failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "";
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
      setStatus("success");
    } catch (err) {
  setStatus("error");
}
  };

  download();
}, [fileId]);

  return (
    <div>
      <h1>Export</h1>

      {status === "loading" && (
  <div>
    Génération du fichier en cours.
  </div>
)}

{status === "success" && (
  <>
      <div>
        Export terminé.
      </div>

      <div>
        Fichier généré : [nom_fichier_original].geojson
      </div>

      <div>
        Taille : [X.X] MB
      </div>

      <div>
        Nombre de parcelles : [X]
      </div>

      <div>
        Surface totale : [X.XX] hectares
      </div>

      <div>
        Format : GeoJSON RFC 7946
      </div>

      <div>
        Système de coordonnées : WGS84 (EPSG:4326)
      </div>

      <div>
        Précision détectée dans le fichier : [X] décimales
      </div>

      <div>
        Date d'export : [YYYY-MM-DD HH:MM:SS UTC]
      </div>

      <div>
        Version Green-Border : 1.0
      </div>

      <div>
        ID d'export : [UUID]
      </div>
  </>
)}
{status === "error" && (
  <>
      <div>
        Le téléchargement automatique a échoué.
      </div>

      <div>
        Cliquez sur "Télécharger" pour lancer le téléchargement manuellement.
      </div>

      <div>
        Télécharger
      </div>

      <div>
        Télécharger à nouveau
      </div>

      <div>
        Traiter un nouveau fichier
      </div>

      <div>
        Échec de la génération du fichier.
      </div>

      <div>
        Vérifiez votre connexion et réessayez.
      </div>

      <div>
        Réessayer
      </div>
  </>
)}
      <div>
        Retour à l'accueil
      </div>
    </div>
  );
}
