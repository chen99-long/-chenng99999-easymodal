# EasyModal

一个简单易用的原生弹窗组件库，支持样式隔离和跨框架使用。

## ✨ 特性

- 🚀 **零依赖**：基于原生JavaScript，无需任何框架
- 🛡️ **样式隔离**：使用Shadow DOM技术，完全隔离样式
- 🎨 **多种主题**：内置默认、深色、简约三种主题
- 📱 **响应式设计**：完美适配移动端和桌面端
- ⚡ **TypeScript支持**：完整的类型定义
- 🎯 **插件友好**：专为浏览器插件开发优化
- 🔧 **易于使用**：简洁的API设计

## 📦 安装

```bash
npm install @chenng99999/easymodal
```

## 🚀 快速开始

### ES模块方式

```javascript
import { EasyModal } from '@chenng99999/easymodal';

// 显示提示弹窗
const result = await EasyModal.alert({
  title: '提示',
  content: '这是一个提示信息'
});

// 显示确认弹窗
const result = await EasyModal.confirm({
  title: '确认',
  content: '您确定要执行这个操作吗？'
});
```

### UMD方式（浏览器直接引入）

```html
<script src="https://unpkg.com/@chenng99999/easymodal/dist/index.js"></script>
<script>
  const EasyModal = window.EasyModal;

  EasyModal.alert({
    title: '提示',
    content: '这是一个提示信息'
  });
</script>
```

## 📖 API文档

### 基础方法

#### `EasyModal.alert(options)`
显示提示弹窗，只有确定按钮。

#### `EasyModal.confirm(options)`
显示确认弹窗，有确定和取消按钮。

#### `EasyModal.warning(options)`
显示警告弹窗，有警告和取消按钮。

#### `EasyModal.info(options)`
显示信息弹窗，只有确定按钮。

### 配置选项

```typescript
interface ModalOptions {
  // 基础配置
  title?: string;                    // 弹窗标题
  content: string | string[];        // 弹窗内容，支持HTML
  
  // 按钮文本
  confirmText?: string;              // 确认按钮文本，默认"确定"
  cancelText?: string;               // 取消按钮文本，默认"取消"
  warningText?: string;              // 警告按钮文本，默认"警告"
  
  // 样式配置
  theme?: 'default' | 'dark' | 'minimal';  // 主题
  width?: string | number;           // 弹窗宽度
  maxWidth?: string | number;        // 最大宽度
  
  // 行为配置
  countdown?: number;                // 倒计时秒数
  showClose?: boolean;               // 是否显示关闭按钮
  maskClosable?: boolean;            // 点击遮罩是否关闭
  escClosable?: boolean;             // 按ESC是否关闭
  
  // 回调函数
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
  onWarning?: () => void | Promise<void>;
  onClose?: () => void | Promise<void>;
  onOpen?: () => void | Promise<void>;
}
```

### 返回值

所有方法都返回Promise，resolve的值为：

```typescript
interface ModalResult {
  confirmed: boolean;                // 是否确认
  action: 'confirm' | 'cancel' | 'warning' | 'close';  // 用户操作
  statusCode?: number;               // 状态码（如果设置）
}
```

## 🎨 主题样式

我们提供了5种精美的主题，满足不同的设计需求：

### 🎨 默认主题 (Shadcn风格)
现代化的设计风格，清晰的层次结构，优雅的动画效果
```javascript
EasyModal.alert({
  title: '默认主题',
  content: '现代化的Shadcn设计风格',
  theme: 'default'  // 可省略，默认值
});
```

### 🌙 深色主题
优雅的暗色调界面，减少眼部疲劳，适合低光环境
```javascript
EasyModal.alert({
  title: '深色主题',
  content: '优雅的暗色调界面',
  theme: 'dark'
});
```

### ✨ 简约主题
注重简洁性，去除多余装饰，专注于内容本身
```javascript
EasyModal.alert({
  title: '简约主题',
  content: '简洁明了的设计',
  theme: 'minimal'
});
```

### 🔮 毛玻璃主题
现代的毛玻璃效果，创造层次丰富的视觉体验
```javascript
EasyModal.alert({
  title: '毛玻璃主题',
  content: '现代的毛玻璃效果',
  theme: 'glass'
});
```

### 🌈 DaisyUI主题
鲜明的色彩和圆润的设计，友好现代的用户体验
```javascript
EasyModal.alert({
  title: 'DaisyUI主题',
  content: '友好现代的用户体验',
  theme: 'daisyui'
});
```

## 🔧 高级用法

### 自定义弹窗
```javascript
const modal = PluginModal.create({
  type: 'custom',
  title: '自定义弹窗',
  content: '这是自定义内容',
  showClose: true
});

await modal.show();

// 动态更新内容
modal.updateContent('新的内容');
modal.updateTitle('新的标题');

// 手动关闭
modal.hide();
```

### 倒计时弹窗
```javascript
PluginModal.alert({
  title: '倒计时弹窗',
  content: '这个弹窗将在5秒后自动关闭',
  countdown: 5
});
```

### 异步操作
```javascript
const result = await PluginModal.confirm({
  title: '异步操作',
  content: '点击确定后将执行异步操作',
  onConfirm: async () => {
    // 执行异步操作
    await someAsyncOperation();
  }
});
```

### 多行内容
```javascript
PluginModal.alert({
  title: '多行内容',
  content: [
    '第一行内容',
    '第二行内容',
    '<strong>支持HTML标签</strong>'
  ]
});
```

## 🌟 为什么选择Plugin Modal Kit？

### 样式隔离
使用Shadow DOM技术，确保弹窗样式不会被页面样式影响，也不会影响页面样式。这对于浏览器插件开发尤其重要。

### 轻量级
零依赖，压缩后仅几KB大小，不会增加项目负担。

### 易于集成
支持ES模块、CommonJS、UMD等多种模块格式，可以在任何JavaScript环境中使用。

### 专为插件优化
考虑了插件开发的特殊需求，如样式隔离、跨域兼容等问题。

## 📝 许可证

MIT License

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 📞 支持

如果您在使用过程中遇到问题，请提交Issue或联系我们。
