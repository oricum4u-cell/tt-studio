# Reusable production pipeline

The platform is a production system, not a prompt collection. It should move an episode through explicit, inspectable stages and preserve human control.

## Pipeline stages

1. **Idea** — topic, audience need, search intent, proposed title, workspace.
2. **Research** — claims, source URLs, source dates, manufacturer documents, confidence, unresolved questions.
3. **Editorial brief** — angle, viewer promise, exclusions, target duration, language, safety review level.
4. **Script** — hook, sections, narration, on-screen text, visual instructions, citations/claim IDs.
5. **Storyboard** — shot/scene sequence, diagrams, animation requirements, B-roll requirements, asset rights.
6. **Voice** — selected voice, pronunciation notes, generated or recorded narration, timing.
7. **Assembly** — timeline, media references, subtitles, music/license notes, render settings.
8. **Quality control** — technical accuracy, factual support, audio, visual consistency, subtitle sync, rights, privacy, safety.
9. **Approval** — reviewer, decision, notes, approved version hash.
10. **Publish package** — title, description, chapters, thumbnail, tags where useful, captions, destination channel.
11. **Analytics** — impressions, CTR, views, average view duration, retention, traffic sources, conversions where available.

## Required episode record

Every episode must include:
- id, workspaceId, language, status, createdAt, updatedAt;
- topic, audience, viewerPromise, format, targetDuration;
- research array, each with claim, source, sourceDate, confidence and verification status;
- scriptVersion, storyboard, assets, render;
- qualityChecks, approval, publishPackage, analytics.

## State and approval rules

- Stages are explicit states; do not mark a stage complete merely because text was generated.
- Every revision creates a version; preserve prior approved versions.
- A change to a safety-critical claim after approval invalidates the approval.
- Publishing credentials are isolated by workspace and never stored in episode content.
- The system may prepare a publish package, but must not publish without an explicit approval action.
- Failed or incomplete stages remain visible with actionable error messages.

## Automation strategy

Prioritize repeatable automation where quality can be checked:
- research organization and source capture;
- script formatting and scene breakdown;
- subtitle generation and timing assistance;
- diagram/animation templates;
- render assembly from approved assets;
- thumbnail variants and metadata drafts;
- analytics summaries.

Keep expert review for:
- diagnosis and repair advice;
- torque values, clearances, electrical measurements and model-specific procedures;
- safety-critical instructions;
- copyright/asset rights;
- final edit and publishing approval.

## MVP milestones

1. Workspace selector and isolated brand profiles.
2. Topic Finder with idea scoring and saved ideas.
3. Research board with claim/source verification.
4. Script Engine and storyboard export.
5. Asset/voice workflow.
6. Render assembly and quality checklist.
7. Human approval and publish package.
8. Analytics import and feedback loop.
