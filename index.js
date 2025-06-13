const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const { log } = require("console");
const { render } = require("ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');
// app.use("/files", express.static(path.join(__dirname, "files")));


app.get("/", (req, res) => {
     fs.readdir(`./files`, (err, files) => {
          res.render("index", { files: files });

     })
});

app.get("/files/:file", (req, res) => {
     fs.readFile(`./files/${req.params.file}`, "utf-8", (err, filedata) => {
          res.render("show", { title: req.params.file, description: filedata });
     })
});
app.get("/edit/:file", (req, res) => {
    fs.readFile(`./files/${req.params.file}`, "utf-8", (err, filedata) => {
        if (err) {
            return res.status(500).send("Error reading file");
        }
        res.render("edit", { title: req.params.file, description: filedata });
    });
});


app.post("/update", (req, res) => {
    const originalTitle = req.body.originalTitle;
    const newTitle = req.body.title.trim().split(" ").join("-") + ".txt";
    const description = req.body.description;

    const oldPath = path.join(__dirname, "files", originalTitle);
    const newPath = path.join(__dirname, "files", newTitle);

    fs.writeFile(newPath, description, (err) => {
        if (err) {
            console.error("Error writing updated file:", err);
            return res.status(500).send("Failed to update task");
        }

        // If filename changed, delete the old one
        if (originalTitle !== newTitle) {
            fs.unlink(oldPath, (err) => {
                if (err) console.warn("Old file not deleted:", err);
                return res.redirect("/");
            });
        } else {
            return res.redirect("/");
        }
    });
});


app.post("/create", (req, res) => {
     const description = req.body.description;
     const title = req.body.title;
     if (!title || !description) {
          return res.status(400).send("Both title and description are required.");
     }
     const filename = title.trim().split(" ").join("-") + ".txt";
    fs.writeFile(`./files/${filename}`, description, (err) => {
        if (err) {
            console.error("Error writing file:", err);
            return res.status(500).send("Error saving task");
        }
        res.redirect("/");
    });
});

app.post("/delete", (req, res) => {
     const fileToDelete = req.body.filename;
     if (!fileToDelete) {
          return res.status(400).send("Filename is required.");
     }

     fs.unlink(`./files/${fileToDelete}`, (err) => {
          if (err) {
               console.error("Error deleting file:", err);
               return res.status(500).send("Failed to delete task.");
          }
          res.redirect("/");
     });
});


app.listen(3000, () => {
     console.log("Server is running on port 3000");
});