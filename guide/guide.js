// Flikarna Telefon och Dator på guidesidorna (WAI-ARIA-mönstret för flikar).
// Utan skript syns båda filmerna under varandra och flikraden är dold.
// Valet gäller alla guider på sidan: byter man till Dator i en guide byts
// det i alla, så att man inte behöver välja om för varje film.
(function () {
  var listor = Array.prototype.slice.call(document.querySelectorAll('[role="tablist"]'));

  // Enheten står sist i flikens id: "spela-in-flik-telefon", "flashcards-flik-dator".
  function enhet(flik) { return flik.id.split("-").pop(); }
  function flikarI(lista) { return Array.prototype.slice.call(lista.querySelectorAll('[role="tab"]')); }

  function visa(lista, flik, fokus) {
    flikarI(lista).forEach(function (f) {
      var vald = f === flik;
      f.setAttribute("aria-selected", vald ? "true" : "false");
      f.tabIndex = vald ? 0 : -1;
      var panel = document.getElementById(f.getAttribute("aria-controls"));
      panel.hidden = !vald;
      // En film som döljs ska inte fortsätta spela.
      if (!vald) panel.querySelectorAll("video").forEach(function (v) { v.pause(); });
    });
    if (fokus) flik.focus();
  }

  function valjOverallt(namn, lista, flik, fokus) {
    listor.forEach(function (l) {
      if (l === lista) return visa(l, flik, fokus);
      var f = flikarI(l).filter(function (x) { return enhet(x) === namn; })[0];
      if (f) visa(l, f, false);
    });
  }

  listor.forEach(function (lista) {
    var flikar = flikarI(lista);
    flikar.forEach(function (flik, i) {
      flik.addEventListener("click", function () { valjOverallt(enhet(flik), lista, flik, false); });
      flik.addEventListener("keydown", function (e) {
        var ny = null;
        if (e.key === "ArrowRight") ny = flikar[(i + 1) % flikar.length];
        else if (e.key === "ArrowLeft") ny = flikar[(i - 1 + flikar.length) % flikar.length];
        else if (e.key === "Home") ny = flikar[0];
        else if (e.key === "End") ny = flikar[flikar.length - 1];
        if (ny) { e.preventDefault(); valjOverallt(enhet(ny), lista, ny, true); }
      });
    });
    lista.hidden = false;
  });

  // Förvalet följer enheten: telefon på pekskärm utan mus, annars dator.
  var telefon = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
  listor.forEach(function (l) {
    var flikar = flikarI(l);
    visa(l, telefon ? flikar[0] : flikar[flikar.length - 1], false);
  });
})();

// Listan till vänster markerar guiden man läser just nu.
(function () {
  var lankar = Array.prototype.slice.call(document.querySelectorAll('.toc a[href^="#"]'));
  if (!lankar.length || !("IntersectionObserver" in window)) return;
  var guider = lankar.map(function (a) {
    return document.getElementById(a.getAttribute("href").slice(1)).closest("section");
  });
  function markera(i) {
    lankar.forEach(function (a, j) {
      if (j === i) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
    });
  }
  var synliga = {};
  var obs = new IntersectionObserver(function (poster) {
    poster.forEach(function (p) { synliga[guider.indexOf(p.target)] = p.isIntersecting; });
    for (var i = 0; i < guider.length; i++) if (synliga[i]) return markera(i);
  }, { rootMargin: "-90px 0px -55% 0px" });
  guider.forEach(function (g) { obs.observe(g); });
})();
