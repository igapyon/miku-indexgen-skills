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

- `https://github.com/igapyon/miku-indexgen/releases/tag/v1.6.0`
- `https://github.com/igapyon/miku-indexgen-java/releases/tag/v1.6.0`

Expected SHA-256 digests:

- `miku-indexgen-1.6.0.mjs`: `af2131cfe926493c40a5cca80b66534d1b4f8159f913b9728bd8ae238f561372`
- `miku-indexgen-1.6.0.jar`: `b5a0d04c09451b90a9af1d180e7415ab6ac3825a558be1fa41563894d415dc15`

## Verification

Run:

```bash
npm test
npm run build:bundle:zip
```
