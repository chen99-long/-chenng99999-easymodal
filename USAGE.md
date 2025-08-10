# Plugin Modal Kit 使用指南

## 快速开始

### 1. 安装

```bash
npm install plugin-modal-kit
```

### 2. 基础使用

#### ES模块方式
```javascript
import { PluginModal } from 'plugin-modal-kit';

// 显示提示弹窗
await PluginModal.alert({
  title: '提示',
  content: '操作成功！'
});

// 显示确认弹窗
const result = await PluginModal.confirm({
  title: '确认',
  content: '确定要删除这个文件吗？'
});

if (result.confirmed) {
  console.log('用户确认了操作');
}
```

#### UMD方式（浏览器直接引入）
```html
<script src="node_modules/plugin-modal-kit/dist/index.js"></script>
<script>
  const { PluginModal } = window;
  
  PluginModal.alert({
    title: '提示',
    content: '这是一个提示信息'
  });
</script>
```

## 在浏览器插件中使用

### Manifest V3 插件

#### 1. 在 manifest.json 中配置
```json
{
  "manifest_version": 3,
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"]
    }
  ]
}
```

#### 2. 在 content script 中使用
```javascript
// content.js
import { PluginModal } from 'plugin-modal-kit';

// 页面加载完成后显示通知
PluginModal.alert({
  title: '插件已激活',
  content: '页面加载完成，插件功能已启用！',
  theme: 'dark'
});

// 监听页面事件
document.addEventListener('click', async (e) => {
  if (e.target.matches('.delete-button')) {
    const result = await PluginModal.confirm({
      title: '确认删除',
      content: '确定要删除这个元素吗？此操作不可撤销。',
      confirmText: '删除',
      cancelText: '取消'
    });
    
    if (result.confirmed) {
      e.target.remove();
      PluginModal.alert({
        content: '元素已删除！'
      });
    }
  }
});
```

### Manifest V2 插件

```javascript
// content.js
// 直接引入UMD版本
const script = document.createElement('script');
script.src = chrome.runtime.getURL('plugin-modal-kit.js');
document.head.appendChild(script);

script.onload = () => {
  const { PluginModal } = window;
  
  PluginModal.alert({
    title: '插件通知',
    content: '插件已成功加载！'
  });
};
```

## 常用场景示例

### 1. 表单验证提示
```javascript
function validateForm() {
  const email = document.getElementById('email').value;
  
  if (!email.includes('@')) {
    PluginModal.alert({
      title: '验证失败',
      content: '请输入有效的邮箱地址',
      theme: 'minimal'
    });
    return false;
  }
  
  return true;
}
```

### 2. 异步操作确认
```javascript
async function deleteUser(userId) {
  const result = await PluginModal.confirm({
    title: '删除用户',
    content: '确定要删除这个用户吗？此操作不可撤销。',
    confirmText: '删除',
    cancelText: '取消',
    onConfirm: async () => {
      // 显示加载状态
      PluginModal.alert({
        content: '正在删除用户...',
        countdown: 3
      });
    }
  });
  
  if (result.confirmed) {
    try {
      await api.deleteUser(userId);
      PluginModal.alert({
        title: '成功',
        content: '用户已删除'
      });
    } catch (error) {
      PluginModal.alert({
        title: '错误',
        content: '删除失败：' + error.message,
        theme: 'dark'
      });
    }
  }
}
```

### 3. 倒计时通知
```javascript
function showCountdownNotice() {
  PluginModal.alert({
    title: '会话即将过期',
    content: '您的会话将在30秒后过期，请及时保存数据',
    countdown: 30,
    onClose: () => {
      // 倒计时结束或用户关闭后的处理
      window.location.reload();
    }
  });
}
```

### 4. 多步骤操作
```javascript
async function multiStepProcess() {
  // 第一步：确认开始
  const start = await PluginModal.confirm({
    title: '开始处理',
    content: '即将开始数据处理，这可能需要几分钟时间'
  });
  
  if (!start.confirmed) return;
  
  // 第二步：选择处理方式
  const method = await PluginModal.warning({
    title: '选择处理方式',
    content: '选择快速处理（可能不够准确）还是完整处理？',
    warningText: '快速处理',
    cancelText: '完整处理'
  });
  
  // 第三步：显示结果
  const processingTime = method.confirmed ? '2分钟' : '10分钟';
  PluginModal.alert({
    title: '处理中',
    content: `正在进行${method.confirmed ? '快速' : '完整'}处理，预计需要${processingTime}`,
    countdown: 5
  });
}
```

## 样式隔离说明

Plugin Modal Kit 使用 Shadow DOM 技术实现完全的样式隔离：

1. **不会被页面样式影响**：弹窗的样式不会被页面的CSS规则覆盖
2. **不会影响页面样式**：弹窗的样式不会泄露到页面中
3. **完美适配插件开发**：特别适合在复杂的第三方网站中使用

### 自定义样式
```javascript
PluginModal.alert({
  title: '自定义样式',
  content: '这是自定义样式的弹窗',
  customStyles: {
    backgroundColor: '#f0f8ff',
    border: '2px solid #4169e1'
  }
});
```

## 最佳实践

### 1. 错误处理
```javascript
try {
  const result = await PluginModal.confirm({
    title: '确认操作',
    content: '确定要执行这个操作吗？'
  });
  
  if (result.confirmed) {
    // 执行操作
  }
} catch (error) {
  console.error('弹窗显示失败:', error);
}
```

### 2. 内存管理
```javascript
// 在页面卸载时清理所有弹窗
window.addEventListener('beforeunload', () => {
  PluginModal.destroyAll();
});
```

### 3. 响应式设计
```javascript
// 根据屏幕大小调整弹窗宽度
const isMobile = window.innerWidth < 768;

PluginModal.alert({
  title: '响应式弹窗',
  content: '这个弹窗会根据屏幕大小调整',
  width: isMobile ? '90%' : '400px'
});
```

## 故障排除

### 1. 弹窗不显示
- 检查是否正确引入了库
- 确认浏览器支持 Shadow DOM
- 检查控制台是否有错误信息

### 2. 样式问题
- 确认使用了正确的主题
- 检查是否有自定义样式冲突
- 尝试使用不同的主题

### 3. 在插件中使用问题
- 确认 manifest.json 配置正确
- 检查 CSP（内容安全策略）设置
- 确认文件路径正确

## 更多示例

查看 `examples/` 目录中的完整示例：
- `index.html` - 完整功能演示
- `simple.html` - 简单使用示例
