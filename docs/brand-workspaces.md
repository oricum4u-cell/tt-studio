# Brand workspaces

Torque & Truth Studio is the reusable production platform. It must support multiple independent channel/brand workspaces without mixing their identity, audience, language, content, or publishing credentials.

## Workspace A: NPC Garage

- Purpose: commercial channel supporting the NPC Garage motorcycle service business.
- Primary language: Romanian.
- Audience: Romanian motorcycle owners, beginner/intermediate riders, used-bike buyers, and practical DIY learners.
- Content: real diagnostics, maintenance explainers, repair-cost transparency, used-motorcycle inspections, workshop case studies, seasonal service guidance.
- Voice: calm, direct, technically honest, approachable, dry humor when appropriate.
- Commercial outcomes: qualified service enquiries, trust, repeat customers, relevant parts/accessory referrals.
- Brand rule: never reveal customer identity, registration plates, VINs, invoices, contact details, or identifiable workshop information without explicit permission.

## Workspace B: Torque & Truth

- Purpose: reusable technical media brand with potential international reach.
- Primary language: English by default; allow per-episode language selection.
- Audience: motorcycle/automotive enthusiasts, mechanics, technicians, engineering students.
- Content: engine systems, diagnostics, failure analysis, performance science, engineering explainers, technical animations and simulations.
- Voice: evidence-led, precise, curious, accessible without oversimplifying.
- Commercial outcomes: audience growth, technical authority, future sponsorship/affiliate opportunities.

## Shared platform, separate identities

Both workspaces may use the same production engines and templates, but must keep separate:
- channel identity, logo, colors, typography and thumbnail templates;
- audience profile, language, tone and editorial rules;
- scripts, media assets, source notes and episode metadata;
- YouTube channel IDs, OAuth tokens, analytics and publishing settings;
- commercial links, contact details and calls to action.

A workspace must be selected before generating an episode. Every episode must store workspaceId. Never infer or silently switch the active workspace.

## Editorial safeguards

- Technical claims must be linked to sources or explicitly marked as workshop experience / hypothesis.
- Distinguish measured data, manufacturer specifications, common practice, and opinion.
- Flag safety-critical instructions for expert review.
- Obtain consent before using customer motorcycles, voices, faces, documents, or identifying details.
- Publishing always requires explicit human approval.
