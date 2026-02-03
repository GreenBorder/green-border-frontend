export default function Upload() {
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
        <input type="file" accept=".geojson,.json" />
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
      
      <div>
        Format non accepté.
      </div>

      <div>
        Extensions autorisées : .geojson, .json
      </div>

      <div>
        Fichier trop volumineux.
      </div>

      <div>
        Taille maximale : 100 MB
      </div>

      <div>
        Taille de votre fichier : [X] MB
      </div>

      <div>
        Échec de l'upload.
      </div>

      <div>
        Vérifiez votre connexion et réessayez.
      </div>

    </div>
  );
}
