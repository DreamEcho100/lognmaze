const pAddScript = `
(function (s, u, z, p) {
  (s.src = u), s.setAttribute('data-zone', z), p.appendChild(s);
})(
  document.createElement('script'),
  'https://iclickcdn.com/tag.min.js',
  4990396,
  document.body || document.documentElement
);
`;

export default pAddScript;
