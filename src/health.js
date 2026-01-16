/**
 
 * @param {Object} character 
 * @param {string} character.name 
 * @param {number} character.health 
 * @returns {string} 
 * @throws {Error} 
 */
export function getHealthStatus(character) {
  if (!character || typeof character !== 'object') {
    throw new Error('Персонаж должен быть объектом');
  }

  const { health } = character;

  if (typeof health !== 'number') {
    throw new Error('Здоровье должно быть числом');
  }


  if (Number.isNaN(health)) {
    throw new Error('Здоровье не может быть NaN');
  }

  
  if (!Number.isFinite(health)) {
    throw new Error('Здоровье должно быть конечным числом');
  }

  
  if (health < 0 || health > 100) {
    throw new Error('Здоровье должно быть в диапазоне от 0 до 100');
  }

  if (health > 50) {
    return 'healthy';
  }

  if (health >= 15) {
    return 'wounded';
  }

  return 'critical';
}

export default getHealthStatus;