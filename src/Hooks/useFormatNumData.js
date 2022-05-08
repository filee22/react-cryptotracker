export default function useFormatNumdata(handler, max, resp) {
  return handler == null
    ? resp
    : (handler < max && handler >= 0.01) || (handler > -max && handler <= -0.01)
    ? handler.toLocaleString(undefined, {
        minimumFractionDigits: 4,
        maximumFractionDigits: 4,
      })
    : (handler < 0.01 && handler >= 0.001) ||
      (handler > -0.01 && handler <= -0.001)
    ? handler.toLocaleString(undefined, {
        minimumFractionDigits: 6,
        maximumFractionDigits: 6,
      })
    : (handler < 0.001 && handler >= 0.0001) ||
      (handler > -0.001 && handler <= -0.0001)
    ? handler.toLocaleString(undefined, {
        minimumFractionDigits: 7,
        maximumFractionDigits: 7,
      })
    : handler < 0.0001 && handler > -0.0001
    ? handler.toLocaleString(undefined, {
        minimumFractionDigits: 8,
        maximumFractionDigits: 8,
      })
    : handler.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
}
