<header class="symbol-info-header">    <h1 id="baselayout">BaseLayout</h1>    <label class="symbol-info-type-label class">Class</label>      </header>
<section class="symbol-info">      <table class="is-full-width">        <tbody>        <tr>          <th>Module</th>          <td>            <div class="lang-typescript">                <span class="token keyword">import</span> { BaseLayout }                 <span class="token keyword">from</span>                 <span class="token string">"ts-log-debug"</span>                            </div>          </td>        </tr>        <tr>          <th>Source</th>          <td>            <a href="https://github.com/romakita/log-debug/blob/v4.0.2/src/layouts/class/BaseLayout.ts#L0-L0">                layouts/class/BaseLayout.ts            </a>        </td>        </tr>                </tbody>      </table>    </section>

### Overview

<pre><code class="typescript-lang"><span class="token keyword">abstract</span> <span class="token keyword">class</span> BaseLayout <span class="token punctuation">{</span>
    <span class="token keyword">protected</span> config<span class="token punctuation">:</span> <a href="#api/common/layouts/ibasiclayoutconfiguration"><span class="token">IBasicLayoutConfiguration</span></a><span class="token punctuation">;</span>
    <span class="token keyword">constructor</span><span class="token punctuation">(</span>config<span class="token punctuation">:</span> <a href="#api/common/layouts/ibasiclayoutconfiguration"><span class="token">IBasicLayoutConfiguration</span></a><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">abstract</span> <span class="token function">transform</span><span class="token punctuation">(</span>loggingEvent<span class="token punctuation">:</span> <a href="#api/common/core/logevent"><span class="token">LogEvent</span></a><span class="token punctuation">,</span> timezoneOffset?<span class="token punctuation">:</span> <span class="token keyword">number</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span></code></pre>

### Members

<div class="method-overview"><pre><code class="typescript-lang"><span class="token keyword">protected</span> config<span class="token punctuation">:</span> <a href="#api/common/layouts/ibasiclayoutconfiguration"><span class="token">IBasicLayoutConfiguration</span></a></code></pre></div>
<hr />
<div class="method-overview"><pre><code class="typescript-lang"><span class="token keyword">abstract</span> <span class="token function">transform</span><span class="token punctuation">(</span>loggingEvent<span class="token punctuation">:</span> <a href="#api/common/core/logevent"><span class="token">LogEvent</span></a><span class="token punctuation">,</span> timezoneOffset?<span class="token punctuation">:</span> <span class="token keyword">number</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">string</span></code></pre></div>
