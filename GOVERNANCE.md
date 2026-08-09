# Research Governance

## Sources of truth

In descending order of authority:

1. Reproducible experiment results and committed datasets.
2. Accepted ADRs and reviewed research notes.
3. Current paper drafts and weekly syntheses.
4. Open issues and backlog entries.
5. ChatGPT conversations and informal discussions.

ChatGPT output is input, not evidence. Preserve a useful insight by converting it into a question, note, hypothesis, experiment, ADR, or paper change.

## Status labels

Use these labels in notes and claims:

- `observation`: directly seen in data or sources;
- `hypothesis`: testable but unverified;
- `finding`: supported by recorded evidence;
- `decision`: an adopted design choice with an ADR;
- `open-question`: unresolved;
- `superseded`: retained for history but no longer current.

## Promotion rules

- Conversation → issue: when a question is worth investigating.
- Issue → note: when sources and reasoning have been collected.
- Note → finding: when evidence supports the claim and limitations are recorded.
- Finding → paper: when it is stable, relevant to the paper thesis, and traceable.
- Design proposal → ADR: when it changes schemas, interfaces, evaluation, or system boundaries.

## Citation and provenance

- Prefer primary sources, standards, papers, code, and reproducible results.
- Record URLs, versions, access dates, datasets, and experiment IDs.
- Separate external facts from EMR interpretations.
- Never cite a ChatGPT response as evidence; trace claims to their underlying source.

## Change discipline

- Do not silently rewrite prior conclusions; supersede them with a dated note or ADR.
- Keep one canonical file for each active claim or decision and link to it elsewhere.
- Paper prose summarizes research artifacts; it does not replace them.
