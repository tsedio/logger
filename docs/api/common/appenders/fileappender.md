<header class="symbol-info-header">    <h1 id="fileappender">FileAppender</h1>    <label class="symbol-info-type-label class">Class</label>    <label class="api-type-label private">private</label>  </header>
<section class="symbol-info">      <table class="is-full-width">        <tbody>        <tr>          <th>Module</th>          <td>            <div class="lang-typescript">                <span class="token keyword">import</span> { FileAppender }                 <span class="token keyword">from</span>                 <span class="token string">"ts-log-debug/lib/appenders/components/FileAppender"</span>                            </div>          </td>        </tr>        <tr>          <th>Source</th>          <td>            <a href="https://github.com/romakita/log-debug/blob/v4.0.3/src/appenders/components/FileAppender.ts#L0-L0">                appenders/components/FileAppender.ts            </a>        </td>        </tr>                </tbody>      </table>    </section>

### Overview

<pre><code class="typescript-lang"><span class="token keyword">class</span> FileAppender <span class="token keyword">extends</span> <a href="#api/common/appenders/baseappender"><span class="token">BaseAppender</span></a> <span class="token punctuation">{</span>
    <span class="token function">reopen</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
    <span class="token function">shutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span> Promise<<span class="token keyword">any</span>><span class="token punctuation">;</span>
    <span class="token function">write</span><span class="token punctuation">(</span>loggingEvent<span class="token punctuation">:</span> <a href="#api/common/core/logevent"><span class="token">LogEvent</span></a><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span></code></pre>

### Description

## File Appender

The file appender writes log events to a file. It supports an optional maximum file size, and will keep a configurable number of backups. When using the file appender, you should also call ts-log-debug.shutdown() when your application terminates, to ensure that any remaining asynchronous writes have finished. Although the file appender uses the streamroller library, this is included as a dependency of ts-log-debug so you do not need to include it yourself.

## Configuration

* type - "file"
* filename - string - the path of the file where you want your logs written.
* maxLogSize - integer (optional) - the maximum size (in bytes) for the log file. If not specified, then no log rolling will happen.
* backups - integer (optional, default value = 5) - the number of old log files to keep during log rolling.
* layout - (optional, defaults to basic layout) - see layouts

Any other configuration parameters will be passed to the underlying streamroller implementation (see also node.js core file streams):

* encoding - string (default “utf-8”)
* mode - integer (default 0644)
* flags - string (default ‘a’)
* compress - boolean (default false) - compress the backup files during rolling (backup files will have .gz extension)

## Example

```typescript
import {Logger} from "ts-log-debug";

const logger = new Logger("loggerName");

logger.appenders.set("log-file", {
    type: "file",
    filename: "all-the-logs.log"
});
logger.debug('I will be logged in all-the-logs.log');
```
> This example will result in a single log file (all-the-logs.log) containing the log messages.

## Example with log rolling (and compressed backups)

```typescript
import {Logger} from "ts-log-debug";

const logger = new Logger("loggerName");

logger.appenders.set("log-file2", {
    type: "file",
    filename: "all-the-logs.log",
    maxLogSize: 10485760,
    backups: 3,
    compress: true
});
logger.debug('I will be logged in all-the-logs.log');
```
> This will result in one current log file (all-the-logs.log). When that reaches 10Mb in size, it will be renamed and compressed to all-the-logs.log.1.gz and a new file opened called all-the-logs.log. When all-the-logs.log reaches 10Mb again, then all-the-logs.log.1.gz will be renamed to all-the-logs.log.2.gz, and so on.

### Members

<div class="method-overview"><pre><code class="typescript-lang"><span class="token function">reopen</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">void</span></code></pre></div>
<hr />
<div class="method-overview"><pre><code class="typescript-lang"><span class="token function">shutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span> Promise<<span class="token keyword">any</span>></code></pre></div>
<hr />
<div class="method-overview"><pre><code class="typescript-lang"><span class="token function">write</span><span class="token punctuation">(</span>loggingEvent<span class="token punctuation">:</span> <a href="#api/common/core/logevent"><span class="token">LogEvent</span></a><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">void</span></code></pre></div>
