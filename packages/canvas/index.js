const DEFAULT_SETTINGS = { 
  textAlign: 'center',
  textBaseline: 'middle',
  font: '11px Arial',
  fillStyle: '#B7BDC6',
}
export function text(
  ctx,
  { 
    textAlign = DEFAULT_SETTINGS.textAlign,
    textBaseline =DEFAULT_SETTINGS.textBaseline,
    font =DEFAULT_SETTINGS.font,
    fillStyle = DEFAULT_SETTINGS.fillStyle,
  } = DEFAULT_SETTINGS) {
    return (text, x, y) => {
      ctx.textAlign = textAlign;
      ctx.textBaseline = textBaseline;
      ctx.font = font;
      ctx.fillStyle = fillStyle;
      ctx.fillText(text, x, y);
    };
}