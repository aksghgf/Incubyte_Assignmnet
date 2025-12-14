// Toast notification helper
let toastTimeout: NodeJS.Timeout | null = null;

export const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    // Remove existing toast
    const existingToast = document.getElementById('custom-toast');
    if (existingToast) {
        existingToast.remove();
    }
    if (toastTimeout) {
        clearTimeout(toastTimeout);
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.id = 'custom-toast';
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .toast {
            position: fixed;
            top: 24px;
            right: 24px;
            padding: 18px 28px;
            border-radius: 12px;
            color: white;
            font-weight: 600;
            font-size: 0.95rem;
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6);
            z-index: 10000;
            animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            min-width: 320px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
        }

        .toast-success {
            background: linear-gradient(135deg, #06d6a0 0%, #059669 100%);
        }

        .toast-error {
            background: linear-gradient(135deg, #ef476f 0%, #c9184a 100%);
        }

        .toast-info {
            background: linear-gradient(135deg, #ff6b9d 0%, #c9184a 100%);
        }

        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;

    if (!document.getElementById('toast-styles')) {
        style.id = 'toast-styles';
        document.head.appendChild(style);
    }

    // Add to document
    document.body.appendChild(toast);

    // Auto remove after 3 seconds
    toastTimeout = setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
};
