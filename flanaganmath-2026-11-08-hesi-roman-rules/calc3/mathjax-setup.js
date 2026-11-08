/* Flanagan Math - MathJax setup, shared by every page with math.
   To change the MathJax version for the whole site, change it here only. */

// Lets the page start with its sections closed (only when scripts are running).
document.documentElement.classList.add('js');

window.MathJax = {
  tex: {
    macros: {
      // The dot product symbol for the whole site (\bullet, as in the notes).
      dotp: '\\bullet'
    }
  },
  output: {
    // Equations sit on the left, like the notes (the indent is set in style.css).
    displayAlign: 'left',
    // Solutions are written with short lines, one step per line. If a line is still too wide
    // for a small phone (for example the distance formula), it is shrunk just enough to fit,
    // so no equation is ever broken in the middle or makes the page scroll sideways.
    displayOverflow: 'scale',
    // Same math size everywhere, including inside solutions that start out closed,
    // set slightly larger than MathJax's default so it sits well next to the text.
    matchFontHeight: false,
    scale: 1.1,
    linebreaks: { inline: false }
  }
};

(function () {
  var script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/mathjax@4.1.3/tex-chtml.js';
  script.defer = true;
  document.head.appendChild(script);
})();
