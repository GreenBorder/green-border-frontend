import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Upload() {

  const [uploading, setUploading] = useState(false);
  const [uploadErrorCode, setUploadErrorCode] = useState(null);
  const [credits, setCredits] = useState(null);

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

  const navigate = useNavigate();

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
    }
    finally {
    setUploading(false);
  }
};

  return (
    <div>
      <h1>Upload</h1>
{credits !== null && (
  <div>
    Crédits restants : {credits}
  </div>
)}
      <div>
        Zone de dépôt de fichier
      </div>

      <div>
        Extensions acceptées : .geojson, .json
      </div>

      <div>
        Taille maximale : 100 MB
      </div>

      <div>
        {credits === 0 && (
  <div>
    <div>
      Vous n’avez plus de crédits disponibles.
    </div>

    <div>
      Merci de choisir un pack pour continuer.
    </div>

    <div style={{ marginTop: "12px" }}>
      <button onClick={() => navigate("/pricing")}>
        Acheter des crédits
      </button>
    </div>
  </div>
)}
        <input
          type="file"
          accept=".geojson,.json"
          disabled={uploading || credits === 0}
          onChange={(e) => {
            const selectedFile = e.target.files[0];
            if (!selectedFile) return;

            uploadFile(selectedFile);
          }}
        />
      </div>

      <div>
        Nom du fichier : [nom_fichier.geojson]
      </div>

      <div>
        Taille : [X.X MB]
      </div>

      <div>
        Progression : [0-100%]
      </div>
      
      {uploadErrorCode === 415 && (
  <>
    <div>
      Format non accepté.
    </div>

    <div>
      Extensions autorisées : .geojson, .json
    </div>
  </>
)}

      {uploadErrorCode === 413 && (
  <>
    <div>
      Fichier trop volumineux.
    </div>

    <div>
      Taille maximale : 100 MB
    </div>

    <div>
      Taille de votre fichier : [X] MB
    </div>
  </>
)}

      {(uploadErrorCode === "network" || uploadErrorCode === 500) && (
  <>
    <div>
      Échec de l'upload.
    </div>

    <div>
      Vérifiez votre connexion et réessayez.
    </div>
  </>
)}

    </div>
  );
}
