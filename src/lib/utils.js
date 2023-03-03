import copy from "copy-to-clipboard";

export const getImageURL = (collectionId, recordId, fileName, size = "0x0") => {
  return `http://http://128.199.71.169/api/files/${collectionId}/${recordId}/${fileName}?thumb=${size}`;
};

export const copyUrl = (target) => {
  copy(target);
  // alert('copied')
};
