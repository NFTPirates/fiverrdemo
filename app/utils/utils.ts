export function formatNumberToString(props: {
    numberToFormat?: number;
}): string {
    if (!props?.numberToFormat) {
        return '';
    }

    return new Intl.NumberFormat('en-IN', {
        maximumSignificantDigits: 5,
    }).format(props.numberToFormat);
}
