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
    <div style={{ padding: "24px", maxWidth: "640px" }}>
      <h1 style={{ marginBottom: "16px" }}>Export</h1>

      {status === "loading" && (
        <div style={{ marginBottom: "16px" }}>
          Génération du fichier en cours.
        </div>
      )}

      {status === "success" && (
        <div style={{ marginBottom: "16px" }}>
          Export terminé.
        </div>
      )}

      {status === "error" && (
        <div style={{ marginBottom: "24px" }}>
          <div style={{ marginBottom: "8px" }}>
            Le téléchargement automatique a échoué.
          </div>
          <div style={{ marginBottom: "12px" }}>
            Vérifiez votre connexion et réessayez.
          </div>
          <button
            onClick={() => window.location.reload()}
            style={{ cursor: "pointer" }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = "0.8")}
            onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Réessayer
          </button>
        </div>
      )}

      <div>
        <div
          onClick={() => (window.location.href = "/")}
          style={{ cursor: "pointer", display: "inline-block" }}
          onMouseOver={(e) => (e.currentTarget.style.opacity = "0.8")}
          onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Retour à l'accueil
        </div>
      </div>
    </div>
  );
}
