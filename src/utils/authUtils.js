import { allowedEmails } from "../constants/allowedEmails";

export const isEmailAllowed = (email) => {
  return allowedEmails.includes(email.trim().toLowerCase());
};
