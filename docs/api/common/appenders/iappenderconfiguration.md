<header class="symbol-info-header">    <h1 id="iappenderconfiguration">IAppenderConfiguration</h1>    <label class="symbol-info-type-label interface">Interface</label>      </header>
<section class="symbol-info">      <table class="is-full-width">        <tbody>        <tr>          <th>Module</th>          <td>            <div class="lang-typescript">                <span class="token keyword">import</span> { IAppenderConfiguration }                 <span class="token keyword">from</span>                 <span class="token string">"ts-log-debug"</span>                            </div>          </td>        </tr>        <tr>          <th>Source</th>          <td>            <a href="https://github.com/romakita/log-debug/blob/v4.0.1/src/appenders/interfaces/AppenderConfiguration.ts#L0-L0">                appenders/interfaces/AppenderConfiguration.ts            </a>        </td>        </tr>                </tbody>      </table>    </section>

### Overview

<pre><code class="typescript-lang"><span class="token keyword">interface</span> IAppenderConfiguration <span class="token punctuation">{</span>
    type<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">;</span>
    filename?<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">;</span>
    layout?<span class="token punctuation">:</span> <a href="#api/common/layouts/ibasiclayoutconfiguration"><span class="token">IBasicLayoutConfiguration</span></a><span class="token punctuation">;</span>
    maxLogSize?<span class="token punctuation">:</span> <span class="token keyword">number</span><span class="token punctuation">;</span>
    backups?<span class="token punctuation">:</span> <span class="token keyword">number</span><span class="token punctuation">;</span>
    levels?<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">[</span>key<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">]</span><span class="token punctuation">:</span> <span class="token keyword">any</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span></code></pre>

### Members

<div class="method-overview"><pre><code class="typescript-lang">type<span class="token punctuation">:</span> <span class="token keyword">string</span></code></pre></div>
<hr />
<div class="method-overview"><pre><code class="typescript-lang">filename?<span class="token punctuation">:</span> <span class="token keyword">string</span></code></pre></div>
<hr />
<div class="method-overview"><pre><code class="typescript-lang">layout?<span class="token punctuation">:</span> <a href="#api/common/layouts/ibasiclayoutconfiguration"><span class="token">IBasicLayoutConfiguration</span></a></code></pre></div>
<hr />
<div class="method-overview"><pre><code class="typescript-lang">maxLogSize?<span class="token punctuation">:</span> <span class="token keyword">number</span></code></pre></div>
<hr />
<div class="method-overview"><pre><code class="typescript-lang">backups?<span class="token punctuation">:</span> <span class="token keyword">number</span></code></pre></div>
<hr />
<div class="method-overview"><pre><code class="typescript-lang">levels?<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></code></pre></div>
<hr />
<div class="method-overview"><pre><code class="typescript-lang"><span class="token punctuation">[</span>key<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">]</span><span class="token punctuation">:</span> <span class="token keyword">any</span></code></pre></div>
