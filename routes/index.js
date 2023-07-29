var express = require("express");
var router = express.Router();
var fs = require("fs");
var upload = "uploads";

/* GET home page. */
router.get("/", function (req, res) {
  fs.readdir(`${upload}`, { withFileTypes: true }, function (err, data) {
    var arr = [];
    data.forEach(function (val) {
      arr.push({
        name: val.name,
        isDirectory: val.isDirectory(),
      });
    });
    res.render("index", { files: arr });
  });
});

/* File Creation route */
router.get("/fileCreate", function (req, res) {
  var newFileName = req.query.filemake;
  fs.writeFile(`uploads/${newFileName}`, "", () => {
    res.redirect("/");
  });
});

router.get("/folderCreate", function (req, res) {
  var newFolderName = req.query.foldermake;
  fs.mkdir(`uploads/${newFolderName}`, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});

router.get("/delete/:id", function (req, res) {
  fs.unlink(`uploads/${req.params.id}`, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});

router.post("/save/:filename", function (req, res) {
  fs.writeFile(`uploads/${req.params.filename}`, req.body.filedata, (err) => {
    if (err) console.log(err);
    else res.redirect("back");
  });
});

router.get("/file/:filename", function (req, res) {
  fs.readdir(`${upload}`, { withFileTypes: true }, function (err, files) {
    fs.readFile(`uploads/${req.params.filename}`, "utf8", (err, filedata) => {
      var arr = [];
      files.forEach(function (val) {
        arr.push({
          name: val.name,
          isDirectory: val.isDirectory(),
        });
      });
      res.render("file", {
        files: arr,
        filedata: filedata,
        filename: req.params.filename,
      });
    });
  });
});

module.exports = router;
