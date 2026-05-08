export const formatPostedAt = (dateString) => {
    if (!dateString) return { date: 'Unknown', time: '' };
    
    const [isoDate] = dateString.split(' ');
    const date = new Date(isoDate);

    if (Number.isNaN(date.getTime())) {
        return {
            date: dateString,
            time: '',
        };
    }

    return {
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        }),
    };
};

export const extractDomain = (url) => {
    try {
        return new URL(url).hostname.replace('www.', '');
    } catch {
        return 'Source unavailable';
    }
};
