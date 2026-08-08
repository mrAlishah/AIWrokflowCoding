# Architecture

## Goal

<PROJECT_ARCHITECTURE_GOAL>

## Layers

```text
UI / API
  -> Application
  -> Domain
  -> Infrastructure
```

## Responsibilities

### UI / API

- Receives user input.
- Calls application services.
- Displays result and validation issues.
- Must not duplicate business logic.

### Application

- Owns use cases.
- Defines interfaces.
- Runs validation.
- Coordinates domain models and infrastructure abstractions.

### Domain

- Owns core models, enums, and business concepts.
- Must not depend on UI or infrastructure.

### Infrastructure

- Implements file, database, external API, auth, config, and other adapters.

## Important Boundaries

- <BOUNDARY_1>
- <BOUNDARY_2>
- <BOUNDARY_3>
