<header class="symbol-info-header">    <h1 id="baseappender">BaseAppender</h1>    <label class="symbol-info-type-label class">Class</label>      </header>
<section class="symbol-info">      <table class="is-full-width">        <tbody>        <tr>          <th>Module</th>          <td>            <div class="lang-typescript">                <span class="token keyword">import</span> { BaseAppender }                 <span class="token keyword">from</span>                 <span class="token string">"ts-log-debug"</span>                            </div>          </td>        </tr>        <tr>          <th>Source</th>          <td>            <a href="https://github.com/romakita/log-debug/blob/v5.0.0/src/appenders/class/BaseAppender.ts#L0-L0">                appenders/class/BaseAppender.ts            </a>        </td>        </tr>                </tbody>      </table>    </section>

### Overview

<pre><code class="typescript-lang"><span class="token keyword">abstract</span> <span class="token keyword">class</span> BaseAppender <span class="token keyword">implements</span> <a href="#api/common/appenders/ibaseappender"><span class="token">IBaseAppender</span></a> <span class="token punctuation">{</span>
    <span class="token punctuation">[</span>key<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">]</span><span class="token punctuation">:</span> <span class="token keyword">any</span><span class="token punctuation">;</span>
    <span class="token keyword">constructor</span><span class="token punctuation">(</span>_config<span class="token punctuation">:</span> <a href="#api/common/appenders/iappenderconfiguration"><span class="token">IAppenderConfiguration</span></a><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">readonly</span> config<span class="token punctuation">:</span> <a href="#api/common/appenders/iappenderconfiguration"><span class="token">IAppenderConfiguration</span></a><span class="token punctuation">;</span>
    <span class="token function">configure</span><span class="token punctuation">(</span>config<span class="token punctuation">:</span> PartialAppenderConfiguration<span class="token punctuation">)</span><span class="token punctuation">:</span> this<span class="token punctuation">;</span>
    <span class="token function">layout</span><span class="token punctuation">(</span>...args<span class="token punctuation">:</span> <span class="token keyword">any</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">;</span>
    <span class="token keyword">abstract</span> <span class="token function">write</span><span class="token punctuation">(</span>loggingEvent<span class="token punctuation">:</span> <a href="#api/common/core/logevent"><span class="token">LogEvent</span></a><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">any</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span></code></pre>

### Description

## BaseAppender

ts-log-debug can load appenders from outside the core appenders. The type config value is used as a require path if no matching appender can be found. For example, the following configuration will create an appender with decorators:

```typescript
// consoleAppender.ts
import {Appender, BaseAppender, LogEvent} from "ts-log-debug";
const consoleLog = console.log.bind(console);

@ Appender({name: "console2"})
export class ConsoleAppender extends BaseAppender {
  write(loggingEvent: LogEvent) {
      consoleLog(this.layout(loggingEvent, this.config.timezoneOffset));
  }
}
```

This appender can be use like this:

```typescript
import {Logger} from "ts-log-debug";
import "./consoleAppender.ts"

const logger = new Logger("loggerName");

logger.appenders
  .set("console-log", {
      type: "console2", level: ["debug", "info", "trace"]
  });
```

### Members

<div class="method-overview"><pre><code class="typescript-lang"><span class="token punctuation">[</span>key<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">]</span><span class="token punctuation">:</span> <span class="token keyword">any</span></code></pre></div>
<hr />
<div class="method-overview"><pre><code class="typescript-lang"><span class="token keyword">readonly</span> config<span class="token punctuation">:</span> <a href="#api/common/appenders/iappenderconfiguration"><span class="token">IAppenderConfiguration</span></a></code></pre></div>
<hr />
<div class="method-overview"><pre><code class="typescript-lang"><span class="token function">configure</span><span class="token punctuation">(</span>config<span class="token punctuation">:</span> PartialAppenderConfiguration<span class="token punctuation">)</span><span class="token punctuation">:</span> this</code></pre></div>
<hr />
<div class="method-overview"><pre><code class="typescript-lang"><span class="token function">layout</span><span class="token punctuation">(</span>...args<span class="token punctuation">:</span> <span class="token keyword">any</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">string</span></code></pre></div>
<hr />
<div class="method-overview"><pre><code class="typescript-lang"><span class="token keyword">abstract</span> <span class="token function">write</span><span class="token punctuation">(</span>loggingEvent<span class="token punctuation">:</span> <a href="#api/common/core/logevent"><span class="token">LogEvent</span></a><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">any</span></code></pre></div>
