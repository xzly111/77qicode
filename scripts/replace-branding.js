const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔄 开始全局替换品牌信息...\n');

// 1. 替换 MACRO.VERSION 为 "3.1"
console.log('📝 步骤 1: 替换版本号引用...');
try {
  execSync(`find src -type f \\( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \\) -exec sed -i "s/MACRO\\.VERSION/\\"3.1\\"/g" {} +`, {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit'
  });
  console.log('✅ 版本号替换完成\n');
} catch (e) {
  console.log('⚠️  版本号替换遇到问题，继续...\n');
}

// 2. 替换 "Claude Code" 为 "77qicode"
console.log('📝 步骤 2: 替换 Claude Code...');
try {
  execSync(`find src -type f \\( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \\) -exec sed -i "s/Claude Code/77qicode/g" {} +`, {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit'
  });
  console.log('✅ Claude Code 替换完成\n');
} catch (e) {
  console.log('⚠️  Claude Code 替换遇到问题，继续...\n');
}

// 3. 替换 "anycode" 为 "77qicode" (但保留 __anycode_ 开头的变量名)
console.log('📝 步骤 3: 替换 anycode...');
try {
  execSync(`find src -type f \\( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \\) -exec sed -i "s/\\([^_]\\)anycode/\\177qicode/g" {} +`, {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit'
  });
  console.log('✅ anycode 替换完成\n');
} catch (e) {
  console.log('⚠️  anycode 替换遇到问题，继续...\n');
}

console.log('🎉 全局替换完成！');
console.log('📦 请运行 npm run build 重新构建项目');
