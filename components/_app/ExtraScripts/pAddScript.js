const pAddScript = `
(function (s, u, z, p) {
  (s.src = u), s.setAttribute('data-zone', z), p.appendChild(s);
})(
  document.createElement('script'),
  'https://iclickcdn.com/tag.min.js',
  4990427,
  document.body || document.documentElement
);
`;

export default pAddScript;
