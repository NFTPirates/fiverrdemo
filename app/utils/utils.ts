export function formatNumberToString(props: {
    numberToFormat?: number;
}): string {
    if (!props?.numberToFormat) {
        return '';
    }

    return new Intl.NumberFormat('en-US', {
        maximumSignificantDigits: 7,
    }).format(props.numberToFormat);
}

export function formatNumberToPercentageString(props: {
    numberToFormat?: number;
}): string {
    if (!props?.numberToFormat) {
        return '';
    }

    const res = new Intl.NumberFormat('default', {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(props.numberToFormat / 100);

    return res;
}
