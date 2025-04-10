# Windows 手动安装 OpenSSH Server 到任何地方

## Github Release 下载 zip 包

https://github.com/PowerShell/Win32-OpenSSH/releases/download/v9.8.2.0p2-Preview/OpenSSH-Win64.zip

可以使用 Github Proxy 加速下载：https://github.akams.cn/

## 随意解压到任意路径

```powshell
7z x OpenSSH-Win64.zip
```

- 后续操作不需要管理员权限，普通的 powershell 即可
- 不使用自带的 install-sshd.ps1 安装成服务
- 可以将自己写的启动脚本设置成开机自动启动也可以实现跟系统服务同样的效果

## 生成密钥

需要生成三个类型的密钥（rsa、ecdsa、ed25519）

密钥保存的路径需要填写到配置文件里的

```powershell

# cd zip包解压出来的目录 or 将解压出来的目录添加到环境变量

.\ssh-keygen.exe -t rsa -f "xxx\ssh_host_rsa_key"
.\ssh-keygen.exe -t ecdsa -f "xxx\ssh_host_ecdsa_key"
.\ssh-keygen.exe -t ed25519 -f "xxx\ssh_host_ed25519_key"

```

## 编写配置文件

直接复制解压出来的 sshd_config_default 为 sshd_config

```powershell
cp sshd_config_default sshd_config

nvim sshd_config
```

主要是修改 `HostKey` 位置才能正常启动 sshd，其他配置项根据实际情况自行配置

```
HostKey xxx/ssh_host_rsa_key
HostKey xxx/ssh_host_ecdsa_key
HostKey xxx/ssh_host_ed25519_key
```

完整配置，我修改了 `HostKey` 并注释了最后的 `Match Group administrators`

```
#Port 22
#AddressFamily any
#ListenAddress 0.0.0.0
#ListenAddress ::

HostKey xxx/ssh_host_rsa_key
HostKey xxx/ssh_host_ecdsa_key
HostKey xxx/ssh_host_ed25519_key

# Ciphers and keying
#RekeyLimit default none

# Logging
#SyslogFacility AUTH
#LogLevel INFO

# Authentication:

#LoginGraceTime 2m
#PermitRootLogin prohibit-password
#StrictModes yes
#MaxAuthTries 6
#MaxSessions 10

PubkeyAuthentication yes

# The default is to check both .ssh/authorized_keys and .ssh/authorized_keys2
# but this is overridden so installations will only check .ssh/authorized_keys
AuthorizedKeysFile      .ssh/authorized_keys

#AuthorizedPrincipalsFile none

# For this to work you will also need host keys in %programData%/ssh/ssh_known_hosts
#HostbasedAuthentication no
# Change to yes if you don't trust ~/.ssh/known_hosts for
# HostbasedAuthentication
#IgnoreUserKnownHosts no
# Don't read the user's ~/.rhosts and ~/.shosts files
#IgnoreRhosts yes

# To disable tunneled clear text passwords, change to no here!
PasswordAuthentication yes
#PermitEmptyPasswords no

# GSSAPI options
#GSSAPIAuthentication no

#AllowAgentForwarding yes
#AllowTcpForwarding yes
#GatewayPorts no
#PermitTTY yes
#PrintMotd yes
#PrintLastLog yes
#TCPKeepAlive yes
#PermitUserEnvironment no
#Compression delayed
#ClientAliveInterval 0
#ClientAliveCountMax 3
#UseDNS no
#MaxStartups 10:30:100
#PermitTunnel no
#ChrootDirectory none
#VersionAddendum none

# no default banner path
#Banner none

# override default of no subsystems
Subsystem       sftp    sftp-server.exe

# Example of overriding settings on a per-user basis
#Match User anoncvs
#       AllowTcpForwarding no
#       PermitTTY no
#       ForceCommand cvs server

#Match Group administrators
#       AuthorizedKeysFile __PROGRAMDATA__/ssh/administrators_authorized_keys
```

## 编写启动脚本

在解压出来的目录下编写一个启动脚本，方便启动

```powershell
nvim start_sshd.ps1
```

```powershell
# start_sshd.ps1
./sshd.exe -f ./sshd_config
```
