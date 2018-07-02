<header class="symbol-info-header">    <h1 id="iloggerappender">ILoggerAppender</h1>    <label class="symbol-info-type-label interface">Interface</label>      </header>
<section class="symbol-info">      <table class="is-full-width">        <tbody>        <tr>          <th>Module</th>          <td>            <div class="lang-typescript">                <span class="token keyword">import</span> { ILoggerAppender }                 <span class="token keyword">from</span>                 <span class="token string">"ts-log-debug"</span>                            </div>          </td>        </tr>        <tr>          <th>Source</th>          <td>            <a href="https://github.com/romakita/log-debug/blob/v4.0.4/src/logger/class/LoggerAppenders.ts#L0-L0">                logger/class/LoggerAppenders.ts            </a>        </td>        </tr>                </tbody>      </table>    </section>

### Overview

<pre><code class="typescript-lang"><span class="token keyword">interface</span> ILoggerAppender <span class="token punctuation">{</span>
    name<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">;</span>
    instance<span class="token punctuation">:</span> <span class="token keyword">any</span><span class="token punctuation">;</span>
    config<span class="token punctuation">:</span> <a href="#api/common/appenders/iappenderconfiguration"><span class="token">IAppenderConfiguration</span></a><span class="token punctuation">;</span>
<span class="token punctuation">}</span></code></pre>

### Members

<div class="method-overview"><pre><code class="typescript-lang">name<span class="token punctuation">:</span> <span class="token keyword">string</span></code></pre></div>
<hr />
<div class="method-overview"><pre><code class="typescript-lang">instance<span class="token punctuation">:</span> <span class="token keyword">any</span></code></pre></div>
<hr />
<div class="method-overview"><pre><code class="typescript-lang">config<span class="token punctuation">:</span> <a href="#api/common/appenders/iappenderconfiguration"><span class="token">IAppenderConfiguration</span></a></code></pre></div>
