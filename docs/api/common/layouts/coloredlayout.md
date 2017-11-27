<header class="symbol-info-header">    <h1 id="coloredlayout">ColoredLayout</h1>    <label class="symbol-info-type-label class">Class</label>    <label class="api-type-label private">private</label>  </header>
<section class="symbol-info">      <table class="is-full-width">        <tbody>        <tr>          <th>Module</th>          <td>            <div class="lang-typescript">                <span class="token keyword">import</span> { ColoredLayout }                 <span class="token keyword">from</span>                 <span class="token string">"ts-log-debug/lib/layouts/components/ColoredLayout"</span>                            </div>          </td>        </tr>        <tr>          <th>Source</th>          <td>            <a href="https://github.com/romakita/log-debug/blob/v4.0.1/src/layouts/components/ColoredLayout.ts#L0-L0">                layouts/components/ColoredLayout.ts            </a>        </td>        </tr>                </tbody>      </table>    </section>

### Overview

<pre><code class="typescript-lang"><span class="token keyword">class</span> ColoredLayout <span class="token keyword">extends</span> <a href="#api/common/layouts/baselayout"><span class="token">BaseLayout</span></a> <span class="token punctuation">{</span>
    <span class="token function">transform</span><span class="token punctuation">(</span>loggingEvent<span class="token punctuation">:</span> <a href="#api/common/core/logevent"><span class="token">LogEvent</span></a><span class="token punctuation">,</span> timezoneOffset?<span class="token punctuation">:</span> <span class="token keyword">number</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span></code></pre>

### Members

<div class="method-overview"><pre><code class="typescript-lang"><span class="token function">transform</span><span class="token punctuation">(</span>loggingEvent<span class="token punctuation">:</span> <a href="#api/common/core/logevent"><span class="token">LogEvent</span></a><span class="token punctuation">,</span> timezoneOffset?<span class="token punctuation">:</span> <span class="token keyword">number</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">string</span></code></pre></div>
colouredLayout - taken from masylum's fork.
same as basicLayout, but with colours.
