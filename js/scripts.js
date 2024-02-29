let lenis = new Lenis({
  duration: 1.2,
})

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    lenis.scrollTo(this.getAttribute('href'))
  });
})


// Textarea-Element auswählen
const textarea = document.querySelector('textarea');

// Überprüfen, ob ein Textarea-Element vorhanden ist
if (textarea) {
  // Event-Listener hinzufügen, der bei Änderungen im Textarea aufgerufen wird
  textarea.addEventListener('input', function () {
    // Überprüfen, ob das Scrollen notwendig ist
    if (textarea.scrollHeight > textarea.clientHeight) {
      // Scrollbalken vorhanden, data-lenis-prevent hinzufügen
      textarea.setAttribute('data-lenis-prevent', '');
    } else {
      // Kein Scrollbalken vorhanden, data-lenis-prevent entfernen (falls vorhanden)
      textarea.removeAttribute('data-lenis-prevent');
    }
  });
}

jarallax(document.querySelectorAll('.jarallax'), {
  speed: 0.3,
});


var lazyLoadInstance = new LazyLoad({
  // Ihre benutzerdefinierten Einstellungen gehen hier
  callback_loaded: function(element) {
    // Hier wird Ihre Funktion aufgerufen, wenn ein Bild geladen wurde
    ScrollTrigger.refresh();
    // Fügen Sie hier Ihre weitere Logik hinzu oder rufen Sie eine Funktion auf
  }
});


function addOnScreenClass() {
  const elementsWithFade = document.querySelectorAll('[data-lazy-animation]');
  elementsWithFade.forEach(element => {
    const rect = element.getBoundingClientRect();
    if (
      rect.bottom > 0 &&
      rect.right > 0 &&
      rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
      rect.top < (window.innerHeight || document.documentElement.clientHeight)
    ) {
      element.classList.add('on-screen');
    }
  });
}

window.addEventListener('load', function () {
  addOnScreenClass();
  window.addEventListener('scroll', addOnScreenClass);

  // MutationObserver für dynamische Änderungen am DOM
  const observer = new MutationObserver(function () {
    addOnScreenClass();
  });

  // Starte Beobachtung für Änderungen am DOM
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});



const bodyElement = document.body;

function ScrollDir(elm) {
  let lastScrollTop = 0;

  document.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      elm.classList.remove('scrolling-up');
      elm.classList.add('scrolling-down');
    } else if (scrollTop < lastScrollTop) {
      elm.classList.remove('scrolling-down');
      elm.classList.add('scrolling-up');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });
}
ScrollDir(bodyElement);

// Finde alle Elemente mit der Klasse "navi-toggle"
const naviToggleElements = document.querySelectorAll('[data-toggle-nav]');

// Füge einen Klick-Eventlistener zu jedem navi-toggle Element hinzu
naviToggleElements.forEach(function (naviToggleElement) {
  naviToggleElement.addEventListener("click", function () {
    // Finde das HTML-Element, dem die Klasse "open-navi" zugeordnet ist
    var naviElement = document.querySelector('html');

    // Toggle die Klasse "open-navi"
    naviElement.classList.toggle("open-navi");

    // Füge die Klasse "is-transitioning" nach 0.7 Sekunden hinzu
    setTimeout(function () {
      naviElement.classList.add("is-transitioning");

      // Entferne die Klasse "is-transitioning" nach weiteren 0.7 Sekunden
      setTimeout(function () {
        naviElement.classList.remove("is-transitioning");
      }, 800);
    });
  });
});



var e = document.documentElement.scrollTop,
  d = document.querySelector("html");
50 < e && d.classList.add("fixed"),
  window.addEventListener("scroll", function (e) {
    var t = document.documentElement.scrollTop;
    document.querySelector("html").classList.contains("edge") && (t = document.querySelector("html").scrollTop),
      50 < t ? d.classList.add("fixed") : d.classList.remove("fixed")
  })


// GSAP Start


if (document.body.classList.contains('start')) {

  //GSAP Mobile Start
  ScrollTrigger.matchMedia({
    ///GSAP Index Mobile START

    "(max-width: 1200px)": function () {
      // var headerScrollMobile = gsap.timeline({
      //   scrollTrigger: {
      //     trigger: "header",
      //     start: "top top",
      //     end: "bottom -15%",
      //     scrub: true,
      //   }
      // });
      // headerScrollMobile.to("header .elli img", {
      //   scale: 1.15,
      //   y: "70rem",
      // });

      // Berechnung der Höhe des Viewports in Pixeln
      const vhsec1 = window.innerHeight;
      const triggerOffset = 80 * vhsec1 / 100; // 65vh in Pixeln


      $(".sec-1").each(function (index) {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: $(this),
            start: `top+=${triggerOffset}px top`,
            end: "bottom bottom+=10%",
            scrub: true,
          }
        });
        tl.from($(".sec-2 .p div"), {
          opacity: 0.2,
          duration: 0.2,
          ease: "power1.out",
          stagger: {
            each: 0.4
          }
        });
      });

      gsap.timeline({
        scrollTrigger: {
            trigger: ".sec-3-inner",
            start: "top bottom",
            end: "top center",
            scrub: true // Reibungslose Animation beim Scrollen
        }
    })
    .from('.sec-3 .lines-ct', {
        width: 0,
        autoAlpha: 0,
    });
    
    gsap.timeline({
        scrollTrigger: {
            trigger: ".sec-3-inner",
            start: "top+=75% center",
            end: "bottom center",
            scrub: true // Reibungslose Animation beim Scrollen
        }
    })
    .to('.sec-3 .lines-ct', {
        autoAlpha: 0,
    });
    gsap.timeline({
      scrollTrigger: {
        trigger: ".sec-3-inner",
        start: "top center",
        end: "top+=55% center",
        scrub: true, // Reibungslose Animation beim Scrollen

      }
    })
    .from('.usp-ct.one span', {
      opacity: 0,
      yPercent: 200,
      stagger: 0.05, // Versatz zwischen den Animationen der einzelnen Elemente
    })
    .to('.usp-ct.one span', {
      opacity: 0,
      yPercent: -200,
      stagger: 0.05, // Versatz zwischen den Animationen der einzelnen Elemente
    })
    .from('.sec-3 .lines-ct .line.one .line-inner', {
      width: 0,
    }, 0);

    gsap.timeline({
      scrollTrigger: {
        trigger: ".sec-3-inner",
        start: "top+=45% center",
        end: "bottom center",
        scrub: true, // Reibungslose Animation beim Scrollen
      }
    })
    .from('.usp-ct.two span', {
      opacity: 0,
      yPercent: 200,
      stagger: 0.05, // Versatz zwischen den twon der einzelnen Elemente
    })
    .to('.usp-ct.two span', {
      opacity: 0,
      yPercent: -200,
      stagger: 0.05, // Versatz zwischen den Animationen der einzelnen Elemente
    })
    .from('.sec-3 .lines-ct .line.two .line-inner', {
      width: 0,
    }, 0);


    },
    ///GSAP Index Mobile END

    ///GSAP Index Desktop
    "(min-width: 1200px)": function () {
      // Berechnung der Höhe des Viewports in Pixeln
      const vhsec1 = window.innerHeight;
      const triggerOffset = 140 * vhsec1 / 100; // 90vh in Pixeln


      $(".sec-1").each(function (index) {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: $(this),
            start: `top+=${triggerOffset}px top`,
            end: "bottom bottom+=25%",
            scrub: true,
          }
        });
        tl.from($(".sec-2 .p div"), {
          opacity: 0.2,
          duration: 0.2,
          ease: "power1.out",
          stagger: {
            each: 0.4
          }
        });
      });
      gsap.timeline({
        scrollTrigger: {
            trigger: ".sec-3-inner",
            start: "top center",
            end: "top top",
            scrub: true // Reibungslose Animation beim Scrollen
        }
    })
    .from('.sec-3 .lines-ct', {
        height: 0,
        autoAlpha: 0,
    });
    
    gsap.timeline({
        scrollTrigger: {
            trigger: ".sec-3-inner",
            start: "top+=75% center",
            end: "bottom center",
            scrub: true // Reibungslose Animation beim Scrollen
        }
    })
    .to('.sec-3 .lines-ct', {
        autoAlpha: 0,
    });
    gsap.timeline({
      scrollTrigger: {
        trigger: ".sec-3-inner",
        start: "top top+=33%",
        end: "top+=55% center",
        scrub: true, // Reibungslose Animation beim Scrollen

      }
    })
    .from('.usp-ct.one span', {
      opacity: 0,
      yPercent: 150,
      stagger: 0.05, // Versatz zwischen den Animationen der einzelnen Elemente
    })
    .to('.usp-ct.one span', {
      opacity: 0,
      yPercent: -120,
      stagger: 0.05, // Versatz zwischen den Animationen der einzelnen Elemente
    })
    .from('.sec-3 .lines-ct .line.one .line-inner', {
      height: 0,
    }, 0);

    gsap.timeline({
      scrollTrigger: {
        trigger: ".sec-3-inner",
        start: "top+=45% center",
        end: "bottom center",
        scrub: true, // Reibungslose Animation beim Scrollen
      }
    })
    .from('.usp-ct.two span', {
      opacity: 0,
      yPercent: 150,
      stagger: 0.05, // Versatz zwischen den twon der einzelnen Elemente
    })
    .to('.usp-ct.two span', {
      opacity: 0,
      yPercent: -120,
      stagger: 0.05, // Versatz zwischen den Animationen der einzelnen Elemente
    })
    .from('.sec-3 .lines-ct .line.two .line-inner', {
      height: 0,
    }, 0);

    },
    ///GSAP Index Desktop END

    // GSAP All
    "all": function () {

      var sec1 = gsap.timeline({
        scrollTrigger: {
          trigger: ".sec-1-inner",
          start: "-10% bottom",
          end: "bottom -10%",
          scrub: true,
        }
      });

      sec1.fromTo(".claim-text span:nth-of-type(1)", {
        x: "-3.5%",
      }, {
        x: "3.5%",
      });

      sec1.fromTo(".claim-text span:nth-of-type(2)", {
        x: "2%",
      }, {
        x: "-2%",
      }, 0);

      sec1.fromTo(".claim-text span:nth-of-type(3)", {
        x: "-7%",
      }, {
        x: "7%",
      }, 0);

      sec1.fromTo(".claim-text span:nth-of-type(4)", {
        x: "7%",
      }, {
        x: "-7%",
      }, 0);

      sec1.fromTo(".claim-text span:nth-of-type(5)", {
        x: "-3%",
      }, {
        x: "3%",
      }, 0);
      gsap.timeline({
        scrollTrigger: {
          trigger: ".sec-3-inner",
          start: "top top",
          end: "bottom bottom",
          scrub: true, // Reibungslose Animation beim Scrollen

        }
      })
      .to('.sec-3 .bg', {
        backgroundPositionY: "50%", // Hintergrundposition auf -20% setzen
      });

    
      
  
    }
    // GSAP All END

  });
  //GSAP

};


const links = document.querySelectorAll("a");
links.forEach(link => {
  link.addEventListener("click", e => {
    if (
      !link.hash.startsWith("#") &&
      link.href.startsWith(location.origin) &&
      (link.target !== "_blank" || e.ctrlKey || e.metaKey) && // Überprüfung des neuen Tabs
      !link.classList.contains("lightbox-zoom-image") &&
      !link.classList.contains("cms-file") && // Überprüfung der Klasse "cms-file"
      e.button !== 1 && // Überprüfung des Mausrads
      !(e.altKey || (e.buttons === 1 && e.altKey)) && // Überprüfung der Alt-Taste
      !e.ctrlKey // Überprüfung der Ctrl-Taste
    ) {
      // Füge die Klasse "is-trans" zum HTML-Element hinzu
      document.documentElement.classList.add("is-trans");

      // Füge einen Timeout von 300 Millisekunden (0,3 Sekunden) hinzu
      setTimeout(() => {
        // Hier kannst du die Seite wechseln, nachdem die Verzögerung abgelaufen ist
        window.location.href = link.href;
      }, 300);

      // Verhindere das Standardverhalten des Links (z.B. das Navigieren zu einer neuen Seite)
      e.preventDefault();
    }
  });
});