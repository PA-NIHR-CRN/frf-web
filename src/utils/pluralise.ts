export const pluralise = (text: string, totalItems: number) => `${text}${totalItems === 1 ? '' : 's'}`
