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

- `https://github.com/igapyon/miku-indexgen/releases/tag/v1.3.0.1`
- `https://github.com/igapyon/miku-indexgen-java/releases/tag/v1.3.0`

Expected SHA-256 digests:

- `miku-indexgen-1.3.0.1.mjs`: `ba0b0696da36846c30810613412356f12091196c70b49cff538f53d0592c4421`
- `miku-indexgen-1.3.0.jar`: `7374dbbe64c6bba88e87b0969a92463fba0f9a9e4c63f25bd431db087b707231`

## Verification

Run:

```bash
npm test
npm run build:bundle:zip
```
