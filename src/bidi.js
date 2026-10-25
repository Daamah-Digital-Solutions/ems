// Latin runs inside Arabic text (EMS, (PT), MyoStyle®, "EMS ElRiyadh").
// Wrapping each run in <bdi> stops the bidi algorithm from reordering it:
// multi-word brand runs stay one unit, and trailing punctuation stays outside
// (so "MyoStyle®." never renders as "®MyoStyle."). Used by the /refund-policy
// page and by policy/build.mjs, so the site and the PDFs isolate identically.
export const LATIN_RUN = /\(?[A-Za-z][A-Za-z0-9®]*(?: [A-Z][A-Za-z0-9®]*)*\)?/g
