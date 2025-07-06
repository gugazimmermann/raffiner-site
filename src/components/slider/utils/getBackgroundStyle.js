function getBackgroundStyle(banner) {
  if (banner.backgroundImage) {
    return {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${banner.backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    };
  } else if (banner.gradient) {
    return {
      background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
    };
  } else {
    return {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    };
  }
}

export default getBackgroundStyle;
