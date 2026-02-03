import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Upload() {

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [fileId, setFileId] = useState(null);
  const [uploadErrorCode, setUploadErrorCode] = useState(null);
  const navigate = useNavigate();

  const uploadFile = async (selectedFile) => {
  const formData = new FormData();
  formData.append("file", selectedFile);

  setUploading(true);
  setProgress(0);
  setError(null);

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
    setFileId(data.file_id);
    navigate("/validation", { state: { file_id: data.file_id } });
  } catch (err) {
      setUploadErrorCode("network");
      setError("upload_failed");
    }
    finally {
    setUploading(false);
  }
};

  return (
    <div>
      <h1>Upload</h1>

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
        <input
          type="file"
          accept=".geojson,.json"
          disabled={uploading}
          onChange={(e) => {
            const selectedFile = e.target.files[0];
            if (!selectedFile) return;

            setFile(selectedFile);
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
