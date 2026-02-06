import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function PaymentSuccess() {
  const [params] = useSearchParams();

  useEffect(() => {
    const sessionId = params.get("session_id");
    if (!sessionId) return;

    fetch(
      `https://green-border-backend-isj9q.ondigitalocean.app/payment/success?session_id=${sessionId}`
    )
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("gb_token", data.token);
      });
  }, [params]);

  return (
    <div style={{ padding: "40px", maxWidth: "640px" }}>
      <h1 style={{ marginBottom: "16px" }}>Paiement confirmé</h1>

      <p style={{ marginBottom: "24px" }}>
        Vos crédits sont disponibles.
      </p>

      <div>
        <a
          href="/"
          style={{
            textDecoration: "underline",
            cursor: "pointer",
            display: "inline-block",
          }}
          onMouseOver={(e) => (e.currentTarget.style.opacity = "0.8")}
          onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Revenir à l’outil
        </a>
      </div>
    </div>
  );
}
