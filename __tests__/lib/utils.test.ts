import { 
  formatDate, 
  formatFileSize, 
  validatePostalCode, 
  generateProjectCode,
  getPriorityColor,
  getStatusColor 
} from '@/lib/utils';

describe('Utils', () => {
  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date('2024-10-07T10:30:00Z');
      const formatted = formatDate(date);
      expect(formatted).toContain('2024');
      expect(formatted).toContain('oktober');
    });
  });

  describe('formatFileSize', () => {
    it('should format bytes correctly', () => {
      expect(formatFileSize(0)).toBe('0 Bytes');
      expect(formatFileSize(1024)).toBe('1 KB');
      expect(formatFileSize(1048576)).toBe('1 MB');
      expect(formatFileSize(1073741824)).toBe('1 GB');
    });
  });

  describe('validatePostalCode', () => {
    it('should validate Dutch postal codes', () => {
      expect(validatePostalCode('1234 AB')).toBe(true);
      expect(validatePostalCode('1234AB')).toBe(true);
      expect(validatePostalCode('0000 AB')).toBe(false); // Starts with 0
      expect(validatePostalCode('1234 XY')).toBe(false); // Invalid letters
      expect(validatePostalCode('12345 AB')).toBe(false); // Too long
    });
  });

  describe('generateProjectCode', () => {
    it('should generate unique codes', () => {
      const code1 = generateProjectCode();
      const code2 = generateProjectCode();
      
      expect(code1).toMatch(/^SCH-/);
      expect(code2).toMatch(/^SCH-/);
      expect(code1).not.toBe(code2);
    });
  });

  describe('getPriorityColor', () => {
    it('should return correct colors for priorities', () => {
      expect(getPriorityColor('hoog')).toContain('red');
      expect(getPriorityColor('midden')).toContain('yellow');
      expect(getPriorityColor('laag')).toContain('green');
    });
  });

  describe('getStatusColor', () => {
    it('should return correct colors for statuses', () => {
      expect(getStatusColor('conform')).toContain('green');
      expect(getStatusColor('niet-conform')).toContain('red');
      expect(getStatusColor('onbekend')).toContain('yellow');
    });
  });
});
