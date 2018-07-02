<header class="symbol-info-header">    <h1 id="loggerappenders">LoggerAppenders</h1>    <label class="symbol-info-type-label class">Class</label>      </header>
<section class="symbol-info">      <table class="is-full-width">        <tbody>        <tr>          <th>Module</th>          <td>            <div class="lang-typescript">                <span class="token keyword">import</span> { LoggerAppenders }                 <span class="token keyword">from</span>                 <span class="token string">"ts-log-debug"</span>                            </div>          </td>        </tr>        <tr>          <th>Source</th>          <td>            <a href="https://github.com/romakita/log-debug/blob/v4.0.4/src/logger/class/LoggerAppenders.ts#L0-L0">                logger/class/LoggerAppenders.ts            </a>        </td>        </tr>                </tbody>      </table>    </section>

### Overview

<pre><code class="typescript-lang"><span class="token keyword">class</span> LoggerAppenders <span class="token punctuation">{</span>
    <span class="token keyword">readonly</span> size<span class="token punctuation">:</span> <span class="token keyword">number</span><span class="token punctuation">;</span>
    <span class="token function">has</span><span class="token punctuation">(</span>name<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">boolean</span><span class="token punctuation">;</span>
    <span class="token function">get</span><span class="token punctuation">(</span>name<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <a href="#api/common/logger/iloggerappender"><span class="token">ILoggerAppender</span></a><span class="token punctuation">;</span>
    <span class="token function">set</span><span class="token punctuation">(</span>name<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">,</span> config<span class="token punctuation">:</span> <a href="#api/common/appenders/iappenderconfiguration"><span class="token">IAppenderConfiguration</span></a><span class="token punctuation">)</span><span class="token punctuation">:</span> LoggerAppenders<span class="token punctuation">;</span>
    <span class="token function">delete</span><span class="token punctuation">(</span>name<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">boolean</span><span class="token punctuation">;</span>
    <span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
    <span class="token function">forEach</span><span class="token punctuation">(</span>callback<span class="token punctuation">:</span> <span class="token punctuation">(</span>value<span class="token punctuation">:</span> <a href="#api/common/logger/iloggerappender"><span class="token">ILoggerAppender</span></a><span class="token punctuation">,</span> key<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">,</span> map<span class="token punctuation">:</span> Map<<span class="token keyword">string</span><span class="token punctuation">,</span> <a href="#api/common/logger/iloggerappender"><span class="token">ILoggerAppender</span></a>><span class="token punctuation">)</span> => <span class="token keyword">void</span><span class="token punctuation">,</span> thisArg?<span class="token punctuation">:</span> <span class="token keyword">any</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
    <span class="token function">toArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">any</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token function">byLogLevel</span><span class="token punctuation">(</span>loggingLevel<span class="token punctuation">:</span> <a href="#api/common/core/loglevel"><span class="token">LogLevel</span></a><span class="token punctuation">)</span><span class="token punctuation">:</span> <a href="#api/common/appenders/baseappender"><span class="token">BaseAppender</span></a><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span></code></pre>

### Members

<div class="method-overview"><pre><code class="typescript-lang"><span class="token keyword">readonly</span> size<span class="token punctuation">:</span> <span class="token keyword">number</span></code></pre></div>
<hr />
<div class="method-overview"><pre><code class="typescript-lang"><span class="token function">has</span><span class="token punctuation">(</span>name<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">boolean</span></code></pre></div>

Param | Type | Description
---|---|---
name| <code>string</code> |Required. The key of the element to test for presence in the Map object.`

The `has() method returns a boolean indicating whether an element with the specified configuration name exists or not.
<hr />
<div class="method-overview"><pre><code class="typescript-lang"><span class="token function">get</span><span class="token punctuation">(</span>name<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <a href="#api/common/logger/iloggerappender"><span class="token">ILoggerAppender</span></a></code></pre></div>

Param | Type | Description
---|---|---
name| <code>string</code> |Required. The configuration of the element to return from the Map object.

The `get() method returns a specified element from a loggerAppenders.
<hr />
<div class="method-overview"><pre><code class="typescript-lang"><span class="token function">set</span><span class="token punctuation">(</span>name<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">,</span> config<span class="token punctuation">:</span> <a href="#api/common/appenders/iappenderconfiguration"><span class="token">IAppenderConfiguration</span></a><span class="token punctuation">)</span><span class="token punctuation">:</span> <a href="#api/common/logger/loggerappenders"><span class="token">LoggerAppenders</span></a></code></pre></div>

Param | Type | Description
---|---|---
name| <code>string</code> |Required. The key of the element to add to the loggerAppenders object.
config| <code><a href="#api/common/appenders/iappenderconfiguration"><span class="token">IAppenderConfiguration</span></a></code> |Required. The config of the element to add to the loggerAppenders object.

The `set()` method adds or updates an element with a specified key and value to a loggerAppenders object.
<hr />
<div class="method-overview"><pre><code class="typescript-lang"><span class="token function">delete</span><span class="token punctuation">(</span>name<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">boolean</span></code></pre></div>

Param | Type | Description
---|---|---
name| <code>string</code> |Required. The key of the element to remove from the loggerAppenders object.

Remove all configuration that match with the `name`.
<hr />
<div class="method-overview"><pre><code class="typescript-lang"><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">void</span></code></pre></div>
The `clear() method removes all elements from a loggerAppenders object.
<hr />
<div class="method-overview"><pre><code class="typescript-lang"><span class="token function">forEach</span><span class="token punctuation">(</span>callback<span class="token punctuation">:</span> <span class="token punctuation">(</span>value<span class="token punctuation">:</span> <a href="#api/common/logger/iloggerappender"><span class="token">ILoggerAppender</span></a><span class="token punctuation">,</span> key<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">,</span> map<span class="token punctuation">:</span> Map<<span class="token keyword">string</span><span class="token punctuation">,</span> <a href="#api/common/logger/iloggerappender"><span class="token">ILoggerAppender</span></a>><span class="token punctuation">)</span> => <span class="token keyword">void</span><span class="token punctuation">,</span> thisArg?<span class="token punctuation">:</span> <span class="token keyword">any</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">void</span></code></pre></div>

Param | Type | Description
---|---|---
callback| <code>(value: <a href="#api/common/logger/iloggerappender"><span class="token">ILoggerAppender</span></a></code> |Function to execute for each element.
thisArg| <code>any</code> |Optional. Value to use as this when executing callback.

The `forEach()` method executes a provided function once per each key/value pair in the loggerAppenders object, in insertion order.
<hr />
<div class="method-overview"><pre><code class="typescript-lang"><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">any</span><span class="token punctuation">[</span><span class="token punctuation">]</span></code></pre></div>
<hr />
<div class="method-overview"><pre><code class="typescript-lang"><span class="token function">byLogLevel</span><span class="token punctuation">(</span>loggingLevel<span class="token punctuation">:</span> <a href="#api/common/core/loglevel"><span class="token">LogLevel</span></a><span class="token punctuation">)</span><span class="token punctuation">:</span> <a href="#api/common/appenders/baseappender"><span class="token">BaseAppender</span></a><span class="token punctuation">[</span><span class="token punctuation">]</span></code></pre></div>
Return all appenders that match with the given loggingLevel.
