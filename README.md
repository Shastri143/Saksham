# Saksham — NGO Rural Student Intervention Platform

A frontend-only React web application for NGOs working with underprivileged and rural students. Saksham helps identify students at risk of dropping out, understand why they are at risk, assign interventions, manage volunteers/resources, and measure the impact of those interventions.


## Tech Stack

- React.js (JavaScript, JSX)
- React Router for navigation
- Recharts for interactive charts
- Lucide React for icons
- Normal CSS (no Tailwind, no Bootstrap)

## Features

### Core Pages
- **Landing Page** — NGO mission, how it works, platform features, impact stats
- **Login** — Role selector (NGO Admin / Teacher / Volunteer), accepts any credentials for demo
- **Dashboard** — Animated stat cards, attendance trends, risk distribution, AI copilot preview, active interventions, village snapshot
- **Students** — Searchable/filterable table with risk levels, attendance, academic scores
- **Student Details** — Full profile with risk score (circular chart), contributing factors, AI Intervention Copilot, academic/attendance charts, impact timeline, volunteer matching, intervention history, field visit report, resource allocation
- **Attendance** — Monthly attendance charts, present/absent statistics, per-student attendance bars
- **Learning Resources** — Course cards (videos, PDFs, quizzes) with progress indicators and category/type filters
- **Interventions** — All intervention cases with status change controls (Pending → In Progress → Follow-up → Resolved)
- **Risk Alerts** — Early warning system with risk scores, contributing reasons, and AI recommendations
- **Volunteers** — Volunteer list with matching, assign students to volunteers
- **Resources** — Smart resource allocation with available counts and student needs
- **Villages** — Risk heatmap visualization with clickable village details
- **Impact** — NGO impact dashboard with attendance improvement, risk over time, village performance, intervention success rate, and impact stories
- **Settings** — Profile, notification preferences, risk threshold, theme options

### Five Key Unique Features
1. **Dropout Risk Score** — Circular progress indicator with categorized risk levels (Low/Moderate/High/Critical) and contributing factor breakdown
2. **AI Intervention Copilot** — Simulated AI panel showing concerns and recommended actions per student
3. **Village Risk Heatmap** — CSS-based interactive map showing risk distribution across villages
4. **Smart Resource Allocation** — Allocate tablets, books, scholarships to students with live count updates
5. **Intervention Impact Timeline** — Visual timeline showing attendance recovery before and after intervention

