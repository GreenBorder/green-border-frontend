async function buyProPack() {
  const response = await fetch(
    "https://green-border-backend-isj9q.ondigitalocean.app/checkout",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price_id: "price_1SxQR9H27V3cOtxeZBWrhxOg", // Pack Pro
      }),
    }
  );

  const data = await response.json();
  window.location.href = data.url;
}

export default function Pricing() {
  return (
    <div style={{ padding: "40px" }}>
      <h1>Choisir un pack de crédits</h1>

      <button onClick={buyProPack}>
        Acheter – Pack Pro (199 € / 50 crédits)
      </button>
    </div>
  );
}
