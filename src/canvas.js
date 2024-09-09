const defaultTextSettings = { 
  textAlign: 'center',
  textBaseline: 'middle',
  font: '11px Arial',
  fillStyle: '#B7BDC6',
}
export function text(
  ctx,
  { 
    textAlign = defaultTextSettings.textAlign,
    textBaseline = defaultTextSettings.textBaseline,
    font = defaultTextSettings.font,
    fillStyle = defaultTextSettings.fillStyle,
  } = defaultTextSettings) {
    return (text, x, y) => {
      ctx.textAlign = textAlign;
      ctx.textBaseline = textBaseline;
      ctx.font = font;
      ctx.fillStyle = fillStyle;
      ctx.fillText(text, x, y);
    }
}