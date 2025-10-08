import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('nl-NL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function validatePostalCode(postalCode: string): boolean {
  const regex = /^[1-9][0-9]{3}\s?[A-Z]{2}$/;
  return regex.test(postalCode);
}

export function generateProjectCode(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 5);
  return `SCH-${timestamp}-${random}`.toUpperCase();
}

export function getPriorityColor(priority: 'hoog' | 'midden' | 'laag'): string {
  switch (priority) {
    case 'hoog':
      return 'text-red-600 bg-red-50 border-red-200';
    case 'midden':
      return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    case 'laag':
      return 'text-green-600 bg-green-50 border-green-200';
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200';
  }
}

export function getStatusColor(status: 'conform' | 'niet-conform' | 'onbekend'): string {
  switch (status) {
    case 'conform':
      return 'text-green-600 bg-green-50 border-green-200';
    case 'niet-conform':
      return 'text-red-600 bg-red-50 border-red-200';
    case 'onbekend':
      return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200';
  }
}
