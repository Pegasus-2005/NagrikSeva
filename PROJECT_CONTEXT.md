# NagrikSeva (নাগরিক সেবা) — Master Technical Context & Coding Guidelines

## 1. Project Overview & Core Mission
**NagrikSeva** is a high-performance, legally grounded e-governance and civic empowerment platform built for the Indian civic ecosystem. It translates plain vernacular citizen complaints into:
1. **Formal Administrative Complaint Documents**: Addressed to the exact designated nodal/executive officer with official citations of violation from State Citizen Charters and Municipal SLAs.
2. **Statutory RTI Applications (Under RTI Act 2005 Section 6)**: Formatted with legally binding audit questions, fund tracking queries, and fee declarations carrying statutory penalty clauses (Section 20).
3. **Bilingual Citizen Action Guides**: Step-by-step vernacular summaries (in Kolkata-style Bengali `bn-IN` or English) detailing physical submission desks, online portals, helplines, and SLA escalation paths.

---

## 2. Technology Stack & Environment
- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide React (Icons).
- **Backend / API**: Node.js, Express.js.
- **AI / LLM Integration**: Google GenAI SDK (`@google/genai`) configured with low temperature (`0.2`) for factual consistency and zero legal hallucination.
- **RAG / Knowledge Base Engine**: In-memory indexed semantic keyword & vector search mapping regional, state (West Bengal), and national civic regulations.
- **Bilingual Engine**: Deep localization supporting English (`en-IN`) and authentic Kolkata Bengali (`bn-IN`).

---

## 3. Design System & Theme Specifications
When building or modifying UI components, strictly follow these color tokens and layout standards:
- **Primary Header & Dark Surfaces**: Deep Navy Slate (`#0F172A` / `bg-slate-900` / `text-slate-900`)
- **Civic Accent & Brand Highlights**: Saffron Orange (`#EA580C` / `text-orange-600` / `bg-orange-600`)
- **Secondary Actions & Links**: Royal Blue (`#2563EB` / `text-blue-600` / `bg-blue-600`)
- **Card Backgrounds**: Clean Crisp White (`#FFFFFF` / `bg-white`) with Soft Slate Borders (`#E2E8F0` / `border-slate-200`)
- **Body Text**: High-contrast Dark Slate (`#1E293B` / `text-slate-800`). *Never use low-contrast light gray for readable text.*
- **Component Geometry**: Rounded corners (`rounded-xl` or `rounded-2xl`), subtle drop shadows (`shadow-sm` / `shadow-md`), and spacious inner padding (`p-4` to `p-6`).

---

## 4. UI/UX Architecture: The 4-Step Intake Stepper
The primary user journey is built around a guided 4-step wizard:

### Step 1: Region & Municipal Authority Selection
- **State Selection**: West Bengal (Primary), National/Central, Maharashtra, Delhi NCR, Karnataka, Tamil Nadu.
- **Authority / Corporation Selection**:
  - Kolkata Municipal Corporation (KMC)
  - Howrah Municipal Corporation (HMC)
  - Bidhannagar Municipal Corporation (BMC)
  - South 24 Parganas / North 24 Parganas Panchayats
  - Siliguri, Asansol, Durgapur Municipal Corporations.

### Step 2: Department Categorization
- `water`: Water Supply, Pipeline Leakage & Contamination (KMC Water Supply Dept / PHE).
- `electricity`: Power Outages, Low Voltage & Meter Disputes (WBSEDCL / CESC / State Discoms).
- `roads`: Potholes, Road Cave-ins & Footpath Encroachment (Municipal Engineering / PWD Roads).
- `sanitation`: Solid Waste, Overflowing Vats & Dengue Vector Control (Solid Waste Management / Conservancy).
- `drainage`: Waterlogging, Blocked Sluice Gates & Sewer Overflows (Sewerage & Drainage Dept).
- `certificates`: Public Certificates (Birth/Death/Trade) & Ration/PDS (Borough Health & Ration Offices).

### Step 3: Grievance Context & Voice Intake
- **Text & Voice Intake**: Bilingual text area with speech-to-text integration (Web Speech API configured for `bn-IN` and `en-IN`).
- **Metadata Fields**: Incident duration (e.g., "7 days", "3 weeks"), previous grievance reference ID (if any), desired document output (`Both`, `Complaint Only`, `RTI Only`).
- **One-Click Pre-populated Case Studies**:
  - Case 1: Severe Water Contamination (Kolkata Ward 84).
  - Case 2: 72-Hour Unresolved Transformer Outage (WBSEDCL).
  - Case 3: Caved-in Pothole & Road Hazard (PWD Arterial Road).
  - Case 4: Overflowing Waste Vat & Dengue Threat (Sanitation / Ward Conservancy).
  - Case 5: Blocked Sluice Gate & Monsoon Flooding (Drainage / Borough Office).

### Step 4: Compiled Output & Document Actions
- **Tabbed / Dual-Pane Layout**:
  - `[Formal Complaint Document]`
  - `[Statutory Section 6 RTI Application]`
  - `[Citizen Action Guide / নাগরিক নির্দেশিকা]`
  - `[Statutory Grounding & Citation Badges]`
- **Actions**: One-Click Copy to Clipboard, Browser Print / Export to PDF, Shareable Link.

---

## 5. Curated Statutory Grounding Knowledge Base (RAG Rules)
The RAG pipeline must retrieve and inject these real statutory mandates based on department and keywords:

1. **Water Supply & Contamination**:
   - *KMC Citizen Charter (2023) Clause 3.1*: Water pipeline breakdown mandatory restoration within **24 hours**.
   - *WB Municipal Service Rules Section 4(II)*: Mandated safe drinking water parameters (<0.3 mg/l iron, bacteriological testing within 48–72 hours).
2. **Electricity & Outages**:
   - *WBERC Electricity Performance Standards Reg 5.2*: Power interruption resolution within **4 hours (Urban)** / **24 hours (Rural)**; burnt meter replacement within **3 days**.
3. **Solid Waste & Sanitation**:
   - *Municipal Solid Waste Management (MSW) Rules 2016 & KMC Charter Clause 7.3*: Daily bio-degradable garbage clearance within **24 hours**; vector control / mosquito breeding site clearing within **48 hours**.
4. **Roads & Infrastructure**:
   - *Central PWD & WB Urban Development Guidelines Clause 12.4*: Arterial road pothole patching within **72 hours**; high-risk cave-in cordoning within **12 hours**.
5. **Drainage & Waterlogging**:
   - *Drainage & Sewerage Standards Clause 6.1*: Mandatory deployment of mobile dewatering pumps and sluice gate desilting within **12 hours** of continuous waterlogging.
6. **Statutory Right to Information (RTI Act, 2005)**:
   - *Section 6(1)*: Statutory application for public information.
   - *Section 7(1)*: Mandatory 30-day response window (or 48 hours if related to Life & Liberty).
   - *Section 19(1)*: First Appeal provision against Public Information Officer (PIO) default.
   - *Section 20(1)*: ₹250/day penalty up to ₹25,000 on defaulting officers.

---

## 6. AI Agent Prompting & Inference Guardrails
When generating API endpoints or prompting Gemini via `@google/genai`:
- **Persona**: Dry, formal, authoritative Senior Registrar of Municipal Affairs and Legal Drafter.
- **Zero Hallucination Policy**: Only cite verified statutes provided in the RAG context. Never fabricate nonexistent section numbers.
- **Output Format**: Enforce structured Markdown or JSON separating the `complaint_letter`, `rti_application`, `citizen_summary_bengali`, `citizen_summary_english`, and `cited_clauses`.

---

## 7. Upcoming Feature Implementation Roadmap
When tasked with new feature development, build against these milestone specs:
- **Phase A (Voice Input Component)**: Add a reactive microphone button using the native Web Speech API with language toggle (`en-IN` / `bn-IN`) that transcribes spoken complaints into the Step 3 input.
- **Phase B (Multimodal Vision Engine)**: Add photo upload with EXIF metadata parsing (latitude/longitude extraction) and Gemini Vision prompt to auto-identify pothole depth, garbage volume, or sewer blockage severity.
- **Phase C (RTI 1st Appeal Escalator)**: Create an escalation generator under Section 19(1) of the RTI Act for cases where the 30-day SLA has lapsed without nodal officer response.

---

## 8. Code Quality & Contribution Standards
- Write clean, modular TypeScript with strict type definitions (avoid `any`).
- Use Tailwind utility classes for all styling; avoid writing custom raw CSS unless required for print stylesheets.
- Ensure all interactive buttons have clear loading, disabled, and active states.
- Maintain responsive design supporting mobile viewports (375px+), tablets, and widescreen desktop displays.