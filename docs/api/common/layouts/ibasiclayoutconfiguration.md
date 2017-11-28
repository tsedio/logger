<header class="symbol-info-header">    <h1 id="ibasiclayoutconfiguration">IBasicLayoutConfiguration</h1>    <label class="symbol-info-type-label interface">Interface</label>      </header>
<section class="symbol-info">      <table class="is-full-width">        <tbody>        <tr>          <th>Module</th>          <td>            <div class="lang-typescript">                <span class="token keyword">import</span> { IBasicLayoutConfiguration }                 <span class="token keyword">from</span>                 <span class="token string">"ts-log-debug"</span>                            </div>          </td>        </tr>        <tr>          <th>Source</th>          <td>            <a href="https://github.com/romakita/log-debug/blob/v4.0.2/src/layouts/interfaces/BasicLayoutConfiguration.ts#L0-L0">                layouts/interfaces/BasicLayoutConfiguration.ts            </a>        </td>        </tr>                </tbody>      </table>    </section>

### Overview

<pre><code class="typescript-lang"><span class="token keyword">interface</span> IBasicLayoutConfiguration <span class="token punctuation">{</span>
    type<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">;</span>
    pattern?<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">;</span>
    tokens?<span class="token punctuation">:</span> <a href="#api/common/layouts/tokenshandlers"><span class="token">TokensHandlers</span></a><span class="token punctuation">;</span>
    <span class="token punctuation">[</span>key<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">]</span><span class="token punctuation">:</span> <span class="token keyword">any</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span></code></pre>

### Members

<div class="method-overview"><pre><code class="typescript-lang">type<span class="token punctuation">:</span> <span class="token keyword">string</span></code></pre></div>
<hr />
<div class="method-overview"><pre><code class="typescript-lang">pattern?<span class="token punctuation">:</span> <span class="token keyword">string</span></code></pre></div>
<hr />
<div class="method-overview"><pre><code class="typescript-lang">tokens?<span class="token punctuation">:</span> <a href="#api/common/layouts/tokenshandlers"><span class="token">TokensHandlers</span></a></code></pre></div>
<hr />
<div class="method-overview"><pre><code class="typescript-lang"><span class="token punctuation">[</span>key<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">]</span><span class="token punctuation">:</span> <span class="token keyword">any</span></code></pre></div>
