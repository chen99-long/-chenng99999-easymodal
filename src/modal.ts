import { ModalOptions, ModalInstance, ModalResult, ModalType } from './types';
import { getModalStyles } from './styles';

/**
 * 生成唯一ID
 */
function generateId(): string {
  return `modal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Modal实例类
 */
export class Modal implements ModalInstance {
  public readonly id: string;
  private options: ModalOptions;
  private element: HTMLElement;
  private shadowRoot: ShadowRoot;
  private resolvePromise?: (result: ModalResult) => void;
  private countdownTimer?: number;
  private countdownSeconds: number = 0;

  constructor(options: ModalOptions) {
    this.id = options.id || generateId();
    this.options = { ...this.getDefaultOptions(), ...options };
    this.element = this.createElement();
    this.shadowRoot = this.element.attachShadow({ mode: 'closed' });
    this.render();
    this.bindEvents();
  }

  private getDefaultOptions(): Partial<ModalOptions> {
    return {
      type: 'alert',
      title: '',
      confirmText: '确定',
      cancelText: '取消',
      warningText: '警告',
      theme: 'default',
      showClose: true,
      maskClosable: true,
      escClosable: true,
      width: 'auto',
      maxWidth: '500px'
    };
  }

  private createElement(): HTMLElement {
    const element = document.createElement('div');
    element.id = this.id;
    element.style.cssText = 'all: initial;';
    return element;
  }

  private render(): void {
    const { type, title, content, theme, showClose, width, maxWidth } = this.options;
    
    // 创建样式
    const style = document.createElement('style');
    style.textContent = getModalStyles(theme);
    
    // 创建HTML结构
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    
    const container = document.createElement('div');
    container.className = 'modal-container';
    
    if (width) {
      container.style.width = typeof width === 'number' ? `${width}px` : width;
    }
    if (maxWidth) {
      container.style.maxWidth = typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth;
    }
    
    // 标题栏
    if (title || showClose) {
      const header = document.createElement('div');
      header.className = 'modal-header';
      
      if (title) {
        const titleElement = document.createElement('h3');
        titleElement.className = 'modal-title';
        titleElement.textContent = title;
        header.appendChild(titleElement);
      }
      
      if (showClose) {
        const closeButton = document.createElement('button');
        closeButton.className = 'modal-close';
        closeButton.innerHTML = '×';
        closeButton.onclick = () => this.handleClose();
        header.appendChild(closeButton);
      }
      
      container.appendChild(header);
    }
    
    // 内容区域
    const body = document.createElement('div');
    body.className = 'modal-body';
    
    const contentElement = document.createElement('div');
    contentElement.className = 'modal-content';
    
    if (Array.isArray(content)) {
      contentElement.innerHTML = content.join('<br>');
    } else {
      contentElement.innerHTML = content;
    }
    
    body.appendChild(contentElement);
    container.appendChild(body);
    
    // 按钮区域
    const footer = this.createFooter();
    if (footer) {
      container.appendChild(footer);
    }
    
    overlay.appendChild(container);
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(overlay);
  }

  private createFooter(): HTMLElement | null {
    const { type, confirmText, cancelText, warningText } = this.options;
    
    if (type === 'custom') return null;
    
    const footer = document.createElement('div');
    footer.className = 'modal-footer';
    
    // 根据类型创建按钮
    if (type === 'confirm') {
      const cancelButton = this.createButton(cancelText!, 'cancel');
      const confirmButton = this.createButton(confirmText!, 'confirm', 'primary');
      footer.appendChild(cancelButton);
      footer.appendChild(confirmButton);
    } else if (type === 'alert' || type === 'info') {
      const confirmButton = this.createButton(confirmText!, 'confirm', 'primary');
      footer.appendChild(confirmButton);
    } else if (type === 'warning') {
      const cancelButton = this.createButton(cancelText!, 'cancel');
      const warningButton = this.createButton(warningText!, 'warning', 'warning');
      footer.appendChild(cancelButton);
      footer.appendChild(warningButton);
    }
    
    return footer;
  }

  private createButton(text: string, action: string, className?: string): HTMLElement {
    const button = document.createElement('button');
    button.className = `modal-button ${className || ''}`.trim();
    button.textContent = text;
    
    if (this.options.countdown && action === 'confirm') {
      const countdownSpan = document.createElement('span');
      countdownSpan.className = 'modal-countdown';
      button.appendChild(countdownSpan);
    }
    
    button.onclick = () => this.handleAction(action as any);
    return button;
  }

  private bindEvents(): void {
    // ESC键关闭
    if (this.options.escClosable) {
      document.addEventListener('keydown', this.handleKeydown);
    }
    
    // 点击遮罩关闭
    if (this.options.maskClosable) {
      const overlay = this.shadowRoot.querySelector('.modal-overlay');
      overlay?.addEventListener('click', (e) => {
        if (e.target === overlay) {
          this.handleClose();
        }
      });
    }
  }

  private handleKeydown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      this.handleClose();
    } else if (e.key === 'Enter' && this.options.type !== 'confirm') {
      this.handleAction('confirm');
    }
  };

  private handleAction(action: 'confirm' | 'cancel' | 'warning' | 'close'): void {
    const { onConfirm, onCancel, onWarning, onClose } = this.options;
    
    let callback: (() => void | Promise<void>) | undefined;
    
    switch (action) {
      case 'confirm':
        callback = onConfirm;
        break;
      case 'cancel':
        callback = onCancel;
        break;
      case 'warning':
        callback = onWarning;
        break;
      case 'close':
        callback = onClose;
        break;
    }
    
    // 执行回调
    if (callback) {
      const result = callback();
      if (result instanceof Promise) {
        result.then(() => this.close(action));
        return;
      }
    }
    
    this.close(action);
  }

  private handleClose(): void {
    this.handleAction('close');
  }

  private close(action: 'confirm' | 'cancel' | 'warning' | 'close'): void {
    this.clearCountdown();
    
    const result: ModalResult = {
      confirmed: action === 'confirm' || action === 'warning',
      action,
      statusCode: this.options.statusCode
    };
    
    if (this.resolvePromise) {
      this.resolvePromise(result);
    }
    
    this.hide().then(() => {
      this.destroy();
    });
  }

  public async show(): Promise<void> {
    document.body.appendChild(this.element);
    
    // 触发动画
    requestAnimationFrame(() => {
      const overlay = this.shadowRoot.querySelector('.modal-overlay');
      overlay?.classList.add('show');
    });
    
    // 启动倒计时
    if (this.options.countdown) {
      this.startCountdown();
    }
    
    // 执行打开回调
    if (this.options.onOpen) {
      await this.options.onOpen();
    }
  }

  public async hide(): Promise<void> {
    const overlay = this.shadowRoot.querySelector('.modal-overlay');
    overlay?.classList.remove('show');
    
    // 等待动画完成
    return new Promise(resolve => {
      setTimeout(resolve, 300);
    });
  }

  public destroy(): void {
    this.clearCountdown();
    document.removeEventListener('keydown', this.handleKeydown);
    
    if (this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
    
    // 从全局实例管理器中移除
    ModalManager.removeInstance(this.id);
  }

  public updateContent(content: string | string[]): void {
    const contentElement = this.shadowRoot.querySelector('.modal-content');
    if (contentElement) {
      if (Array.isArray(content)) {
        contentElement.innerHTML = content.join('<br>');
      } else {
        contentElement.innerHTML = content;
      }
    }
  }

  public updateTitle(title: string): void {
    const titleElement = this.shadowRoot.querySelector('.modal-title');
    if (titleElement) {
      titleElement.textContent = title;
    }
  }

  public setCountdown(seconds: number): void {
    this.countdownSeconds = seconds;
    this.startCountdown();
  }

  private startCountdown(): void {
    if (!this.options.countdown) return;
    
    this.countdownSeconds = this.options.countdown;
    this.updateCountdownDisplay();
    
    this.countdownTimer = window.setInterval(() => {
      this.countdownSeconds--;
      this.updateCountdownDisplay();
      
      if (this.countdownSeconds <= 0) {
        this.clearCountdown();
        this.handleAction('confirm');
      }
    }, 1000);
  }

  private updateCountdownDisplay(): void {
    const countdownElement = this.shadowRoot.querySelector('.modal-countdown');
    if (countdownElement) {
      countdownElement.textContent = `(${this.countdownSeconds}s)`;
    }
  }

  private clearCountdown(): void {
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
      this.countdownTimer = undefined;
    }
  }

  /**
   * 返回Promise，等待用户操作
   */
  public waitForResult(): Promise<ModalResult> {
    return new Promise((resolve) => {
      this.resolvePromise = resolve;
    });
  }
}

/**
 * Modal实例管理器
 */
class ModalManager {
  private static instances: Map<string, Modal> = new Map();

  static addInstance(modal: Modal): void {
    this.instances.set(modal.id, modal);
  }

  static removeInstance(id: string): void {
    this.instances.delete(id);
  }

  static getInstance(id: string): Modal | undefined {
    return this.instances.get(id);
  }

  static destroyAll(): void {
    this.instances.forEach(modal => modal.destroy());
    this.instances.clear();
  }

  static getActiveInstances(): Modal[] {
    return Array.from(this.instances.values());
  }
}

export { ModalManager };

/**
 * 静态方法类，提供便捷的弹窗调用方式
 */
export class EasyModal {
  /**
   * 显示确认对话框
   */
  static async confirm(options: Omit<ModalOptions, 'type'>): Promise<ModalResult> {
    const modal = new Modal({ ...options, type: 'confirm' });
    ModalManager.addInstance(modal);
    await modal.show();
    return modal.waitForResult();
  }

  /**
   * 显示提示对话框
   */
  static async alert(options: Omit<ModalOptions, 'type'>): Promise<ModalResult> {
    const modal = new Modal({ ...options, type: 'alert' });
    ModalManager.addInstance(modal);
    await modal.show();
    return modal.waitForResult();
  }

  /**
   * 显示信息对话框
   */
  static async info(options: Omit<ModalOptions, 'type'>): Promise<ModalResult> {
    const modal = new Modal({ ...options, type: 'info' });
    ModalManager.addInstance(modal);
    await modal.show();
    return modal.waitForResult();
  }

  /**
   * 显示警告对话框
   */
  static async warning(options: Omit<ModalOptions, 'type'>): Promise<ModalResult> {
    const modal = new Modal({ ...options, type: 'warning' });
    ModalManager.addInstance(modal);
    await modal.show();
    return modal.waitForResult();
  }

  /**
   * 创建自定义弹窗实例
   */
  static create(options: ModalOptions): Modal {
    const modal = new Modal(options);
    ModalManager.addInstance(modal);
    return modal;
  }

  /**
   * 销毁所有弹窗
   */
  static destroyAll(): void {
    ModalManager.destroyAll();
  }

  /**
   * 获取活跃的弹窗实例
   */
  static getActiveInstances(): Modal[] {
    return ModalManager.getActiveInstances();
  }
}
