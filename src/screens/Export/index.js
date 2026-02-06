import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Export() {
  const location = useLocation();
  const fileId = location.state?.file_id;
  const [status, setStatus] = useState("loading"); // loading | success | error

  useEffect(() => {
    if (!fileId) {
      window.location.href = "/";
      return;
    }

    const download = async () => {
  try {
    setStatus("loading");

    const token = localStorage.getItem("gb_token");
    if (!token) {
      window.location.href = "/pricing";
      return;
    }

    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/export/${fileId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": token,
        },
      }
    );

    if (!response.ok) {
      let errorData = null;
      try {
        errorData = await response.json();
      } catch (_) {}

      if (
        response.status === 403 &&
        errorData?.message === "Crédits épuisés"
      ) {
        window.location.href = "/pricing";
        return;
      }

      throw new Error("export_failed");
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
    console.error("[EXPORT]", err);
    setStatus("error");
  }
};

    download();
  }, [fileId]);

  return (
    <div>
      <h1>Export</h1>

      {status === "loading" && <div>Génération du fichier en cours.</div>}

      {status === "success" && <div>Export terminé.</div>}

      {status === "error" && (
        <>
          <div>Le téléchargement automatique a échoué.</div>
          <div>Vérifiez votre connexion et réessayez.</div>
          <button onClick={() => window.location.reload()}>Réessayer</button>
        </>
      )}

      <div>Retour à l'accueil</div>
    </div>
  );
}
