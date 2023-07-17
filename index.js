const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
	let filePath = path.join(
		__dirname,
		"public",
		req.url === "/" ? "index.html" : req.url
	);

	let contentType = "text/html";

	let ext = path.extname(filePath);
	if (!ext) {
		filePath += ".html";
	}

	switch (ext) {
		case ".css":
			contentType = "text/css";
			break;
		case ".js":
			contentType = "text/javascript";
			break;
		case ".html":
			contentType = "text/html";
			break;
		default:
			contentType = "text/html";
	}

	fs.readFile(filePath, (err, content) => {
		if (err) {
			fs.readFile(path.join(__dirname, "public", "error.html"), (err, data) => {
				if (err) {
					res.writeHead(500);
					res.end("Error!!!");
				} else {
					res.writeHead(404, {
						"Content-Type": contentType,
					});
					res.end(data);
				}
			});
		} else {
			res.writeHead(200, {
				"Content-Type": contentType,
			});
			res.end(content);
		}
	});
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
