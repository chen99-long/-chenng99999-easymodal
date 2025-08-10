# EasyModal - 快速开始

## 🚀 立即体验

1. **查看在线演示**
   ```bash
   npm run serve
   ```
   然后访问 http://127.0.0.1:8080

2. **基础使用**
   ```html
   <!-- 引入库文件 -->
   <script src="dist/index.js"></script>
   
   <script>
   // 获取EasyModal
   const EasyModal = window.EasyModal;

   // 显示提示弹窗
   EasyModal.alert({
     title: '提示',
     content: '操作成功！'
   });

   // 显示确认弹窗
   EasyModal.confirm({
     title: '确认',
     content: '确定要删除吗？'
   }).then(result => {
     if (result.confirmed) {
       console.log('用户确认了');
     }
   });
   </script>
   ```

## 📦 安装使用

### 方式1：npm安装
```bash
npm install easymodal
```

```javascript
import { EasyModal } from 'easymodal';

EasyModal.alert({
  title: '提示',
  content: '这是ES模块方式'
});
```

### 方式2：直接引入
```html
<script src="node_modules/easymodal/dist/index.js"></script>
<script>
  const EasyModal = window.EasyModal;

  EasyModal.alert({
    title: '提示',
    content: '这是UMD方式'
  });
</script>
```

## 🎯 核心特性

- ✅ **完全样式隔离** - 使用Shadow DOM，不受页面样式影响
- ✅ **零依赖** - 纯原生JavaScript实现
- ✅ **TypeScript支持** - 完整类型定义
- ✅ **多种弹窗类型** - alert、confirm、warning、info
- ✅ **五种主题** - default、dark、minimal、glass、daisyui
- ✅ **响应式设计** - 完美适配移动端
- ✅ **插件友好** - 专为浏览器插件开发优化

## 🔧 常用API

### 基础弹窗
```javascript
// 提示弹窗
await EasyModal.alert({
  title: '提示',
  content: '操作成功！'
});

// 确认弹窗
const result = await EasyModal.confirm({
  title: '确认删除',
  content: '确定要删除这个文件吗？'
});

// 警告弹窗
const result = await EasyModal.warning({
  title: '警告',
  content: '这个操作有风险！',
  warningText: '继续',
  cancelText: '取消'
});
```

### 高级配置
```javascript
// 倒计时弹窗
EasyModal.alert({
  title: '会话过期',
  content: '会话将在30秒后过期',
  countdown: 30
});

// 深色主题
EasyModal.confirm({
  title: '深色主题',
  content: '这是深色主题的弹窗',
  theme: 'dark'
});

// 毛玻璃主题
EasyModal.alert({
  title: '毛玻璃主题',
  content: '现代的毛玻璃效果',
  theme: 'glass'
});

// DaisyUI主题
EasyModal.warning({
  title: 'DaisyUI主题',
  content: '友好现代的用户体验',
  theme: 'daisyui'
});

// 自定义尺寸
EasyModal.alert({
  title: '自定义尺寸',
  content: '这是自定义宽度的弹窗',
  width: 500,
  maxWidth: '80%'
});

// 多行内容
EasyModal.alert({
  title: '多行内容',
  content: [
    '第一行内容',
    '第二行内容',
    '<strong>支持HTML</strong>'
  ]
});
```

### 事件回调
```javascript
EasyModal.confirm({
  title: '异步操作',
  content: '点击确定后将执行异步操作',
  onConfirm: async () => {
    console.log('开始异步操作');
    await someAsyncOperation();
    console.log('异步操作完成');
  },
  onCancel: () => {
    console.log('用户取消了操作');
  }
});
```

## 🌟 在插件中使用

### Chrome扩展示例
```javascript
// content.js
const EasyModal = window.EasyModal;

// 页面加载完成后显示通知
EasyModal.alert({
  title: '插件已激活',
  content: '页面加载完成，插件功能已启用！',
  theme: 'dark'
});

// 监听页面事件
document.addEventListener('click', async (e) => {
  if (e.target.matches('.delete-button')) {
    const result = await EasyModal.confirm({
      title: '确认删除',
      content: '确定要删除这个元素吗？',
      confirmText: '删除',
      cancelText: '取消'
    });

    if (result.confirmed) {
      e.target.remove();
      EasyModal.alert({
        content: '元素已删除！'
      });
    }
  }
});
```

## 🐛 故障排除

### 1. 弹窗不显示
- 检查是否正确引入了库文件
- 确认浏览器支持Shadow DOM
- 查看控制台是否有错误信息

### 2. 样式问题
- 确认使用了正确的主题
- 检查是否有自定义样式冲突
- 尝试使用不同的主题

### 3. 在插件中使用问题
- 确认manifest.json配置正确
- 检查CSP（内容安全策略）设置
- 确认文件路径正确

## 📚 更多资源

- 📖 [完整文档](README.md)
- 🔧 [详细使用指南](USAGE.md)
- 🎯 [在线演示](http://127.0.0.1:8080)
- 🐛 [调试页面](http://127.0.0.1:8080/debug.html)

## 💡 提示

- 使用 `debug.html` 页面可以快速测试和调试
- 查看浏览器控制台获取详细的错误信息
- 所有方法都返回Promise，可以使用async/await或.then()
- 弹窗会自动管理生命周期，无需手动清理
