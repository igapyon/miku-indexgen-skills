# Development

## Sister Reference

No same-layer sister checkout existed under this repository's `workplace/` at scaffold time.

Closest local sister repositories used as shape references:

- `../miku-grep-skills`
- `../miku-readfile-skills`

Adopted decisions:

- compact CLI-backed Agent Skill shape
- runtime artifacts under `skills/igapyon-miku-indexgen/runtime/`
- thin Node.js helpers under `skills/igapyon-miku-indexgen/lib/`
- release bundle scripts and zip tests at repository root
- explicit opt-in activation in `SKILL.md`

Rejected decisions:

- MCP backend policy, because this repository currently bundles only CLI runtime artifacts
- product logic in the skill layer, because indexing behavior belongs to upstream `miku-indexgen`

## Runtime Source

Runtime artifacts were fetched from GitHub Releases:

- `https://github.com/igapyon/miku-indexgen/releases/tag/v1.2.0`
- `https://github.com/igapyon/miku-indexgen-java/releases/tag/v1.2.1`

Expected SHA-256 digests:

- `miku-indexgen-1.2.0.mjs`: `a6182bbf850c83503859832c6b5136418c795ebaf7245e6225842b998da4027f`
- `miku-indexgen-1.2.1.jar`: `8ec771e05ce8739a7d93e876f981975f8dac0db7e82ab58c889c25b46f0a7fba`

## Verification

Run:

```bash
npm test
npm run build:bundle:zip
```
