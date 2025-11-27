export function formatDate(dateString: string | undefined): string {
    if (!dateString) return '';

    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
}

export function formatDateRange(startDate: string | undefined, endDate: string | undefined): string {
    if (!startDate || !endDate) return '';

    const start = new Date(startDate);
    const end = new Date(endDate);

    const startMonth = start.toLocaleDateString('en-US', { month: 'long' });
    const endMonth = end.toLocaleDateString('en-US', { month: 'long' });
    const startDay = start.getDate();
    const endDay = end.getDate();
    const startYear = start.getFullYear();
    const endYear = end.getFullYear();

    // Same month and year
    if (startMonth === endMonth && startYear === endYear) {
        return `${startMonth} ${startDay}–${endDay}, ${startYear}`;
    }

    // Same year, different months
    if (startYear === endYear) {
        return `${startMonth} ${startDay} – ${endMonth} ${endDay}, ${startYear}`;
    }

    // Different years
    return `${startMonth} ${startDay}, ${startYear} – ${endMonth} ${endDay}, ${endYear}`;
}
