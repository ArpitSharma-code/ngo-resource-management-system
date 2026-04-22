const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "127.0.0.1";
const FRONTEND_DIR = path.join(__dirname, "..", "frontend");
const DB_PATH = path.join(__dirname, "data", "db.json");

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

function readDatabase() {
  const raw = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(raw);
}

function writeDatabase(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  });
  response.end(JSON.stringify(payload));
}

function sendFile(response, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || "application/octet-stream";

  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("File not found");
      return;
    }

    response.writeHead(200, { "Content-Type": contentType });
    response.end(data);
  });
}

function getRequestBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;
    });

    request.on("end", () => {
      if (!body) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(new Error("Invalid JSON body"));
      }
    });

    request.on("error", reject);
  });
}

function createId(prefix, items) {
  const nextNumber =
    items.reduce((max, item) => {
      const numericPart = Number(String(item.id || "").split("-")[1]);
      return Number.isFinite(numericPart) ? Math.max(max, numericPart) : max;
    }, 1000) + 1;

  return `${prefix}-${nextNumber}`;
}

function validatePayload(type, payload) {
  const rules = {
    resources: ["name", "category", "quantity", "unit", "location", "status"],
    volunteers: ["name", "email", "phone", "skill", "availability", "assignedProject"],
    donations: ["donor", "type", "amount", "date", "purpose"],
    projects: ["name", "lead", "beneficiaries", "status", "startDate"]
  };

  const requiredFields = rules[type] || [];
  const missingFields = requiredFields.filter((field) => {
    return payload[field] === undefined || payload[field] === null || payload[field] === "";
  });

  return missingFields;
}

function buildSummary(data) {
  const totalInventory = data.resources.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
  const totalDonations = data.donations
    .filter((item) => item.type.toLowerCase() === "money")
    .reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const lowStock = data.resources.filter((item) => item.status.toLowerCase() === "low stock").length;

  return {
    resourceCount: data.resources.length,
    volunteerCount: data.volunteers.length,
    projectCount: data.projects.length,
    donationCount: data.donations.length,
    totalInventory,
    totalDonations,
    lowStock
  };
}

function handleApiRequest(request, response, pathname) {
  const data = readDatabase();

  if (request.method === "GET" && pathname === "/api/summary") {
    sendJson(response, 200, buildSummary(data));
    return;
  }

  const collectionMap = {
    "/api/resources": "resources",
    "/api/volunteers": "volunteers",
    "/api/donations": "donations",
    "/api/projects": "projects"
  };

  const collectionKey = collectionMap[pathname];

  if (!collectionKey) {
    sendJson(response, 404, { message: "API route not found" });
    return;
  }

  if (request.method === "GET") {
    sendJson(response, 200, data[collectionKey]);
    return;
  }

  if (request.method === "POST") {
    getRequestBody(request)
      .then((payload) => {
        const missingFields = validatePayload(collectionKey, payload);

        if (missingFields.length > 0) {
          sendJson(response, 400, {
            message: "Missing required fields",
            missingFields
          });
          return;
        }

        const idPrefixMap = {
          resources: "RES",
          volunteers: "VOL",
          donations: "DON",
          projects: "PRO"
        };

        const newEntry = {
          id: createId(idPrefixMap[collectionKey], data[collectionKey]),
          ...payload
        };

        if (collectionKey === "resources" && !newEntry.lastUpdated) {
          newEntry.lastUpdated = new Date().toISOString().slice(0, 10);
        }

        data[collectionKey].unshift(newEntry);
        writeDatabase(data);

        sendJson(response, 201, newEntry);
      })
      .catch((error) => {
        sendJson(response, 400, { message: error.message });
      });

    return;
  }

  sendJson(response, 405, { message: "Method not allowed" });
}

const server = http.createServer((request, response) => {
  const requestUrl = new URL(request.url, `http://${request.headers.host}`);
  const pathname = requestUrl.pathname;

  if (request.method === "OPTIONS") {
    response.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    });
    response.end();
    return;
  }

  if (pathname.startsWith("/api/")) {
    handleApiRequest(request, response, pathname);
    return;
  }

  const sanitizedPath = pathname === "/" ? "/index.html" : pathname;
  const filePath = path.normalize(path.join(FRONTEND_DIR, sanitizedPath));

  if (!filePath.startsWith(FRONTEND_DIR)) {
    response.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Forbidden");
    return;
  }

  sendFile(response, filePath);
});

server.listen(PORT, HOST, () => {
  console.log(`NGO Resource Management System running at http://${HOST}:${PORT}`);
});
