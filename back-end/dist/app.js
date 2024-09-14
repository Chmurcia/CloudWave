import express from "express";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.get("/", (req, res) => {
    res.json({
        data: {
            message: "Hello World!",
        },
    });
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
