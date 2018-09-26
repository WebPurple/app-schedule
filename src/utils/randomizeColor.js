const availableColors = ['lipstick', 'vividPurple', 'grape', 'cerise', 'warmPurple', 'rouge'];

export const randomizeColor = value => {
    const title = typeof value === 'string' ? value : value.title;
    const randomIndex = title.length % availableColors.length;
    return availableColors[randomIndex];
};
