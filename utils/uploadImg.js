const ErrorResponse = require("../utils/errorResponse");
const path = require("path");
const slugify = require("slugify");

const uploadImg = (file, allFields, folder, field) => {
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse("Uploaded file must be an image", 400));
  }
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload a file smaller than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }
  const slug = slugify(allFields[field], {
    lower: true
  });
  file.name = `photo_${slug}${path.parse(file.name).ext}`;
  // Move image to proper folder
  file.mv(`./client/src/img/${folder}/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse("Problem uploading file.", 500));
    }
  });
  return {
    ...allFields,
    image: file.name
  };
};

module.exports = uploadImg;
