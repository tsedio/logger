<header class="symbol-info-header">    <h1 id="patternlayout">PatternLayout</h1>    <label class="symbol-info-type-label class">Class</label>    <label class="api-type-label return">{Function}</label><label class="api-type-label authors">['Stephan Strittmatter', 'Jan Schmidle']</label><label class="api-type-label private">private</label>  </header>
<section class="symbol-info">      <table class="is-full-width">        <tbody>        <tr>          <th>Module</th>          <td>            <div class="lang-typescript">                <span class="token keyword">import</span> { PatternLayout }                 <span class="token keyword">from</span>                 <span class="token string">"ts-log-debug/lib/layouts/components/PatternLayout"</span>                            </div>          </td>        </tr>        <tr>          <th>Source</th>          <td>            <a href="https://github.com/romakita/log-debug/blob/v5.0.0/src/layouts/components/PatternLayout.ts#L0-L0">                layouts/components/PatternLayout.ts            </a>        </td>        </tr>                </tbody>      </table>    </section>

### Overview

<pre><code class="typescript-lang"><span class="token keyword">class</span> PatternLayout <span class="token keyword">extends</span> <a href="#api/common/layouts/baselayout"><span class="token">BaseLayout</span></a> <span class="token punctuation">{</span>
    <span class="token keyword">constructor</span><span class="token punctuation">(</span>config<span class="token punctuation">:</span> <a href="#api/common/layouts/ibasiclayoutconfiguration"><span class="token">IBasicLayoutConfiguration</span></a><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">transform</span><span class="token punctuation">(</span>loggingEvent<span class="token punctuation">:</span> <a href="#api/common/core/logevent"><span class="token">LogEvent</span></a><span class="token punctuation">,</span> timezoneOffset?<span class="token punctuation">:</span> <span class="token keyword">number</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span></code></pre>

### Description

PatternLayout
Format for specifiers is %[padding].[truncation][field]{[format]}
e.g. %5.10p - left pad the log level by 5 characters, up to a max of 10
Fields can be any of:
 - %r time in toLocaleTimeString format
 - %p log level
 - %c log category
 - %h hostname
 - %m log data
 - %d date in constious formats
 - %% %
 - %n newline
 - %z pid
 - %x{<tokenname>} add dynamic tokens to your log. Tokens are specified in the tokens parameter
You can use %[ and %] to define a colored block.

Tokens are specified as simple key:value objects.
The key represents the token name whereas the value can be a string or function
which is called to extract the value to put in the log message. If token is not
found, it doesn't replace the field.

A sample token would be: { 'pid' : function() { return process.pid; } }

Takes a pattern string, array of tokens and returns a layouts function.

### Members

<div class="method-overview"><pre><code class="typescript-lang"><span class="token function">transform</span><span class="token punctuation">(</span>loggingEvent<span class="token punctuation">:</span> <a href="#api/common/core/logevent"><span class="token">LogEvent</span></a><span class="token punctuation">,</span> timezoneOffset?<span class="token punctuation">:</span> <span class="token keyword">number</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">string</span></code></pre></div>
