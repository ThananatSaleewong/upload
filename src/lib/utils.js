import copy from "copy-to-clipboard";

export const getImageURL = (collectionId, recordId, fileName, size = "0x0") => {
    return `http://localhost:8090/api/files/${collectionId}/${recordId}/${fileName}?thumb=${size}`;
};

export const copyUrl = (target) => {
    copy(target);
    // alert('copied')
}
