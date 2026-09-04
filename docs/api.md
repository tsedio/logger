---
layout: page
sidebar: false
description: Api Reference of Ts.ED logger
head:
  - - meta
    - name: description
      content: Api Reference of Ts.ED
  - - meta
    - name: keywords
      content: api reference model decorators ts.ed express typescript node.js javascript jsonschema json mapper serialization deserialization
---

<script setup>
import {data} from './api.data';
</script>

<llm-exclude>
<Api :modules="data.modules" :symbol-types="data.symbolTypes"  />
</llm-exclude>

<llm-only>

# API reference

Browse the API reference by package. Each link opens the corresponding API page.

<!-- API_LLM_LINKS -->

</llm-only>
