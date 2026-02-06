async function buyPack(priceId) {
  const response = await fetch(
    "https://green-border-backend-isj9q.ondigitalocean.app/checkout",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price_id: priceId }),
    }
  );

  const data = await response.json();
  window.location.href = data.url;
}

export default function Pricing() {
  return (
    <div style={{ padding: "40px", maxWidth: "720px" }}>
      <h1 style={{ marginBottom: "24px" }}>
        Choisir un pack de crédits
      </h1>

      <div style={{ marginBottom: "16px" }}>
        <button
          onClick={() =>
            buyPack("price_1SxQOCH27V3cOtxesaN0eL3Y")
          }
          style={{ cursor: "pointer" }}
          onMouseOver={(e) => (e.currentTarget.style.opacity = "0.8")}
          onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Acheter – Pack Start (49 € / 10 crédits)
        </button>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <button
          onClick={() =>
            buyPack("price_1SxQR9H27V3cOtxeZBWrhxOg")
          }
          style={{ cursor: "pointer" }}
          onMouseOver={(e) => (e.currentTarget.style.opacity = "0.8")}
          onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Acheter – Pack Pro (199 € / 50 crédits)
        </button>
      </div>

      <div style={{ marginBottom: "32px" }}>
        <button
          onClick={() =>
            buyPack("price_1SxQSiH27V3cOtxeRZooQjU2")
          }
          style={{ cursor: "pointer" }}
          onMouseOver={(e) => (e.currentTarget.style.opacity = "0.8")}
          onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Acheter – Pack Business (699 € / 200 crédits)
        </button>
      </div>

      <div>
        <div
          onClick={() => (window.location.href = "/")}
          style={{ cursor: "pointer", display: "inline-block" }}
          onMouseOver={(e) => (e.currentTarget.style.opacity = "0.8")}
          onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Retour
        </div>
      </div>
    </div>
  );
}
