import app from "./app.js";
import { connectDatabase } from "./config/db.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await connectDatabase();
  console.log("Server is running...");
});
