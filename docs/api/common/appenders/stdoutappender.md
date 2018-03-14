<header class="symbol-info-header">    <h1 id="stdoutappender">StdoutAppender</h1>    <label class="symbol-info-type-label class">Class</label>    <label class="api-type-label private">private</label>  </header>
<section class="symbol-info">      <table class="is-full-width">        <tbody>        <tr>          <th>Module</th>          <td>            <div class="lang-typescript">                <span class="token keyword">import</span> { StdoutAppender }                 <span class="token keyword">from</span>                 <span class="token string">"ts-log-debug/lib/appenders/components/StdoutAppender"</span>                            </div>          </td>        </tr>        <tr>          <th>Source</th>          <td>            <a href="https://github.com/romakita/log-debug/blob/v4.0.3/src/appenders/components/StdoutAppender.ts#L0-L0">                appenders/components/StdoutAppender.ts            </a>        </td>        </tr>                </tbody>      </table>    </section>

### Overview

<pre><code class="typescript-lang"><span class="token keyword">class</span> StdoutAppender <span class="token keyword">extends</span> <a href="#api/common/appenders/baseappender"><span class="token">BaseAppender</span></a> <span class="token punctuation">{</span>
    <span class="token function">write</span><span class="token punctuation">(</span>loggingEvent<span class="token punctuation">:</span> <a href="#api/common/core/logevent"><span class="token">LogEvent</span></a><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span></code></pre>

### Description

## Standard Output Appender

This appender writes all log events to the standard output stream.

## Configuration

* type - stderr
* layout - object (optional, defaults to colouredLayout) - see layouts

## Example

```typescript
import {Logger} from "ts-log-debug";

const logger = new Logger("loggerName");

logger.appenders.set("log", {
    type: "stdout",
    levels: ["info", "trace", "debug"]
});
```

### Members

<div class="method-overview"><pre><code class="typescript-lang"><span class="token function">write</span><span class="token punctuation">(</span>loggingEvent<span class="token punctuation">:</span> <a href="#api/common/core/logevent"><span class="token">LogEvent</span></a><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">void</span></code></pre></div>
