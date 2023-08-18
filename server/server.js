const express = require("express");
const puppeteer = require("puppeteer");
const bodyParser = require("body-parser");
const Handlebars = require("handlebars");
const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));

// Lee el contenido del archivo template.hbs
const templateHtml = fs.readFileSync(
	"./resources/templates/template.hbs",
	"utf-8",
);

app.post("/generate-image", async (req, res) => {
	const { image, texto1, texto2 } = req.body;
	let browser;
	try {
		browser = await puppeteer.launch({ headless: "new" });

		const page = await browser.newPage();

		// Compila el template Handlebars
		const template = Handlebars.compile(templateHtml);
		const finalHtml = template({ image, texto1, texto2 });
		await page.setContent(finalHtml);
		await page.waitForSelector("img");
		const screenshot = await page.screenshot();
		res.send(screenshot);
	} catch (error) {
		console.error("Error:", error);
		res.status(500).send("Error generando la imagen.");
	} finally {
		if (browser) {
			await browser.close();
		}
	}
});

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
