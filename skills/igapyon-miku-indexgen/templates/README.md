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
Use them when the user requests Maven generation wiring or the repository has
adopted it. Indexes and Maven wiring are optional; a one-time generation request
can use the CLI directly without adopting these templates.

Available templates:

- [pom-single-skill.xml](pom-single-skill.xml): Maven Antrun generation for one skill root
- [pom-multi-skill.xml](pom-multi-skill.xml): Maven Antrun generation for a parent `skills/` directory
