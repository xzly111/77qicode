#!/bin/bash
# 77qicode 健康检查脚本
# 用途：全面检查项目状态，确保所有组件正常工作

echo "🔍 77qicode 健康检查"
echo "=================================================="

# 检查 Node.js 版本
echo ""
echo "📦 环境检查"
echo "--------------------------------------------------"
node_version=$(node --version 2>/dev/null)
if [ $? -eq 0 ]; then
  echo "✓ Node.js: $node_version"
  # 检查版本是否满足要求 (>=18)
  major_version=$(echo $node_version | cut -d'v' -f2 | cut -d'.' -f1)
  if [ "$major_version" -ge 18 ]; then
    echo "  └─ 版本满足要求 (>=18.0.0)"
  else
    echo "  └─ ⚠️  版本过低，需要 >=18.0.0"
  fi
else
  echo "✗ Node.js 未安装"
fi

npm_version=$(npm --version 2>/dev/null)
if [ $? -eq 0 ]; then
  echo "✓ npm: v$npm_version"
else
  echo "✗ npm 未安装"
fi

# 检查项目结构
echo ""
echo "📁 项目结构检查"
echo "--------------------------------------------------"

PROJECT_ROOT="/c/Users/Administrator/Desktop/31mg/21"
cd "$PROJECT_ROOT" 2>/dev/null || { echo "✗ 无法进入项目目录"; exit 1; }

if [ -f "package.json" ]; then
  project_name=$(cat package.json | grep '"name"' | head -1 | cut -d'"' -f4)
  project_version=$(cat package.json | grep '"version"' | head -1 | cut -d'"' -f4)
  echo "✓ package.json: $project_name v$project_version"
else
  echo "✗ package.json 不存在"
fi

if [ -d "src" ]; then
  src_size=$(du -sh src 2>/dev/null | cut -f1)
  echo "✓ src/ 目录: $src_size"
else
  echo "✗ src/ 目录不存在"
fi

if [ -d "node_modules" ]; then
  modules_count=$(find node_modules -maxdepth 1 -type d 2>/dev/null | wc -l)
  modules_size=$(du -sh node_modules 2>/dev/null | cut -f1)
  echo "✓ node_modules/: $modules_count 个包, $modules_size"
else
  echo "✗ node_modules/ 目录不存在，需要运行 npm install"
fi

# 检查构建状态
echo ""
echo "🔨 构建状态检查"
echo "--------------------------------------------------"

if [ -f "dist/cli.js" ]; then
  dist_size=$(du -h dist/cli.js 2>/dev/null | cut -f1)
  dist_date=$(stat -c %y dist/cli.js 2>/dev/null | cut -d' ' -f1)
  echo "✓ 构建文件: dist/cli.js ($dist_size)"
  echo "  └─ 构建时间: $dist_date"
else
  echo "✗ 构建文件不存在，需要运行 npm run build"
fi

if [ -f "bin/77qicode" ]; then
  echo "✓ 启动脚本: bin/77qicode"
else
  echo "✗ 启动脚本不存在"
fi

# 检查 CLI 功能
echo ""
echo "⚙️  CLI 功能检查"
echo "--------------------------------------------------"

if [ -f "dist/cli.js" ]; then
  cli_version=$(node dist/cli.js --version 2>&1)
  if [ $? -eq 0 ]; then
    echo "✓ CLI 版本: $cli_version"
  else
    echo "✗ CLI 无法运行"
  fi
else
  echo "⊘ 跳过 CLI 测试（构建文件不存在）"
fi

# 检查 API 配置
echo ""
echo "🔑 API 配置检查"
echo "--------------------------------------------------"

if [ -f "$HOME/.77qicode/provider.json" ]; then
  provider=$(cat "$HOME/.77qicode/provider.json" | grep '"provider"' | cut -d'"' -f4)
  model=$(cat "$HOME/.77qicode/provider.json" | grep '"model"' | cut -d'"' -f4)
  echo "✓ API 提供商: $provider"
  echo "  └─ 模型: $model"
else
  echo "⚠️  API 未配置 (~/.77qicode/provider.json 不存在)"
fi

# 检查 MCP 集成
echo ""
echo "🔌 MCP 服务器检查"
echo "--------------------------------------------------"

if [ -f ".mcp.json" ]; then
  echo "✓ MCP 配置文件: .mcp.json"

  if [ -f "mcp-servers/claude-historian/dist/index.js" ]; then
    mcp_size=$(du -h mcp-servers/claude-historian/dist/index.js 2>/dev/null | cut -f1)
    echo "✓ claude-historian 服务器: 已构建 ($mcp_size)"
  else
    echo "✗ claude-historian 服务器未构建"
  fi
else
  echo "⚠️  MCP 配置文件不存在"
fi

# 检查配置目录
echo ""
echo "📂 配置目录检查"
echo "--------------------------------------------------"

if [ -d "$HOME/.77qicode" ]; then
  config_size=$(du -sh "$HOME/.77qicode" 2>/dev/null | cut -f1)
  echo "✓ 配置目录: ~/.77qicode ($config_size)"

  # 检查子目录
  for dir in cache sessions telemetry shell-snapshots; do
    if [ -d "$HOME/.77qicode/$dir" ]; then
      dir_size=$(du -sh "$HOME/.77qicode/$dir" 2>/dev/null | cut -f1)
      file_count=$(find "$HOME/.77qicode/$dir" -type f 2>/dev/null | wc -l)
      echo "  ├─ $dir/: $file_count 个文件, $dir_size"
    fi
  done
else
  echo "⚠️  配置目录不存在"
fi

# 检查 Claude 历史记录
echo ""
echo "📜 对话历史检查"
echo "--------------------------------------------------"

if [ -d "$HOME/.claude/projects" ]; then
  history_size=$(du -sh "$HOME/.claude/projects" 2>/dev/null | cut -f1)
  session_count=$(find "$HOME/.claude/projects" -name "*.jsonl" 2>/dev/null | wc -l)
  echo "✓ 历史记录: $session_count 个会话, $history_size"
else
  echo "⚠️  历史记录目录不存在"
fi

# 总结
echo ""
echo "=================================================="
echo "✅ 健康检查完成"
echo ""

# 返回状态码
if [ -f "dist/cli.js" ] && [ -f "$HOME/.77qicode/provider.json" ]; then
  echo "状态: 🟢 正常 - 所有核心组件运行正常"
  exit 0
else
  echo "状态: 🟡 警告 - 部分组件需要配置"
  exit 1
fi
