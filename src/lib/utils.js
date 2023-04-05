import copy from "copy-to-clipboard";

export const getImageURL = (collectionId, recordId, fileName) => {
  return `https://pb.bethub.link/api/files/${collectionId}/${recordId}/${fileName}?`;
};

export const copyUrl = (target) => {
  copy(target);
  // alert('copied')
};
