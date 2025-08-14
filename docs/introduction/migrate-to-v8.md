# Migration Guide: v7 to v8

This guide helps you migrate your application from @tsed/logger v7 to v8.

## Major Changes

### Appenders and Layouts Changes

In v7, Appenders and Layouts were bundled with the main `@tsed/logger` package and automatically installed. In v8, this has changed:

- Appenders and Layouts are no longer exported from the root of the package (except for ColoredLayout)
- You must explicitly import the layouts you want to use
- StdoutAppender and StdErrAppender have been moved to a separate package: `@tsed/logger-std`
- PatternLayout has been moved to its own package: `@tsed/logger-pattern-layout`

#### Importing Layouts

```typescript
// v7 (old)
import { JsonLayout } from "@tsed/logger";

// v8 (new)
import "@tsed/logger/layouts/JsonLayout.js";
```

#### Using StdoutAppender and StdErrAppender

First, install the new package:

```bash
npm install @tsed/logger-std
# or
yarn add @tsed/logger-std
```

Then import and use it:

```typescript
// v7 (old)
import { StdoutAppender, StdErrAppender } from "@tsed/logger";

// v8 (new)
import { StdoutAppender, StdErrAppender } from "@tsed/logger-std";
```

#### Using PatternLayout

First, install the new package:

```bash
npm install @tsed/logger-pattern-layout
# or
yarn add @tsed/logger-pattern-layout
```

Then import and use it:

```typescript
// v7 (old)
import { PatternLayout } from "@tsed/logger";

// v8 (new)
import { PatternLayout } from "@tsed/logger-pattern-layout";
```

## Migration Steps

### 1. Update Dependencies

Update your package.json to use the latest version:

```json
{
  "dependencies": {
    "@tsed/logger": "^8.0.0"
  }
}
```
