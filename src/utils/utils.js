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
