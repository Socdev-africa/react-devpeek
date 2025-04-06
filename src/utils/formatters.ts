export function tryParseJSON(jsonString: string): any {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    return jsonString;
  }
}

export function formatValue(value: any): string {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  
  if (typeof value === 'object') {
    try {
      return JSON.stringify(value);
    } catch (e) {
      return '[Complex Object]';
    }
  }
  
  return String(value);
}

export function truncateString(str: string, maxLength: number = 50): string {
  if (str.length <= maxLength) return str;
  return `${str.substring(0, maxLength)}...`;
}

export function isDevelopment(): boolean {
  return import.meta.env.MODE === 'development';
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  
  return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
}

export function getStringByteSize(str: string): number {
  return new Blob([str]).size;
}