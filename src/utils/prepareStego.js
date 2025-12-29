import { encodeMessage } from "./stegoDecoder";

export const prepareStegoImage = (imageSrc, message) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;

    img.onload = () => {
      try {
        const encodedImage = encodeMessage(img, message);
        resolve(encodedImage);
      } catch {
        reject("Encoding failed");
      }
    };

    img.onerror = () => reject("Image load error");
  });
};
