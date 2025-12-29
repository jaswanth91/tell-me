// src\services\emailService.js
import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_m1lah7q";
const TEMPLATE_ID = "template_rwidoks";
const PUBLIC_KEY = "-QsRhQveOZuIb_CRh";

export const sendKeyEmail = (toEmail, key) => {
  const templateParams = {
    to_email: toEmail,
    generated_key: key,
    time: new Date().toLocaleString(),
  };

  return emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    templateParams,
    PUBLIC_KEY
  );
};
