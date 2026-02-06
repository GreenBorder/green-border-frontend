export default function PaymentCancel() {
  return (
    <div style={{ padding: "40px", maxWidth: "640px" }}>
      <h1 style={{ marginBottom: "24px" }}>Paiement annulé</h1>

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
