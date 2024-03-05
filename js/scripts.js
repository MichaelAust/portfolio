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
    let scrollOffset = 0;
    if (this.hasAttribute('data-trans-link')) {
      scrollOffset = window.innerHeight * .75; 
    }
    lenis.scrollTo(this.getAttribute('href'), { offset: scrollOffset });
  });
});


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
  callback_loaded: function (element) {
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

  const lazyTriggers = document.querySelectorAll('[data-lazy-trigger]');
  lazyTriggers.forEach(trigger => {
    const targetSelector = trigger.getAttribute('data-lazy-trigger');
    if (targetSelector) {
      const targetElement = document.querySelector(targetSelector);
      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        if (
          rect.bottom > 0 &&
          rect.right > 0 &&
          rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
          rect.top < (window.innerHeight || document.documentElement.clientHeight)
        ) {
          trigger.classList.add('on-screen');
        }
      }
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

    "(max-width: 760px)": function () {


      gsap.timeline({
          scrollTrigger: {
            trigger: ".sec-3-inner",
            start: "top bottom",
            end: "top center",
            scrub: true // Reibungslose Animation beim Scrollen
          }
        })
        .to('.sec-3 .lines-ct', {
          width: "32.78rem",
          autoAlpha: 1,
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
    "(min-width: 760px)": function () {
   
      gsap.timeline({
          scrollTrigger: {
            trigger: ".sec-3-inner",
            start: "top center",
            end: "top top",
            scrub: true // Reibungslose Animation beim Scrollen
          }
        })
        .to('.sec-3 .lines-ct', {
          height: "27.78rem",
          width: "1px",
          autoAlpha: 1,
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

      const vhshutter = window.innerHeight;
      const triggerOffsetShutterOne = 100 * vhshutter / 100; // 90vh in Pixeln
      const triggerOffsetShutterTwo = 50 * vhshutter / 100; // 90vh in Pixeln
      
      document.querySelectorAll('.transition-sec').forEach((section) => {
          var shutter = gsap.timeline({
              scrollTrigger: {
                  trigger: section,
                  start: `bottom bottom+=${triggerOffsetShutterOne}px`,
                  end: "bottom bottom",
                  scrub: true,
              }
          });
      
          shutter.to(section.querySelectorAll(".shutter"), {
              scaleX: 1,
              stagger: 0.05,
              
          });
      
          gsap.to(section, {
              autoAlpha: 0,
              pointerEvents: "none",
              scrollTrigger: {
                  trigger: section,
                  start: `bottom bottom+=${triggerOffsetShutterTwo / 1.5}px`,
                  end: `bottom bottom`,
                  scrub: true,
                }
          });
      });
      


      var sec1 = gsap.timeline({
        scrollTrigger: {
          trigger: ".sec-1-inner",
          start: "-10% bottom",
          end: "bottom -10%",
          scrub: true,
        }
      });

      sec1.fromTo(".claim-text div:nth-of-type(1)", {
        x: "-3.5%",
      }, {
        x: "3.5%",
      });

      sec1.fromTo(".claim-text div:nth-of-type(2)", {
        x: "2%",
      }, {
        x: "-2%",
      }, 0);

      sec1.fromTo(".claim-text div:nth-of-type(3)", {
        x: "-1%",
      }, {
        x: "1%",
      }, 0);

      sec1.fromTo(".claim-text div:nth-of-type(4)", {
        x: "7%",
      }, {
        x: "-7%",
      }, 0);

      sec1.fromTo(".claim-text div:nth-of-type(5)", {
        x: "-5%",
      }, {
        x: "5%",
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

        // var sec4Span1 = gsap.timeline({
        //   scrollTrigger: {
        //     trigger: ".sec-4 h2", // Trigger auf den ersten Span setzen
        //     start: "top bottom",
        //     end: "center 40%",
        //     scrub: .1,
        //   }
        // });
        
        // sec4Span1.from(".sec-4 h2 span:nth-of-type(1)", {
        //   x: "-12%",
        // });
        
        // var sec4Span2 = gsap.timeline({
        //   scrollTrigger: {
        //     trigger: ".sec-4 h2", // Trigger auf den zweiten Span setzen
        //     start: "top bottom",
        //     end: "center 40%",
        //     scrub: .1,
        //   }
        // });
        
        // sec4Span2.from(".sec-4 h2 span:nth-of-type(2)", {
        //   x: "7%",
        // });

      //   gsap.utils.toArray('.letter-ct').forEach(function(ct) {
      //     gsap.from(ct.querySelectorAll('span'), {
      //         opacity: 0,
      //         duration: .7,
      //         stagger: 0.05,
      //         ease: 'power4.inOut',
      //         toggleActions: "play pause reverse reset",
      //         scrollTrigger: {
      //             trigger: '.letter-trigger',
      //             start: 'top 90%',

      //         }
      //     });
      // });

    }
    // GSAP All END

  });
  //GSAP
};

// Event-Handler für das Resize-Ereignis des Fensters
function handleResize() {
  // Aktualisiere ScrollTrigger
  ScrollTrigger.refresh();
}

// Hinzufügen des Event-Handlers zum "resize"-Ereignis des Fensters
window.addEventListener('resize', handleResize);


// const links = document.querySelectorAll("a");
// links.forEach(link => {
//   link.addEventListener("click", e => {
//     if (
//       !link.hash.startsWith("#") &&
//       link.href.startsWith(location.origin) &&
//       (link.target !== "_blank" || e.ctrlKey || e.metaKey) && // Überprüfung des neuen Tabs
//       !link.classList.contains("lightbox-zoom-image") &&
//       !link.classList.contains("cms-file") && // Überprüfung der Klasse "cms-file"
//       e.button !== 1 && // Überprüfung des Mausrads
//       !(e.altKey || (e.buttons === 1 && e.altKey)) && // Überprüfung der Alt-Taste
//       !e.ctrlKey // Überprüfung der Ctrl-Taste
//     ) {
//       // Füge die Klasse "is-trans" zum HTML-Element hinzu
//       document.documentElement.classList.add("is-trans");

//       // Füge einen Timeout von 300 Millisekunden (0,3 Sekunden) hinzu
//       setTimeout(() => {
//         // Hier kannst du die Seite wechseln, nachdem die Verzögerung abgelaufen ist
//         window.location.href = link.href;
//       }, 300);

//       // Verhindere das Standardverhalten des Links (z.B. das Navigieren zu einer neuen Seite)
//       e.preventDefault();
//     }
//   });
// });


if (window.innerWidth > 759) { // Bedingung für Fensterbreite größer als 759 Pixel
  const cursorFollow = document.querySelector(".cursor-follow");
  const span = cursorFollow.querySelector("span");
  let posX = 0;
  let posY = 0;
  let mouseX = 0;
  let mouseY = 0;

  const delay = 0.1; // Adjust the delay time as needed

  function followCursor() {
      const distX = mouseX - posX;
      const distY = mouseY - posY;
      posX += distX * delay;
      posY += distY * delay;

      cursorFollow.style.left = posX + "px";
      cursorFollow.style.top = posY + "px";

      requestAnimationFrame(followCursor);
  }

  document.addEventListener("mousemove", function(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
  });

  followCursor();

  // Add event listener to elements with data-show-cursor attribute
  const elementsToShowCursor = document.querySelectorAll("[data-show-cursor]");
  elementsToShowCursor.forEach(element => {
      element.addEventListener("mouseover", function() {
          cursorFollow.style.transition = "transform 0.3s";
          cursorFollow.style.transform = "scale(1)";
      });
      element.addEventListener("mouseleave", function() {
          cursorFollow.style.transition = "transform 0.3s";
          cursorFollow.style.transform = "scale(0)";
      });
  });
}

  // Wähle alle Elemente mit der Klasse ".transition-sec" aus
  var transitionSecElements = document.querySelectorAll(".transition-sec");
      
  // Iteriere über jedes Element und setze seine Höhe als Inline-Style
  transitionSecElements.forEach(function(element) {
      var height = element.clientHeight; // Höhe des Elements
      height += window.innerHeight * 1; // Füge 50vh zur aktuellen Höhe hinzu
      element.style.height = height + "px"; // Setze die neue Höhe als Inline-Style
  });

  // Wähle alle Elemente mit der Klasse ".trans-sec-after" aus
var transSecAfterElements = document.querySelectorAll(".trans-sec-after");
  
// Iteriere über jedes Element und setze seine Höhe als Inline-Style
transSecAfterElements.forEach(function(element) {
    var height = element.clientHeight; // Höhe des Elements
    height += window.innerHeight * 0.75; // Füge 50vh zur aktuellen Höhe hinzu
    element.style.height = height + "px"; // Setze die neue Höhe als Inline-Style
});

function checkOrientation() {
  const body = document.querySelector("body");
  if (window.matchMedia("(orientation: portrait)").matches) {
    body.classList.remove("landscape");
    body.classList.add("portrait");
  } else {
    body.classList.remove("portrait");
    body.classList.add("landscape");
  }
}

// Event-Listener für Änderungen der Bildschirmausrichtung
window.addEventListener("orientationchange", checkOrientation);

// Event-Listener für Änderungen der Fenstergröße
window.addEventListener("resize", checkOrientation);

// Überprüfen der Bildschirmausrichtung beim Laden der Seite
checkOrientation();
