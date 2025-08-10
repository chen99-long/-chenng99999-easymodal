/**
 * 弹窗类型
 */
export type ModalType = 'confirm' | 'alert' | 'warning' | 'info' | 'custom';

/**
 * 弹窗主题
 */
export type ModalTheme = 'default' | 'dark' | 'minimal' | 'glass' | 'daisyui';

/**
 * 弹窗配置选项
 */
export interface ModalOptions {
  /** 弹窗唯一标识 */
  id?: string;
  
  /** 弹窗类型 */
  type?: ModalType;
  
  /** 弹窗标题 */
  title?: string;
  
  /** 弹窗内容，支持字符串或HTML */
  content: string | string[];
  
  /** 确认按钮文本 */
  confirmText?: string;
  
  /** 取消按钮文本 */
  cancelText?: string;
  
  /** 警告按钮文本 */
  warningText?: string;
  
  /** 倒计时秒数，到时自动关闭 */
  countdown?: number;
  
  /** 状态码，用于业务逻辑判断 */
  statusCode?: number;
  
  /** 主题样式 */
  theme?: ModalTheme;
  
  /** 是否显示关闭按钮 */
  showClose?: boolean;
  
  /** 点击遮罩是否关闭 */
  maskClosable?: boolean;
  
  /** 按ESC是否关闭 */
  escClosable?: boolean;
  
  /** 自定义CSS类名 */
  className?: string;
  
  /** 自定义样式 */
  customStyles?: Partial<CSSStyleDeclaration>;
  
  /** 弹窗宽度 */
  width?: string | number;
  
  /** 弹窗最大宽度 */
  maxWidth?: string | number;
  
  /** 确认回调 */
  onConfirm?: () => void | Promise<void>;
  
  /** 取消回调 */
  onCancel?: () => void | Promise<void>;
  
  /** 警告回调 */
  onWarning?: () => void | Promise<void>;
  
  /** 关闭回调 */
  onClose?: () => void | Promise<void>;
  
  /** 打开后回调 */
  onOpen?: () => void | Promise<void>;
}

/**
 * 弹窗实例接口
 */
export interface ModalInstance {
  /** 弹窗ID */
  id: string;
  
  /** 显示弹窗 */
  show(): Promise<void>;
  
  /** 隐藏弹窗 */
  hide(): Promise<void>;
  
  /** 销毁弹窗 */
  destroy(): void;
  
  /** 更新内容 */
  updateContent(content: string | string[]): void;
  
  /** 更新标题 */
  updateTitle(title: string): void;
  
  /** 设置倒计时 */
  setCountdown(seconds: number): void;
}

/**
 * 弹窗结果
 */
export interface ModalResult {
  /** 是否确认 */
  confirmed: boolean;
  
  /** 点击的按钮类型 */
  action: 'confirm' | 'cancel' | 'warning' | 'close';
  
  /** 状态码 */
  statusCode?: number;
}
