export function formatDate(isoString: string) {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const day = date.getDate().toString().padStart(2, '0');
    const months = ['янв.', 'февр.', 'март', 'апр.', 'май', 'июнь', 'июль', 'авг.', 'сент.', 'окт.', 'нояб.', 'дек.'];
    const month = months[date.getMonth()];
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
  
    return {day, month, year, hours, minutes};
}