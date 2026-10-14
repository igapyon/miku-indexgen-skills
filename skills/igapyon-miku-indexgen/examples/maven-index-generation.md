---
title: Maven index generation examples
topics:
  - miku-indexgen
  - maven
  - antrun
  - agent-skills
  - index-json
  - examples
---

# Maven Index Generation Examples

Use these examples when the user requests Maven generation wiring or an Agent
Skills repository has adopted it. Agent Skills do not require a root index by
default. A one-time request to generate or refresh `index.json` can use the CLI
directly without adding Maven wiring.

Reusable templates:

- [../templates/pom-single-skill.xml](../templates/pom-single-skill.xml)
- [../templates/pom-multi-skill.xml](../templates/pom-multi-skill.xml)

## Single Skill

Use the single-skill template when the repository effectively owns one skill:

```text
skills/<skill-name>/index.json
```

The input directory is:

```text
skills/<skill-name>
```

## Multiple Skills

Use the multi-skill template when the repository has several skill directories
under `skills/`:

```text
skills/index.json
```

The input directory is:

```text
skills
```

For Maven-based multi-skill package indexing, use the Java runtime so Maven can
run the jar directly without requiring Node.js. The bundled Node.js runtime has
the same CLI help and option surface.

## Regeneration

Run:

```bash
mvn generate-resources
```

Do not edit an adopted generated `index.json` by hand.
