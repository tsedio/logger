<header class="symbol-info-header">    <h1 id="basiclayout">BasicLayout</h1>    <label class="symbol-info-type-label class">Class</label>    <label class="api-type-label private">private</label>  </header>
<section class="symbol-info">      <table class="is-full-width">        <tbody>        <tr>          <th>Module</th>          <td>            <div class="lang-typescript">                <span class="token keyword">import</span> { BasicLayout }                 <span class="token keyword">from</span>                 <span class="token string">"ts-log-debug/lib/layouts/components/BasicLayout"</span>                            </div>          </td>        </tr>        <tr>          <th>Source</th>          <td>            <a href="https://github.com/romakita/log-debug/blob/v4.0.3/src/layouts/components/BasicLayout.ts#L0-L0">                layouts/components/BasicLayout.ts            </a>        </td>        </tr>                </tbody>      </table>    </section>

### Overview

<pre><code class="typescript-lang"><span class="token keyword">class</span> BasicLayout <span class="token keyword">extends</span> <a href="#api/common/layouts/baselayout"><span class="token">BaseLayout</span></a> <span class="token punctuation">{</span>
    <span class="token function">transform</span><span class="token punctuation">(</span>loggingEvent<span class="token punctuation">:</span> <a href="#api/common/core/logevent"><span class="token">LogEvent</span></a><span class="token punctuation">,</span> timezoneOffset?<span class="token punctuation">:</span> <span class="token keyword">number</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span></code></pre>

### Members

<div class="method-overview"><pre><code class="typescript-lang"><span class="token function">transform</span><span class="token punctuation">(</span>loggingEvent<span class="token punctuation">:</span> <a href="#api/common/core/logevent"><span class="token">LogEvent</span></a><span class="token punctuation">,</span> timezoneOffset?<span class="token punctuation">:</span> <span class="token keyword">number</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">string</span></code></pre></div>
BasicLayout is a simple layouts for storing the logs. The logs are stored
in following format:
<pre>
[startTime] [logLevel] categoryName - message\n
</pre>

