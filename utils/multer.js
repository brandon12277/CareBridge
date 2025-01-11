import multer from "multer"

const file_storage = multer.memoryStorage();

const upload = multer({
  storage: file_storage,
});

export default upload