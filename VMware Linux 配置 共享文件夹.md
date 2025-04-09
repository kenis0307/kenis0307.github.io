# VMware Linux 配置 共享文件夹

## ubuntu desktop

### 安装 vm-tools

```bash
sudo apt update
sudo apt install open-vm-tools-desktop -y
```

### 虚拟机设置开启共享文件夹

设置-》选项-》共享文件夹-》总是启用-》添加-》主机路径-》名称（后面命令会用到这个名称）

### 命令行手动挂载

```bash
sudo mkdir /mnt/shared # 创建挂载路径
sudo vmhgfs-fuse .host:/shared /mnt/shared -o subtype=vmhgfs-fuse,allow_other
```

- 命令解释

  - vmhgfs-fuse

    - VMware 提供的工具，用于挂载 VMware 虚拟机中的共享文件夹。

  - .host:/shared

    - 表示共享文件夹的路径：
    - .host 指代主机系统。
    - /shared 是主机系统中共享文件夹的名称。

  - /mnt/shared

    - 挂载点，表示虚拟机中共享文件夹将被挂载到的路径。这里是 /mnt/shared。

  - -o subtype=vmhgfs-fuse,allow_other
    - -o 表示挂载选项，后面是具体的选项：
    - subtype=vmhgfs-fuse：指定文件系统的子类型为 vmhgfs-fuse。
    - allow_other：允许非挂载用户访问挂载的文件夹。

此命令的作用是将主机系统中的共享文件夹 /shared 挂载到虚拟机的 /mnt/shared 路径下，使虚拟机能够访问主机的共享文件夹内容。
