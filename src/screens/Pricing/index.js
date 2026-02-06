import { useState } from "react";

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
  const [showEnterpriseForm, setShowEnterpriseForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function submitEnterpriseForm(e) {
    e.preventDefault();

    await fetch(
      "https://green-border-backend-isj9q.ondigitalocean.app/contact",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: e.target.name.value,
          company: e.target.company.value,
          email: e.target.email.value,
          message: e.target.message.value,
        }),
      }
    );

    setSubmitted(true);
  }

  const hoverOn = (e) => (e.currentTarget.style.opacity = "0.8");
  const hoverOff = (e) => (e.currentTarget.style.opacity = "1");

  return (
    <div style={{ padding: "40px", maxWidth: "720px" }}>
      <h1 style={{ marginBottom: "24px" }}>
        Choisir un pack de crédits
      </h1>

      {/* START */}
      <div style={{ marginBottom: "16px" }}>
        <button
          onClick={() => buyPack("price_1SxQOCH27V3cOtxesaN0eL3Y")}
          style={{ cursor: "pointer" }}
          onMouseOver={hoverOn}
          onMouseOut={hoverOff}
        >
          Acheter – Pack Start (49 € / 10 crédits)
        </button>
      </div>

      {/* PRO */}
      <div style={{ marginBottom: "16px" }}>
        <button
          onClick={() => buyPack("price_1SxQR9H27V3cOtxeZBWrhxOg")}
          style={{ cursor: "pointer" }}
          onMouseOver={hoverOn}
          onMouseOut={hoverOff}
        >
          Acheter – Pack Pro (199 € / 50 crédits)
        </button>
      </div>

      {/* BUSINESS */}
      <div style={{ marginBottom: "32px" }}>
        <button
          onClick={() => buyPack("price_1SxQSiH27V3cOtxeRZooQjU2")}
          style={{ cursor: "pointer" }}
          onMouseOver={hoverOn}
          onMouseOut={hoverOff}
        >
          Acheter – Pack Business (699 € / 200 crédits)
        </button>
      </div>

      {/* ENTERPRISE */}
      <div style={{ marginBottom: "32px" }}>
        <button
          onClick={() => setShowEnterpriseForm(true)}
          style={{ cursor: "pointer" }}
          onMouseOver={hoverOn}
          onMouseOut={hoverOff}
        >
          Nous contacter
        </button>
      </div>

      {/* FORMULAIRE ENTERPRISE */}
      {showEnterpriseForm && (
        <div style={{ marginBottom: "32px" }}>
          {!submitted ? (
            <form onSubmit={submitEnterpriseForm}>
              <div style={{ marginBottom: "12px" }}>
                <input
                  type="text"
                  name="name"
                  placeholder="Nom"
                  required
                />
              </div>

              <div style={{ marginBottom: "12px" }}>
                <input
                  type="text"
                  name="company"
                  placeholder="Société"
                  required
                />
              </div>

              <div style={{ marginBottom: "12px" }}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email professionnel"
                  required
                />
              </div>

              <div style={{ marginBottom: "16px" }}>
                <textarea
                  name="message"
                  placeholder="Message"
                  rows={4}
                  required
                />
              </div>

              <button
                type="submit"
                style={{ cursor: "pointer" }}
                onMouseOver={hoverOn}
                onMouseOut={hoverOff}
              >
                Envoyer
              </button>
            </form>
          ) : (
            <div>
              Votre demande a bien été transmise.
            </div>
          )}
        </div>
      )}

      <div>
        <button
          onClick={() => (window.location.href = "/")}
          style={{ cursor: "pointer" }}
          onMouseOver={hoverOn}
          onMouseOut={hoverOff}
        >
          Retour
        </button>
      </div>
    </div>
  );
}
