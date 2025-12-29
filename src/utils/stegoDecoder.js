
export const encodeMessage = (imgElement, secretMessage) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = imgElement.width;
  canvas.height = imgElement.height;
  ctx.drawImage(imgElement, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  let binaryMessage = "";
  for (let i = 0; i < secretMessage.length; i++) {
    binaryMessage += secretMessage
      .charCodeAt(i)
      .toString(2)
      .padStart(8, "0");
  }

  binaryMessage += "00000000"; // null terminator

  for (let i = 0; i < binaryMessage.length; i++) {
    data[i * 4] = (data[i * 4] & 0xfe) | Number(binaryMessage[i]);
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL();
};


export const decodeMessage = (imgElement) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = imgElement.width;
  canvas.height = imgElement.height;
  ctx.drawImage(imgElement, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  let binaryData = "";

  for (let i = 0; i < data.length; i += 4) {
    binaryData += (data[i] & 1).toString();
  }

  let message = "";
  for (let i = 0; i < binaryData.length; i += 8) {
    const byte = binaryData.slice(i, i + 8);
    if (byte === "00000000") break;
    message += String.fromCharCode(parseInt(byte, 2));
  }

  return message;
};
