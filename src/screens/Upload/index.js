import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Upload() {
  const [uploading, setUploading] = useState(false);
  const [uploadErrorCode, setUploadErrorCode] = useState(null);
  const [credits, setCredits] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("gb_token");
    if (!token) {
      setCredits(0);
      return;
    }

    fetch(`${process.env.REACT_APP_API_BASE_URL}/credits`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCredits(data.credits);
      })
      .catch(() => {
        setCredits(0);
      });
  }, []);

  const uploadFile = async (selectedFile) => {
    const formData = new FormData();
    formData.append("file", selectedFile);

    setUploading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        setUploadErrorCode(response.status);
        throw new Error("upload_failed");
      }

      const data = await response.json();
      navigate("/validation", { state: { file_id: data.file_id } });
    } catch (err) {
      setUploadErrorCode("network");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ padding: "24px", maxWidth: "640px" }}>
      <h1 style={{ marginBottom: "16px" }}>Upload</h1>

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

      {credits !== null && (
        <div style={{ marginBottom: "16px" }}>
          Crédits restants : {credits}
        </div>
      )}

      <div style={{ marginBottom: "8px" }}>
        Zone de dépôt de fichier
      </div>

      <div style={{ marginBottom: "4px" }}>
        Extensions acceptées : .geojson, .json
      </div>

      <div style={{ marginBottom: "16px" }}>
        Taille maximale : 100 MB
      </div>

      <div style={{ marginBottom: "24px" }}>
        {credits === 0 && (
          <div style={{ marginBottom: "16px" }}>
            <div style={{ marginBottom: "4px" }}>
              Vous n’avez plus de crédits disponibles.
            </div>

            <div style={{ marginBottom: "12px" }}>
              Merci de choisir un pack pour continuer.
            </div>

            <button
              onClick={() => navigate("/pricing")}
              style={{ cursor: "pointer" }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = "0.8")}
              onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Acheter des crédits
            </button>
          </div>
        )}

        <input
          type="file"
          accept=".geojson,.json"
          disabled={uploading || credits === 0}
          style={{ cursor: uploading || credits === 0 ? "default" : "pointer" }}
          onChange={(e) => {
            const selectedFile = e.target.files[0];
            if (!selectedFile) return;
            uploadFile(selectedFile);
          }}
        />
      </div>

      <div style={{ marginBottom: "8px" }}>
        Nom du fichier : —
      </div>

      <div style={{ marginBottom: "8px" }}>
        Taille : —
      </div>

      <div style={{ marginBottom: "24px" }}>
        Progression : —
      </div>

      {uploadErrorCode === 415 && (
        <div style={{ marginBottom: "16px" }}>
          <div style={{ marginBottom: "4px" }}>
            Format non accepté.
          </div>
          <div>
            Extensions autorisées : .geojson, .json
          </div>
        </div>
      )}

      {uploadErrorCode === 413 && (
        <div style={{ marginBottom: "16px" }}>
          <div style={{ marginBottom: "4px" }}>
            Fichier trop volumineux.
          </div>
          <div style={{ marginBottom: "4px" }}>
            Taille maximale : 100 MB
          </div>
          <div>
            Taille de votre fichier : —
          </div>
        </div>
      )}

      {(uploadErrorCode === "network" || uploadErrorCode === 500) && (
        <div style={{ marginBottom: "16px" }}>
          <div style={{ marginBottom: "4px" }}>
            Échec de l'upload.
          </div>
          <div>
            Vérifiez votre connexion et réessayez.
          </div>
        </div>
      )}
    </div>
  );
}
