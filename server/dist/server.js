import path from "path";
import express from "express";
import { sequelize } from "./config/connection.js";
import { router as routes } from "./routes/API/index.js";
// handle __dirname as it is not automatically available in ECMAScript module
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
const PORT = 3001;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/build")));
app.use(routes);
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});
sequelize
    .sync({ force: false })
    .then(() => {
    app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT}`));
})
    .catch((error) => {
    console.error("Sequelize sync error: ", error);
});
