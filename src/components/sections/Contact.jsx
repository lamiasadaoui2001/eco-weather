import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import StarsBackground from "./StarsBackground";

export default function Contact() {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [sent, setSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    const templateParams = {
      prenom,
      nom,
      message,
      note: rating,
    };

    emailjs
      .send(
        "service_hme4h84",      // 🔥 ton service ID
        "template_x2rcv0q",     // 🔥 ton template ID
        templateParams,
        "8k-knGBmanofgokMf"     // 🔥 ta clé publique
      )
      .then(() => setSent(true))
      .catch((err) => console.log(err));
  };

  return (
    <div style={styles.page}>
      <StarsBackground />


{/* Titre Contact */}
      <h1 style={styles.title}>Contactez-nous</h1>

      <form onSubmit={sendEmail} style={styles.card}>
        {sent ? (
          <h2 style={styles.success}>Votre message a été envoyé ✔</h2>
        ) : (
          <>
            {/* Prénom */}
            <label style={styles.label}>Prénom :</label>
            <input
              type="text"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              style={styles.input}
              required
            />

            {/* Nom */}
            <label style={styles.label}>Nom :</label>
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              style={styles.input}
              required
            />

            {/* Message */}
            <label style={styles.label}>Message :</label>
            <textarea
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={styles.textarea}
              required
            />

            {/* Note */}
            <label style={styles.label}>Notez la page :</label>
            <StarRating value={rating} onChange={setRating} />

            <button type="submit" style={styles.button}>
              Envoyer
            </button>
          </>
        )}
      </form>
    </div>
  );
}

/* --------------------- ÉTOILES ---------------------- */
function StarRating({ value, onChange }) {
  return (
    <div style={styles.starsContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => onChange(star)}
          style={{
            ...styles.star,
            color: star <= value ? "var(--yellow)" : "#555",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

/* ---------------------- STYLES ----------------------- */
const styles = {
page: {
  minHeight: "100vh",
  backgroundColor: "var(--blue)",
  color: "var(--text)",
  padding: "30px",
  paddingTop: "200px", // <-- ajouter cet espace
  position: "relative",
},


  title: {
    textAlign: "center",
    fontSize: "40px",
    color: "var(--vertEco)",
    textShadow: "0 0 15px var(--vertEco)",
    marginBottom: "40px",
    fontWeight: "bold",
  },

card: {
  width: "60%",
  margin: "0 auto",
  padding: "40px",
  borderRadius: "20px",
  backgroundColor: "rgba(0, 0, 0, 0.3)",
  border: "2px solid var(--vertEcoFonce)",
  boxShadow: "0 0 25px rgba(76, 175, 80, 0.3)",
  backdropFilter: "blur(4px)",
  position: "relative", 
  zIndex: 1, // <-- pour être au-dessus
},


  label: {
    display: "block",
    marginBottom: "8px",
    marginTop: "15px",
    fontSize: "18px",
    fontWeight: "bold",
    color: "var(--text)",
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid var(--vertEco)",
    backgroundColor: "rgba(255,255,255,0.05)",
    color: "var(--text)",
    fontSize: "16px",
  },

  textarea: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid var(--vertEco)",
    backgroundColor: "rgba(255,255,255,0.05)",
    color: "var(--text)",
    fontSize: "16px",
  },

  starsContainer: {
    fontSize: "28px",
    marginBottom: "20px",
    cursor: "pointer",
  },

  star: {
    marginRight: "10px",
    transition: "0.2s",
  },

  button: {
    width: "100%",
    padding: "15px",
    marginTop: "20px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "var(--vertEco)",
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
  },

  success: {
    color: "var(--vertEco)",
    fontSize: "26px",
    textAlign: "center",
  },
};
