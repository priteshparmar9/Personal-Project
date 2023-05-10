const https = require("https");
const axios = require("axios");
async function uploadPic(username, pic) {
  try {
    let up_path = `/PersonalProjectEA/ProductImageVideos/${username}_${pic.name}`;

    const uploadRequest = https.request(
      "https://content.dropboxapi.com/2/files/upload",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.DB_TOKEN}`,
          "Dropbox-API-Arg": JSON.stringify({
            path: up_path,
            mode: { ".tag": "overwrite" },
            autorename: true,
            mute: false,
            strict_conflict: false,
          }),
          "Content-Type": "application/octet-stream",
        },
      },
      (res) => {
        // console.log("statusCode: ", res.statusCode);
      }
    );

    await uploadRequest.write(pic.data);
    await uploadRequest.end();

    // console.log("Uploaded to dropbox");

    // Finding url of the uploaded image
    let pic_addr = "";
    let i = 100;
    while (i--) {
      try {
        // console.log("Getting photo url");
        const response = await axios.post(
          "https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings",
          {
            path: `/PersonalProjectEA/ProductImageVideos/${username}_${pic.name}`,
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.DB_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );
        // console.log(response);
        if (response.status === 409) {
          continue;
        }
        // console.log(response.data.url);
        pic_addr = response.data.url.replace("dl=0", "raw=1");
        break;
      } catch (error) {
        // console.log(error.message);
      }
    }
    // console.log(pic_addr);
    return pic_addr;
  } catch (err) {
    return err.message;
  }
}

module.exports = { uploadPic };
