import React from "react";
import axios from "axios";
import moment from "moment";

function ImageUpload() {
  const [imgSrc, setImgSrc] = React.useState();
  const [copy, setCopy] = React.useState(false);

  const uploadToS3 = async (file, signedRequest) => {
    const options = {
      headers: {
        "Content-Type": file.type,
      },
    };

    await axios.put(signedRequest, file, options);
  };

  const formatFileName = (file) => {
    const date = moment().format("YYYYMMDD");
    const cleanFileName = file.name.toLowerCase().replace(/[^a-z0-9]/g, "-");
    const newFilename = `images/${date}${cleanFileName}`;
    return newFilename.substring(0, 60);
  };

  const fileSelected = async (e) => {
    console.log(e.target.files);

    const filename = formatFileName(e.target.files[0]);

    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const data = { filename, filetype: e.target.files[0].type };

    const response = await axios.post(
      "https://limitless-eyrie-86093.herokuapp.com/http://18.118.133.19/api/v1/tendo/upload",
      data,
      options
    );

    const { signedRequest, imgUrl } = response?.data?.data;

    console.log(signedRequest);

    await uploadToS3(e.target.files[0], signedRequest);
    console.log(imgUrl);
    setImgSrc(imgUrl);
  };

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center">
      <div className="w-96">
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={fileSelected}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-4 justify-start items-start">
        <span className="text-base font-semibold">Image Link</span>
      </div>

      <div className="mt-8 mb-4 w-96">
        <div className="mt-1 flex rounded-md">
          <span
            className={`inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 ${
              copy ? "text-green-800" : "text-gray-500"
            } text-sm cursor-pointer`}
            onClick={() => {
              navigator.clipboard.writeText(imgSrc);
              setCopy(true);
              setTimeout(() => setCopy(false), 5000);
            }}
          >
            {copy ? "Copied" : "Copy"}
          </span>
          <input
            type="text"
            name="company-website"
            id="company-website"
            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 p-3 border"
            value={imgSrc}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          />
        </div>
      </div>

      {imgSrc && <img src={imgSrc} alt="preview" className="w-32 h-32" />}
    </div>
  );
}

export default ImageUpload;
