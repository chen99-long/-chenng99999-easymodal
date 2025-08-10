# 更新日志

## [2.0.0] - 2025-08-10

### 🚀 重大更新 - 品牌重塑
- ✨ **项目重命名**：从 `plugin-modal-kit` 更名为 `easymodal`
- 🎯 **API重构**：`PluginModal` 类重命名为 `EasyModal`
- 📦 **包名更新**：npm包名更改为 `easymodal`
- 🌐 **全局变量**：UMD构建的全局变量从 `PluginModalKit` 改为 `EasyModal`
- 📚 **文档更新**：所有文档和示例都已更新为新的API

### 💔 破坏性变更
- 全局变量从 `window.PluginModalKit` 改为 `window.EasyModal`
- 类名从 `PluginModal` 改为 `EasyModal`
- 包名从 `plugin-modal-kit` 改为 `easymodal`

### 🔄 迁移指南
```javascript
// 旧版本
import { PluginModal } from 'plugin-modal-kit';
const modal = window.PluginModalKit;

// 新版本
import { EasyModal } from 'easymodal';
const modal = window.EasyModal;
```

## [1.1.0] - 2025-08-10

### 🎨 重大样式更新
- ✨ **全新设计系统**：采用现代化的Shadcn/UI设计风格
- 🌈 **新增主题**：增加了毛玻璃主题和DaisyUI主题
- 🎯 **五种精美主题**：default、dark、minimal、glass、daisyui
- 💫 **增强动画**：更流畅的过渡效果和微交互
- 🔮 **毛玻璃效果**：现代的backdrop-filter模糊效果
- 🌙 **改进深色主题**：更优雅的暗色调配色方案
- ✨ **简约主题优化**：更加简洁的设计语言
- 🎨 **DaisyUI风格**：友好的色彩和圆润的设计

### 🚀 新增功能
- 📱 **更好的响应式**：移动端体验大幅提升
- 🎭 **主题展示页面**：新增专门的主题对比页面
- 🔧 **增强配置**：更多的自定义选项
- ⚡ **性能优化**：更快的渲染和更小的包体积

### 📖 文档更新
- 📚 **新增示例页面**：themes.html 和 comparison.html
- 🎯 **更新文档**：完善的主题使用指南
- 🖼️ **视觉展示**：直观的主题对比界面

## [1.0.0] - 2025-08-10

### 新增功能
- ✨ 基于原生JavaScript的弹窗组件库
- 🛡️ 使用Shadow DOM实现完全样式隔离
- 🎨 内置三种主题：默认、深色、简约
- 📱 响应式设计，完美适配移动端
- ⚡ 完整的TypeScript类型支持
- 🎯 专为浏览器插件开发优化

### 核心特性
- **零依赖**：无需任何外部框架
- **样式隔离**：不会被页面样式影响，也不会影响页面
- **多种弹窗类型**：alert、confirm、warning、info、custom
- **丰富配置选项**：主题、尺寸、倒计时、回调等
- **键盘支持**：ESC关闭、Enter确认
- **动画效果**：平滑的显示/隐藏动画
- **多实例管理**：支持同时显示多个弹窗

### API方法
- `PluginModal.alert(options)` - 提示弹窗
- `PluginModal.confirm(options)` - 确认弹窗  
- `PluginModal.warning(options)` - 警告弹窗
- `PluginModal.info(options)` - 信息弹窗
- `PluginModal.create(options)` - 创建自定义弹窗
- `PluginModal.destroyAll()` - 销毁所有弹窗

### 配置选项
- `title` - 弹窗标题
- `content` - 弹窗内容（支持HTML和数组）
- `theme` - 主题样式（default/dark/minimal）
- `width/maxWidth` - 弹窗尺寸
- `countdown` - 倒计时自动关闭
- `confirmText/cancelText/warningText` - 按钮文本
- `showClose` - 是否显示关闭按钮
- `maskClosable` - 点击遮罩是否关闭
- `escClosable` - 按ESC是否关闭
- `onConfirm/onCancel/onWarning/onClose/onOpen` - 事件回调

### 构建输出
- `dist/index.js` - UMD格式，浏览器直接使用
- `dist/index.esm.js` - ES模块格式
- `dist/index.cjs.js` - CommonJS格式
- `dist/index.d.ts` - TypeScript类型定义

### 示例文件
- `examples/index.html` - 完整功能演示
- `examples/simple.html` - 简单使用示例
- `test.html` - 样式隔离测试

### 文档
- `README.md` - 项目介绍和基础使用
- `USAGE.md` - 详细使用指南和最佳实践
- `CHANGELOG.md` - 版本更新记录

### 技术栈
- TypeScript 5.0+
- Rollup 3.0+ (构建工具)
- Shadow DOM (样式隔离)
- 原生JavaScript (运行时)
