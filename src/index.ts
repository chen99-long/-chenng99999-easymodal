/**
 * EasyModal - 简单易用的原生弹窗组件库
 *
 * 特性：
 * - 基于原生JavaScript，无框架依赖
 * - 使用Shadow DOM实现样式隔离
 * - 支持多种弹窗类型和主题
 * - 响应式设计，移动端友好
 * - TypeScript支持
 * - 简单易用的API
 */

// 导出所有类型定义
export * from './types';

// 导出核心类
export { Modal, ModalManager, EasyModal } from './modal';

// 导出样式工具
export { getModalStyles } from './styles';

// 导入EasyModal用于全局声明
import { EasyModal } from './modal';

// 全局变量声明（用于UMD构建）
declare global {
  interface Window {
    EasyModal: typeof EasyModal;
  }
}

// 如果在浏览器环境中，将API挂载到全局对象
if (typeof window !== 'undefined') {
  window.EasyModal = EasyModal;
}
