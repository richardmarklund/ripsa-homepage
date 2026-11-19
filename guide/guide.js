// Flikarna Telefon och Dator på guidesidorna (WAI-ARIA-mönstret för flikar).
// Utan skript syns båda filmerna under varandra och flikraden är dold.
(function () {
  // Förvalet följer enheten: telefon på pekskärm utan mus, annars dator.
  var telefon = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;

  document.querySelectorAll('[role="tablist"]').forEach(function (lista) {
    var flikar = Array.prototype.slice.call(lista.querySelectorAll('[role="tab"]'));

    function valj(flik, fokus) {
      flikar.forEach(function (f) {
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

    flikar.forEach(function (flik, i) {
      flik.addEventListener("click", function () { valj(flik, false); });
      flik.addEventListener("keydown", function (e) {
        var ny = null;
        if (e.key === "ArrowRight") ny = flikar[(i + 1) % flikar.length];
        else if (e.key === "ArrowLeft") ny = flikar[(i - 1 + flikar.length) % flikar.length];
        else if (e.key === "Home") ny = flikar[0];
        else if (e.key === "End") ny = flikar[flikar.length - 1];
        if (ny) { e.preventDefault(); valj(ny, true); }
      });
    });

    lista.hidden = false;
    valj(telefon ? flikar[0] : flikar[flikar.length - 1], false);
  });
})();
