import { toast } from 'sonner';

const errorStyle = {
  background: 'var(--toast-error-background)',
  color: 'var(--toast-error-color)',
};

const successStyle = {
  background: 'var(--toast-success-background)',
  color: 'var(--toast-success-color)',
};

export function toastError(message: string) {
  toast.error(message, { style: errorStyle });
}

export function toastSuccess(message: string) {
  toast.success(message, { style: successStyle });
}
