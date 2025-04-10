import{_ as n,c as a,o as e,ae as p}from"./chunks/framework.Dh1jimFm.js";const k=JSON.parse('{"title":"Windows 手动安装 OpenSSH Server 到任何地方","description":"","frontmatter":{},"headers":[],"relativePath":"Windows手动安装OpenSSH Server到任何地方.md","filePath":"Windows手动安装OpenSSH Server到任何地方.md"}'),i={name:"Windows手动安装OpenSSH Server到任何地方.md"};function l(t,s,o,h,r,c){return e(),a("div",null,s[0]||(s[0]=[p(`<h1 id="windows-手动安装-openssh-server-到任何地方" tabindex="-1">Windows 手动安装 OpenSSH Server 到任何地方 <a class="header-anchor" href="#windows-手动安装-openssh-server-到任何地方" aria-label="Permalink to &quot;Windows 手动安装 OpenSSH Server 到任何地方&quot;">​</a></h1><h2 id="github-release-下载-zip-包" tabindex="-1">Github Release 下载 zip 包 <a class="header-anchor" href="#github-release-下载-zip-包" aria-label="Permalink to &quot;Github Release 下载 zip 包&quot;">​</a></h2><p><a href="https://github.com/PowerShell/Win32-OpenSSH/releases/download/v9.8.2.0p2-Preview/OpenSSH-Win64.zip" target="_blank" rel="noreferrer">https://github.com/PowerShell/Win32-OpenSSH/releases/download/v9.8.2.0p2-Preview/OpenSSH-Win64.zip</a></p><p>可以使用 Github Proxy 加速下载：<a href="https://github.akams.cn/" target="_blank" rel="noreferrer">https://github.akams.cn/</a></p><h2 id="随意解压到任意路径" tabindex="-1">随意解压到任意路径 <a class="header-anchor" href="#随意解压到任意路径" aria-label="Permalink to &quot;随意解压到任意路径&quot;">​</a></h2><div class="language-powshell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">powshell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>7z x OpenSSH-Win64.zip</span></span></code></pre></div><ul><li>后续操作不需要管理员权限，普通的 powershell 即可</li><li>不使用自带的 install-sshd.ps1 安装成服务</li><li>可以将自己写的启动脚本设置成开机自动启动也可以实现跟系统服务同样的效果</li></ul><h2 id="生成密钥" tabindex="-1">生成密钥 <a class="header-anchor" href="#生成密钥" aria-label="Permalink to &quot;生成密钥&quot;">​</a></h2><p>需要生成三个类型的密钥（rsa、ecdsa、ed25519） 密钥保存的路径需要填写到配置文件里的</p><div class="language-powershell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">powershell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># cd zip包解压出来的目录 or 将解压出来的目录添加到环境变量</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.\\</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ssh-keygen.exe</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">t rsa </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-f</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;xxx\\ssh_host_rsa_key&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.\\</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ssh-keygen.exe</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">t ecdsa </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-f</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;xxx\\ssh_host_ecdsa_key&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.\\</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ssh-keygen.exe</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">t ed25519 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-f</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;xxx\\ssh_host_ed25519_key&quot;</span></span></code></pre></div><h2 id="编写配置文件" tabindex="-1">编写配置文件 <a class="header-anchor" href="#编写配置文件" aria-label="Permalink to &quot;编写配置文件&quot;">​</a></h2><p>直接复制解压出来的 sshd_config_default 为 sshd_config</p><div class="language-powershell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">powershell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">cp sshd_config_default sshd_config</span></span></code></pre></div><div class="language-powershell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">powershell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">nvim sshd_config</span></span></code></pre></div><p>主要是修改 <code>HostKey</code> 位置才能正常启动 sshd，其他配置项根据实际情况自行配置</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>HostKey xxx/ssh_host_rsa_key</span></span>
<span class="line"><span>HostKey xxx/ssh_host_ecdsa_key</span></span>
<span class="line"><span>HostKey xxx/ssh_host_ed25519_key</span></span></code></pre></div><p>完整配置，我修改了 <code>HostKey</code> 并注释了最后的 <code>Match Group administrators</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#Port 22</span></span>
<span class="line"><span>#AddressFamily any</span></span>
<span class="line"><span>#ListenAddress 0.0.0.0</span></span>
<span class="line"><span>#ListenAddress ::</span></span>
<span class="line"><span></span></span>
<span class="line"><span>HostKey xxx/ssh_host_rsa_key</span></span>
<span class="line"><span>HostKey xxx/ssh_host_ecdsa_key</span></span>
<span class="line"><span>HostKey xxx/ssh_host_ed25519_key</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Ciphers and keying</span></span>
<span class="line"><span>#RekeyLimit default none</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Logging</span></span>
<span class="line"><span>#SyslogFacility AUTH</span></span>
<span class="line"><span>#LogLevel INFO</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Authentication:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#LoginGraceTime 2m</span></span>
<span class="line"><span>#PermitRootLogin prohibit-password</span></span>
<span class="line"><span>#StrictModes yes</span></span>
<span class="line"><span>#MaxAuthTries 6</span></span>
<span class="line"><span>#MaxSessions 10</span></span>
<span class="line"><span></span></span>
<span class="line"><span>PubkeyAuthentication yes</span></span>
<span class="line"><span></span></span>
<span class="line"><span># The default is to check both .ssh/authorized_keys and .ssh/authorized_keys2</span></span>
<span class="line"><span># but this is overridden so installations will only check .ssh/authorized_keys</span></span>
<span class="line"><span>AuthorizedKeysFile      .ssh/authorized_keys</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#AuthorizedPrincipalsFile none</span></span>
<span class="line"><span></span></span>
<span class="line"><span># For this to work you will also need host keys in %programData%/ssh/ssh_known_hosts</span></span>
<span class="line"><span>#HostbasedAuthentication no</span></span>
<span class="line"><span># Change to yes if you don&#39;t trust ~/.ssh/known_hosts for</span></span>
<span class="line"><span># HostbasedAuthentication</span></span>
<span class="line"><span>#IgnoreUserKnownHosts no</span></span>
<span class="line"><span># Don&#39;t read the user&#39;s ~/.rhosts and ~/.shosts files</span></span>
<span class="line"><span>#IgnoreRhosts yes</span></span>
<span class="line"><span></span></span>
<span class="line"><span># To disable tunneled clear text passwords, change to no here!</span></span>
<span class="line"><span>PasswordAuthentication yes</span></span>
<span class="line"><span>#PermitEmptyPasswords no</span></span>
<span class="line"><span></span></span>
<span class="line"><span># GSSAPI options</span></span>
<span class="line"><span>#GSSAPIAuthentication no</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#AllowAgentForwarding yes</span></span>
<span class="line"><span>#AllowTcpForwarding yes</span></span>
<span class="line"><span>#GatewayPorts no</span></span>
<span class="line"><span>#PermitTTY yes</span></span>
<span class="line"><span>#PrintMotd yes</span></span>
<span class="line"><span>#PrintLastLog yes</span></span>
<span class="line"><span>#TCPKeepAlive yes</span></span>
<span class="line"><span>#PermitUserEnvironment no</span></span>
<span class="line"><span>#Compression delayed</span></span>
<span class="line"><span>#ClientAliveInterval 0</span></span>
<span class="line"><span>#ClientAliveCountMax 3</span></span>
<span class="line"><span>#UseDNS no</span></span>
<span class="line"><span>#MaxStartups 10:30:100</span></span>
<span class="line"><span>#PermitTunnel no</span></span>
<span class="line"><span>#ChrootDirectory none</span></span>
<span class="line"><span>#VersionAddendum none</span></span>
<span class="line"><span></span></span>
<span class="line"><span># no default banner path</span></span>
<span class="line"><span>#Banner none</span></span>
<span class="line"><span></span></span>
<span class="line"><span># override default of no subsystems</span></span>
<span class="line"><span>Subsystem       sftp    sftp-server.exe</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Example of overriding settings on a per-user basis</span></span>
<span class="line"><span>#Match User anoncvs</span></span>
<span class="line"><span>#       AllowTcpForwarding no</span></span>
<span class="line"><span>#       PermitTTY no</span></span>
<span class="line"><span>#       ForceCommand cvs server</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#Match Group administrators</span></span>
<span class="line"><span>#       AuthorizedKeysFile __PROGRAMDATA__/ssh/administrators_authorized_keys</span></span></code></pre></div><h2 id="编写启动脚本" tabindex="-1">编写启动脚本 <a class="header-anchor" href="#编写启动脚本" aria-label="Permalink to &quot;编写启动脚本&quot;">​</a></h2><p>在解压出来的目录下编写一个启动脚本，方便启动</p><div class="language-powershell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">powershell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">nvim start_sshd.ps1</span></span></code></pre></div><div class="language-powershell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">powershell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># start_sshd.ps1</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">sshd.exe</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> -f</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> .</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">sshd_config</span></span></code></pre></div>`,22)]))}const g=n(i,[["render",l]]);export{k as __pageData,g as default};
