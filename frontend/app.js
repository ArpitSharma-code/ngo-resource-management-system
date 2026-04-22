const endpoints = {
  summary: "/api/summary",
  resources: "/api/resources",
  volunteers: "/api/volunteers",
  donations: "/api/donations",
  projects: "/api/projects"
};

const state = {
  resources: [],
  volunteers: [],
  donations: [],
  projects: [],
  summary: null
};

async function fetchJson(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json"
    },
    ...options
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || "Request failed");
  }

  return response.json();
}

function renderSummary() {
  const statsGrid = document.getElementById("statsGrid");
  const summary = state.summary;

  const cards = [
    { label: "Resources", value: summary.resourceCount, tone: "Tracked items in inventory" },
    { label: "Volunteers", value: summary.volunteerCount, tone: "Active people in the network" },
    { label: "Projects", value: summary.projectCount, tone: "Programs under management" },
    { label: "Funds Raised", value: `Rs ${summary.totalDonations.toLocaleString()}`, tone: "Monetary donations received" }
  ];

  statsGrid.innerHTML = cards
    .map((card) => {
      return `
        <div class="stat-card">
          <p>${card.label}</p>
          <strong>${card.value}</strong>
          <span>${card.tone}</span>
        </div>
      `;
    })
    .join("");
}

function renderResources() {
  const tableBody = document.getElementById("resourcesTable");
  tableBody.innerHTML = state.resources
    .map((item) => {
      return `
        <tr>
          <td>${item.name}</td>
          <td>${item.category}</td>
          <td>${item.quantity} ${item.unit}</td>
          <td>${item.status}</td>
          <td>${item.location}</td>
        </tr>
      `;
    })
    .join("");
}

function renderVolunteers() {
  const list = document.getElementById("volunteersList");
  list.innerHTML = state.volunteers
    .map((item) => {
      return `
        <div class="mini-card">
          <h4>${item.name}</h4>
          <p>${item.skill}</p>
          <p>${item.email}</p>
          <p>${item.phone}</p>
          <span class="badge">${item.assignedProject}</span>
        </div>
      `;
    })
    .join("");
}

function renderDonations() {
  const list = document.getElementById("donationsList");
  list.innerHTML = state.donations
    .map((item) => {
      return `
        <div class="mini-card">
          <h4>${item.donor}</h4>
          <p>Type: ${item.type}</p>
          <p>Value: ${item.amount}</p>
          <p>Date: ${item.date}</p>
          <span class="badge">${item.purpose}</span>
        </div>
      `;
    })
    .join("");
}

function renderProjects() {
  const list = document.getElementById("projectsList");
  list.innerHTML = state.projects
    .map((item) => {
      return `
        <div class="mini-card">
          <h4>${item.name}</h4>
          <p>Lead: ${item.lead}</p>
          <p>Beneficiaries: ${item.beneficiaries}</p>
          <p>Started: ${item.startDate}</p>
          <span class="badge">${item.status}</span>
        </div>
      `;
    })
    .join("");
}

function showToast(message) {
  const existing = document.querySelector(".toast");
  if (existing) {
    existing.remove();
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2500);
}

function serializeForm(form) {
  const formData = new FormData(form);
  return Object.fromEntries(formData.entries());
}

function normalizePayload(formId, payload) {
  if (formId === "resourceForm") {
    payload.quantity = Number(payload.quantity);
  }

  if (formId === "donationForm") {
    payload.amount = Number(payload.amount);
  }

  if (formId === "projectForm") {
    payload.beneficiaries = Number(payload.beneficiaries);
  }

  return payload;
}

async function refreshAll() {
  const [summary, resources, volunteers, donations, projects] = await Promise.all([
    fetchJson(endpoints.summary),
    fetchJson(endpoints.resources),
    fetchJson(endpoints.volunteers),
    fetchJson(endpoints.donations),
    fetchJson(endpoints.projects)
  ]);

  state.summary = summary;
  state.resources = resources;
  state.volunteers = volunteers;
  state.donations = donations;
  state.projects = projects;

  renderSummary();
  renderResources();
  renderVolunteers();
  renderDonations();
  renderProjects();
}

function setupFormToggles() {
  document.querySelectorAll("[data-target]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.getElementById(button.dataset.target);
      target.classList.toggle("hidden");
    });
  });
}

function setupForms() {
  const formConfig = {
    resourceForm: endpoints.resources,
    volunteerForm: endpoints.volunteers,
    donationForm: endpoints.donations,
    projectForm: endpoints.projects
  };

  Object.entries(formConfig).forEach(([formId, endpoint]) => {
    const form = document.getElementById(formId);
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      try {
        const payload = normalizePayload(formId, serializeForm(form));
        await fetchJson(endpoint, {
          method: "POST",
          body: JSON.stringify(payload)
        });
        form.reset();
        form.classList.add("hidden");
        await refreshAll();
        showToast("Record added successfully");
      } catch (error) {
        showToast(error.message);
      }
    });
  });
}

async function initializeApp() {
  setupFormToggles();
  setupForms();

  try {
    await refreshAll();
  } catch (error) {
    showToast("Unable to load dashboard data");
    console.error(error);
  }
}

initializeApp();
