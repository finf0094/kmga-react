export const getStatusText = (status: string) => {
    switch (status) {
        case 'DRAFT':
            return 'Draft';
        case 'ACTIVE':
            return 'Active';
        case 'INACTIVE':
            return 'Inactive';
        default:
            return status; // Возвращает исходный статус, если он не соответствует ни одному из кейсов
    }
};