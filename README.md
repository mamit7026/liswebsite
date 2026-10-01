# OmniLIS™ Informatics Platform

> **Next-Generation Laboratory Information System (LIS) & Clinical Diagnostics Operating System**  
> Inspired by industry benchmarks: [Clinisys](https://www.clinisys.com/in/en), [Autoscribe Informatics](https://www.autoscribeinformatics.com/), [LigoLab](https://www.ligolab.com/), and [Illumina](https://www.illumina.com/).

---

## 🎨 Theme & Brand Identity (Blue + Teal)

- **Primary Color:** `#0F6CBD` (Enterprise Clinical Blue)
- **Secondary Color:** `#0F9D8A` (Precision Biotechnology Teal)
- **Background:** `#F8FAFC` (Neutral Crisp Slate)
- **Text:** `#172033` (Deep Navy Slate)
- **Light Section:** `#EFF6FF` (Ice Blue Tint)
- **White:** `#FFFFFF`
- **CTA:** `#0F6CBD`

---

## 🚀 Technology Stack & Architecture

- **Backend Framework:** **Fastify** (Ultra-fast, low overhead Node.js web framework)
- **Validation Engine:** **Joi** (Schema validation for demo requests, contact forms, and subscriptions)
- **Database:** **MongoDB** with **Mongoose** ODM (Automated indexing, schema enforcement, and auto-seeding)
- **Frontend / Templating:** **EJS** (Embedded JavaScript templates), HTML5, Vanilla CSS Design System, Bootstrap 5.3 & Bootstrap Icons
- **Architecture:** Strict **MVC** (Model - View - Controller):
  - `src/models/`: `DemoRequest`, `ContactMessage`, `NewsletterSubscriber`, `Solution`, `Product`
  - `src/views/`: Layouts, partials (`head`, `navbar`, `footer`, `demoModal`), and pages
  - `src/controllers/`: `pageController`, `inquiryController`, `adminController`
  - `src/validators/`: `inquiryValidator` (Joi schemas)
  - `src/routes/`: `webRoutes`, `apiRoutes`, `adminRoutes`
- **Configuration & Security:** `.env`, `.env.example`, `.gitignore`

---

## 📋 Key Platform Capabilities

1. **Clinical Core Diagnostics LIS:** High-throughput chemistry, hematology, and immunology with &lt; 5ms auto-verification and Westgard QC rules.
2. **Anatomic Pathology & Molecular:** Grossing station cassette laser-etching, slide tracking, CAP Cancer Protocol synoptics, and Whole Slide Imaging (WSI) telepathology.
3. **Genomics & NGS Informatics:** Direct orchestration with Illumina NovaSeq, NextSeq, and MiSeq sequencers, secondary bioinformatic pipelines (DRAGEN/BWA), and ACMG variant classification.
4. **Laboratory Revenue Cycle Management (RCM):** Integrated front-end ANSI 270/271 eligibility, LCD/NCD medical necessity scrubbing, and 96.8% clean first-pass claims.
5. **Biobanking & Environmental LIMS:** Dynamic 2D/3D cryogenic freezer mapping, aliquot lineage, and FDA 21 CFR Part 11 audit trails.
6. **OmniConnect™ Analyzer Hub:** Pre-built bidirectional driver library for 700+ instruments (ASTM E1381/E1394, HL7 v2.x, FHIR R4).
7. **Interactive ROI & TAT Calculator:** Real-time laboratory workload savings projector based on daily test volume.
8. **Admin Lead & Demo Manager:** Embedded dashboard to view incoming demo bookings, contact dispatch, and toggle lead status (`New`, `Contacted`, `Scheduled`, `Delivered`, `Closed`).

---

## 🛠️ Getting Started

### 1. Prerequisites
- **Node.js** v18+ (tested on Node v24.12)
- **MongoDB** running locally or a MongoDB Atlas URI

### 2. Installation
```bash
cd c:\LIS_WEBSITE
npm install
```

### 3. Environment Setup
Create a `.env` file (copied from `.env.example`):
```env
PORT=3500
HOST=0.0.0.0
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/lis_informatics
APP_NAME=OmniLIS Informatics
ADMIN_KEY=admin123
```

### 4. Database Seed
Seed initial clinical solutions and platform modules:
```bash
npm run seed
```

### 5. Running the Application
```bash
# Production mode
npm start

# Development mode (with live watch)
npm run dev
```

Visit the application in your browser:
- **Public Portal:** [http://localhost:3500](http://localhost:3500)
- **Clinical Solutions:** [http://localhost:3500/solutions](http://localhost:3500/solutions)
- **Platform Modules:** [http://localhost:3500/products](http://localhost:3500/products)
- **Industries:** [http://localhost:3500/industries](http://localhost:3500/industries)
- **Resources & Whitepapers:** [http://localhost:3500/resources](http://localhost:3500/resources)
- **Company About:** [http://localhost:3500/about](http://localhost:3500/about)
- **Contact Desk:** [http://localhost:3500/contact](http://localhost:3500/contact)
- **Book a Demo:** [http://localhost:3500/request-demo](http://localhost:3500/request-demo)
- **Admin Lead Manager:** [http://localhost:3500/admin](http://localhost:3500/admin)

---

## 🔒 API Endpoints & Joi Validation

| Method | Endpoint | Description | Joi Validated |
|--------|----------|-------------|---------------|
| `POST` | `/api/demo` | Book personalized lab demonstration | Yes (`demoRequestSchema`) |
| `POST` | `/api/contact` | Submit general or support inquiry | Yes (`contactMessageSchema`) |
| `POST` | `/api/newsletter` | Join clinical update briefing | Yes (`newsletterSchema`) |
| `POST` | `/admin/demo/:id/status` | Update lead qualification status | Yes |
| `GET`  | `/api/health` | Service health status | - |
