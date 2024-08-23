
export const readFileAsText = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      resolve(event.target.result);
    };

    reader.onerror = function (error) {
      reject(error);
    };

    reader.readAsText(file);
  });
};

export const isValidURL = (url) => {
  const urlPattern = /^(http|https):\/\/[^ "]+$/;
  return urlPattern.test(url);
};

export const chunkText = (text, maxLength) => {
  const chunks = [];
  let currentChunk = "";

  text.split(/\s+/).forEach(word => {
    if (currentChunk.length + word.length + 1 <= maxLength) {
      currentChunk += word + " ";
    } else {
      chunks.push(currentChunk.trim());
      currentChunk = word + " ";
    }
  });

  if (currentChunk) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
};


