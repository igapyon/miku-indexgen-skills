---
title: miku-indexgen templates
topics:
  - miku-indexgen
  - templates
  - maven
  - antrun
  - single-skill
  - multi-skill
---

# Templates

This directory contains reusable `miku-indexgen` configuration templates.
Use them only when a concrete consumer justifies maintaining a generated index;
Maven wiring is not required for every skill repository.

Available templates:

- [pom-single-skill.xml](pom-single-skill.xml): Maven Antrun generation for one skill root
- [pom-multi-skill.xml](pom-multi-skill.xml): Maven Antrun generation for a parent `skills/` directory
