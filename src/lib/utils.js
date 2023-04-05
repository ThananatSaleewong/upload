import copy from "copy-to-clipboard";

export const getImageURL = (collectionId, recordId, fileName, size = "0x0") => {
  return `https://pb.bethub.link/api/files/${collectionId}/${recordId}/${fileName}?thumb=${size}`;
};
export const getImageURLFull = (collectionId, recordId, fileName) => {
  return `https://pb.bethub.link/api/files/${collectionId}/${recordId}/${fileName}`;
};

export const copyUrl = (target) => {
  copy(target);
  // alert('copied')
};
