#!/bin/bash
# ==============================================================================
# Farmers Mill - Linux Kernel & Sysctl Tuning for 10,000+ Concurrent Web Sockets
# Run as root: sudo bash linux-sysctl-10k-tuning.sh
# ==============================================================================

echo "🚀 Applying Linux Kernel & Sysctl parameters for 10,000+ concurrent connections..."

# Append kernel parameters to /etc/sysctl.conf
cat << 'EOF' >> /etc/sysctl.conf

# --- Farmers Mill High Concurrency Tuning ---
# Maximum number of open files across the system
fs.file-max = 2097152

# Maximum socket listen queue backlog
net.core.somaxconn = 65535
net.ipv4.tcp_max_syn_backlog = 65535

# Fast TCP connection recycling and port reuse
net.ipv4.tcp_tw_reuse = 1
net.ipv4.tcp_fin_timeout = 15

# Expand outgoing local port range
net.ipv4.ip_local_port_range = 1024 65535

# Increase socket read/write buffer limits
net.core.rmem_max = 16777216
net.core.wmem_max = 16777216
net.ipv4.tcp_rmem = 4096 87380 16777216
net.ipv4.tcp_wmem = 4096 65536 16777216

# Increase network device queue
net.core.netdev_max_backlog = 16384
EOF

# Reload sysctl settings immediately
sysctl -p

# Update user limits for open file descriptors (/etc/security/limits.conf)
cat << 'EOF' >> /etc/security/limits.conf
* soft nofile 65535
* hard nofile 65535
root soft nofile 65535
root hard nofile 65535
www-data soft nofile 65535
www-data hard nofile 65535
EOF

echo "✅ Sysctl parameters applied successfully. Max open file descriptors set to 65535."
