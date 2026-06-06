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

- `https://github.com/igapyon/miku-indexgen/releases/tag/v1.5.1`
- `https://github.com/igapyon/miku-indexgen-java/releases/tag/v1.5.1`

Expected SHA-256 digests:

- `miku-indexgen-1.5.1.mjs`: `4f178dc0921bc712c73d71aa152857f81de9e779f2b07d6178d3d012a37b5fdd`
- `miku-indexgen-1.5.1.jar`: `309f0aa1097e4e0fbaecda667930ca3761b9649731ee012915180be8dc0f1f20`

## Verification

Run:

```bash
npm test
npm run build:bundle:zip
```
