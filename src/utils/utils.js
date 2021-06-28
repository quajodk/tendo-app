import axios from "axios";

export function gDriveFileId({ gURL }) {
  const regex1 = new RegExp("/drive.google.com/open?id=(.*)/");
  const regex2 = new RegExp("/drive.google.com/file/d/(.*?)/");
  const regex3 = new RegExp("/drive.google.com/uc?id=(.*?)&/");

  let fileID;

  if (regex1.test(gURL)) {
    fileID = gURL.match(regex1)[1];
  } else if (regex2.test(gURL)) {
    fileID = gURL.match(regex2)[1];
  } else if (regex3.test(gURL)) {
    fileID = gURL.match(regex3)[1];
  }

  return fileID;
}

export function isSafari() {
  if (
    navigator.vendor &&
    navigator.vendor.indexOf("Apple") > -1 &&
    navigator.userAgent &&
    navigator.userAgent.indexOf("CriOS") === -1 &&
    navigator.userAgent.indexOf("FxiOS") === -1
  )
    return true;
  return false;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export const exploreRandomized = ({ data }) => {
  setInterval(shuffleArray(data), 900000);
};

export const request = async ({ method, url, data = {}, auth = true }) => {
  try {
    const response = await axios({
      method,
      url,
      credentials: "same-origin",
      headers: {
        Authorization: auth ? "Bearer VGVuZG8gUmVzZWxsZXIkIDIwMjE=" : null,
        Accept: "application/json",
        "Content-type": "application/json",
      },
      data,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
