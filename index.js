import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "http://localhost:80/api";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get("/", async (req, res) => {
  try {
    const result = await axios.get(`${API_URL}/GetRandom/`);
    res.render("index.ejs", {
      joke: result.data,
    });
  } catch (error) {
    console.log(error.response.data);
    res.status(500);
  }
});

app.get("/new", (req, res) => {
  res.render("edit.ejs", { heading: "New Joke", submit: "Create Joke" });
});

app.post("/", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}`, req.body);
    console.log(response.data);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

app.post("/edit", async (req, res) => {
  try {
    const response = await axios.put(`${API_URL}`, req.body);
    console.log(response.data);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/edit/:id", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/${req.params.id}`);
    console.log(response.data);
    res.render("edit.ejs", {
      heading: "Edit Joke",
      submit: "Update Joke",
      joke: response.data,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching joke" });
  }
});

app.get("/delete/:id", async (req, res) => {
  try {
    await axios.delete(`${API_URL}/${req.params.id}`);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error deleting joke" });
  }
});
