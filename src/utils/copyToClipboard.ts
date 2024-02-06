export const copyToClipboard = async (text: string) => {
    try {
        await navigator.clipboard.writeText(text);
        alert('уникальный токен скопирован: ' + text); // Опционально: показать уведомление об успешном копировании
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
}