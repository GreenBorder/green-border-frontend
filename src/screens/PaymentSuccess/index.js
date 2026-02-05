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
    <div style={{ padding: "40px" }}>
      <h1>Paiement confirmé</h1>
      <p>Vos crédits sont disponibles.</p>

      <div style={{ marginTop: "20px" }}>
        <a href="/" style={{ textDecoration: "underline" }}>
          Revenir à l’outil
        </a>
      </div>
    </div>
  );
}
