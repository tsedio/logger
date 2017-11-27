<header class="symbol-info-header">    <h1 id="consoleappender">ConsoleAppender</h1>    <label class="symbol-info-type-label class">Class</label>    <label class="api-type-label private">private</label>  </header>
<section class="symbol-info">      <table class="is-full-width">        <tbody>        <tr>          <th>Module</th>          <td>            <div class="lang-typescript">                <span class="token keyword">import</span> { ConsoleAppender }                 <span class="token keyword">from</span>                 <span class="token string">"ts-log-debug/lib/appenders/components/ConsoleAppender"</span>                            </div>          </td>        </tr>        <tr>          <th>Source</th>          <td>            <a href="https://github.com/romakita/log-debug/blob/v4.0.1/src/appenders/components/ConsoleAppender.ts#L0-L0">                appenders/components/ConsoleAppender.ts            </a>        </td>        </tr>                </tbody>      </table>    </section>

### Overview

<pre><code class="typescript-lang"><span class="token keyword">class</span> ConsoleAppender <span class="token keyword">extends</span> <a href="#api/common/appenders/baseappender"><span class="token">BaseAppender</span></a> <span class="token punctuation">{</span>
    <span class="token function">write</span><span class="token punctuation">(</span>loggingEvent<span class="token punctuation">:</span> <a href="#api/common/core/logevent"><span class="token">LogEvent</span></a><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span></code></pre>

### Description

## Console Appender

This appender uses node’s console object to write log events. It can also be used in the browser, if you’re using browserify or something similar. Be aware that writing a high volume of output to the console can make your application use a lot of memory. If you experience this problem, try switching to the stdout appender.

## Configuration

* type - console
* layout - object (optional, defaults to colouredLayout) - see layouts

Note that all log events are output using console.log regardless of the event’s level (so ERROR events will not be logged using console.error)

## Example

```typescript
import {Logger} from "ts-log-debug";

const logger = new Logger("loggerName");

logger.appenders.set("console", {
    type: "console",
    levels: ["debug", "info", "trace"]
});
```

### Members

<div class="method-overview"><pre><code class="typescript-lang"><span class="token function">write</span><span class="token punctuation">(</span>loggingEvent<span class="token punctuation">:</span> <a href="#api/common/core/logevent"><span class="token">LogEvent</span></a><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">void</span></code></pre></div>
