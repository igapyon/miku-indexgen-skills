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

Use these examples when adding generated `index.json` files to Agent Skills
repositories.

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

For multi-skill package indexing, use the Java runtime. Multi-directory batch
handling is Java-only.

## Regeneration

Run:

```bash
mvn generate-resources
```

Do not edit generated `index.json` files by hand.
