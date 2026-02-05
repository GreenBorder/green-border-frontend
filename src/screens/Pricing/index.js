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
    <div style={{ padding: "40px" }}>
      <h1>Choisir un pack de crédits</h1>

      <button
        onClick={() =>
          buyPack("price_1SxQOCH27V3cOtxesaN0eL3Y")
        }
      >
        Acheter – Pack Start (49 € / 10 crédits)
      </button>

      <br /><br />

      <button
        onClick={() =>
          buyPack("price_1SxQR9H27V3cOtxeZBWrhxOg")
        }
      >
        Acheter – Pack Pro (199 € / 50 crédits)
      </button>

      <br /><br />

      <button
        onClick={() =>
          buyPack("price_1SxQSiH27V3cOtxeRZooQjU2")
        }
      >
        Acheter – Pack Business (699 € / 200 crédits)
      </button>
    </div>
  );
}
