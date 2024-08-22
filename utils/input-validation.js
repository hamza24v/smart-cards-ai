
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


