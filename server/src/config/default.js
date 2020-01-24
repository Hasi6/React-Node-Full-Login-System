var databaseData;
if (process.env.NODE_ENV === "production") {
  databaseData = {
    mongoURI:
      "mongodb+srv://Hasitha:F453RhXHvfKW9xqq@cluster0-hcdmm.azure.mongodb.net/test?retryWrites=true&w=majority",
    cookieSecret: "mysecret",
    emailPassword: "semem2016"
  };
} else {
  databaseData = {
    mongoURI: "mongodb://localhost:27017/face-book-clone",
    cookieSecret: "mysecret",
    emailPassword: "semem2016"
  };
}

export default databaseData;
