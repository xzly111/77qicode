#!/bin/bash
# 77qicode 缓存清理脚本
# 用途：清理超过指定天数的缓存文件，释放磁盘空间

echo "🧹 开始清理 77qicode 缓存..."
echo "================================"

# 清理超过 7 天的缓存文件
if [ -d "$HOME/.77qicode/cache" ]; then
  cache_count=$(find "$HOME/.77qicode/cache" -type f -mtime +7 2>/dev/null | wc -l)
  if [ "$cache_count" -gt 0 ]; then
    find "$HOME/.77qicode/cache" -type f -mtime +7 -delete 2>/dev/null
    echo "✓ 已清理 $cache_count 个缓存文件 (>7天)"
  else
    echo "✓ 缓存目录无需清理"
  fi
fi

# 清理超过 30 天的会话文件
if [ -d "$HOME/.77qicode/sessions" ]; then
  session_count=$(find "$HOME/.77qicode/sessions" -type f -mtime +30 2>/dev/null | wc -l)
  if [ "$session_count" -gt 0 ]; then
    find "$HOME/.77qicode/sessions" -type f -mtime +30 -delete 2>/dev/null
    echo "✓ 已清理 $session_count 个会话文件 (>30天)"
  else
    echo "✓ 会话目录无需清理"
  fi
fi

# 清理超过 7 天的遥测数据
if [ -d "$HOME/.77qicode/telemetry" ]; then
  telemetry_count=$(find "$HOME/.77qicode/telemetry" -type f -mtime +7 2>/dev/null | wc -l)
  if [ "$telemetry_count" -gt 0 ]; then
    find "$HOME/.77qicode/telemetry" -type f -mtime +7 -delete 2>/dev/null
    echo "✓ 已清理 $telemetry_count 个遥测文件 (>7天)"
  else
    echo "✓ 遥测目录无需清理"
  fi
fi

# 清理超过 14 天的 shell 快照
if [ -d "$HOME/.77qicode/shell-snapshots" ]; then
  snapshot_count=$(find "$HOME/.77qicode/shell-snapshots" -type f -mtime +14 2>/dev/null | wc -l)
  if [ "$snapshot_count" -gt 0 ]; then
    find "$HOME/.77qicode/shell-snapshots" -type f -mtime +14 -delete 2>/dev/null
    echo "✓ 已清理 $snapshot_count 个 shell 快照 (>14天)"
  else
    echo "✓ Shell 快照目录无需清理"
  fi
fi

# 显示清理后的磁盘使用情况
if [ -d "$HOME/.77qicode" ]; then
  total_size=$(du -sh "$HOME/.77qicode" 2>/dev/null | cut -f1)
  echo ""
  echo "当前 77qicode 目录大小: $total_size"
fi

echo "================================"
echo "✅ 缓存清理完成"
