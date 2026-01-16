import { getHealthStatus } from '../src/health.js';

describe('getHealthStatus', () => {
  test('возвращает "healthy" для здоровья > 50', () => {
    expect(getHealthStatus({ name: 'Маг', health: 90 })).toBe('healthy');
    expect(getHealthStatus({ name: 'Маг', health: 51 })).toBe('healthy');
    expect(getHealthStatus({ name: 'Маг', health: 100 })).toBe('healthy');
  });

  test('возвращает "wounded" для здоровья от 15 до 50 включительно', () => {
    expect(getHealthStatus({ name: 'Маг', health: 50 })).toBe('wounded');
    expect(getHealthStatus({ name: 'Маг', health: 30 })).toBe('wounded');
    expect(getHealthStatus({ name: 'Маг', health: 15 })).toBe('wounded');
  });

  test('возвращает "critical" для здоровья < 15', () => {
    expect(getHealthStatus({ name: 'Маг', health: 14 })).toBe('critical');
    expect(getHealthStatus({ name: 'Маг', health: 10 })).toBe('critical');
    expect(getHealthStatus({ name: 'Маг', health: 0 })).toBe('critical');
  });

  test('работает без свойства name', () => {
    expect(getHealthStatus({ health: 90 })).toBe('healthy');
    expect(getHealthStatus({ health: 30 })).toBe('wounded');
    expect(getHealthStatus({ health: 10 })).toBe('critical');
  });

  test('работает с дополнительными свойствами', () => {
    expect(getHealthStatus({ name: 'Маг', health: 90, level: 10 })).toBe('healthy');
  });

  describe('валидация входных данных', () => {
    test('выбрасывает ошибку если не передан объект', () => {
      expect(() => getHealthStatus()).toThrow('Персонаж должен быть объектом');
      expect(() => getHealthStatus(null)).toThrow('Персонаж должен быть объектом');
      expect(() => getHealthStatus(undefined)).toThrow('Персонаж должен быть объектом');
      expect(() => getHealthStatus('string')).toThrow('Персонаж должен быть объектом');
      expect(() => getHealthStatus(123)).toThrow('Персонаж должен быть объектом');
    });

    test('выбрасывает ошибку если health не число', () => {
      expect(() => getHealthStatus({ health: '90' })).toThrow('Здоровье должно быть числом');
      expect(() => getHealthStatus({ health: null })).toThrow('Здоровье должно быть числом');
      expect(() => getHealthStatus({ health: undefined })).toThrow('Здоровье должно быть числом');
      expect(() => getHealthStatus({})).toThrow('Здоровье должно быть числом');
    });

    test('выбрасывает ошибку если health < 0', () => {
      expect(() => getHealthStatus({ health: -1 })).toThrow('Здоровье должно быть в диапазоне от 0 до 100');
      expect(() => getHealthStatus({ health: -0.1 })).toThrow('Здоровье должно быть в диапазоне от 0 до 100');
    });

    test('выбрасывает ошибку если health > 100', () => {
      expect(() => getHealthStatus({ health: 101 })).toThrow('Здоровье должно быть в диапазоне от 0 до 100');
      expect(() => getHealthStatus({ health: 100.1 })).toThrow('Здоровье должно быть в диапазоне от 0 до 100');
    });

    test('выбрасывает ошибку если health = NaN', () => {
      expect(() => getHealthStatus({ health: NaN })).toThrow('Здоровье не может быть NaN');
    });

    test('выбрасывает ошибку если health = Infinity', () => {
      expect(() => getHealthStatus({ health: Infinity })).toThrow('Здоровье должно быть конечным числом');
      expect(() => getHealthStatus({ health: -Infinity })).toThrow('Здоровье должно быть конечным числом');
    });
  });
});
