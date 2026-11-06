/* Flanagan Math - open and close sections and worked solutions.
   Without this script, every section and solution simply stays visible. */

(function () {
  // ---- Worked solutions -------------------------------------------------
  function setSolution(example, open) {
    // The class only collapses the part; it keeps its width so long equations lay out correctly.
    example.querySelectorAll('.work').forEach(function (part) { part.classList.toggle('collapsed', !open); });
    var button = example.querySelector('.toggle');
    button.setAttribute('aria-expanded', open ? 'true' : 'false');
    button.textContent = (open ? 'Hide ' : 'Show ') + button.dataset.what;
  }

  document.querySelectorAll('.example').forEach(function (example) {
    var button = example.querySelector('.toggle');
    if (!button) return;
    button.hidden = false;
    setSolution(example, false);
    button.addEventListener('click', function () {
      setSolution(example, button.getAttribute('aria-expanded') !== 'true');
    });
  });

  // ---- Sections ---------------------------------------------------------
  var sections = Array.prototype.slice.call(document.querySelectorAll('.topic-section'));

  function setSection(section, open) {
    var body = section.querySelector('.section-body');
    var button = section.querySelector('.section-toggle');
    if (open) body.removeAttribute('hidden');
    else if (body.dataset.findable) body.setAttribute('hidden', 'until-found');
    body.classList.toggle('open', open);
    button.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  sections.forEach(function (section) {
    var button = section.querySelector('.section-toggle');
    button.addEventListener('click', function () {
      setSection(section, button.getAttribute('aria-expanded') !== 'true');
    });
  });

  // A page with only one section starts with it open.
  if (sections.length === 1) setSection(sections[0], true);

  // A link to a section (or to something inside one) opens it.
  function openFromHash() {
    if (!location.hash) return;
    var target = document.getElementById(location.hash.slice(1));
    if (!target) return;
    var section = target.closest('.topic-section');
    if (section) {
      setSection(section, true);
      target.scrollIntoView();
    }
  }
  window.addEventListener('hashchange', openFromHash);
  openFromHash();

  // Let the browser's Find (Ctrl + F) search closed sections and open the one it finds.
  // Turned on after the math is laid out, in browsers that support it.
  if ('onbeforematch' in document.body) {
    var whenMath = new Promise(function (resolve) {
      var tries = 0;
      (function wait() {
        if (window.MathJax && MathJax.startup && MathJax.startup.promise) { MathJax.startup.promise.then(resolve); }
        else if (tries++ < 100) { setTimeout(wait, 100); }
        else { resolve(); }
      })();
    });
    whenMath.then(function () {
      sections.forEach(function (section) {
        var body = section.querySelector('.section-body');
        body.dataset.findable = '1';
        body.addEventListener('beforematch', function () { setSection(section, true); });
        if (!body.classList.contains('open')) body.setAttribute('hidden', 'until-found');
      });
    });
  }
})();
