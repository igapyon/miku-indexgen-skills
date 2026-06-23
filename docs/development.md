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

- `https://github.com/igapyon/miku-indexgen/releases/tag/v1.6.2`
- `https://github.com/igapyon/miku-indexgen-java/releases/tag/v1.6.2`

Expected SHA-256 digests:

- `miku-indexgen-1.6.2.mjs`: `eb762401832ec2a3ec0853ed437ddd2b7aef07f7271ed46874926eda59745e4a`
- `miku-indexgen-1.6.2.jar`: `bf358df1d5daaedaaacf8e6f851a7360e499f041fd2f29915eb7e419a40f6213`

## Verification

Run:

```bash
npm test
npm run build:bundle:zip
```
