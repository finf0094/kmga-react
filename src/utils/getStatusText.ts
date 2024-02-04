export const getStatusText = (status: string) => {
    switch (status) {
        case 'DRAFT':
            return 'Черновик';
        case 'ACTIVE':
            return 'Активный';
        case 'INACTIVE':
            return 'Неактивный';
        default:
            return status; // Возвращает исходный статус, если он не соответствует ни одному из кейсов
    }
};