  gsap.registerPlugin(ScrollTrigger, CustomEase)
  CustomEase.create("custom-ease", ".9, .1, .1, .9");


  let scroll;
  let transitionOffset = 1000;

  initPageTransitions();

  function initLoader() {
    let tl = gsap.timeline();

    tl.call(function () {
      pageTransitionOut();
      scroll.start();
    }, null, .1);

  }

  function pageTransitionIn() {
    let tl = gsap.timeline();
    tl.set(".page-transition .transition-overlay", {
      yPercent: "0%",
      top: "auto",
      bottom: "0",
    });
    tl.to(".quickbar", {
      duration: .7,
      ease: "custom-ease",
      y: "-100%",
      autoAlpha: 0,
    });
    tl.to(".page-transition .transition-overlay:nth-of-type(3)", {
      duration: .7,
      height: "100%",
      ease: "custom-ease",
    }, 0);

    tl.to(".page-transition .transition-overlay:nth-of-type(2)", {
      duration: .7,
      height: "100%",
      ease: "custom-ease",
    }, 0.1);
    tl.to(".page-transition .transition-overlay:nth-of-type(1)", {
      duration: .7,
      height: "100%",
      ease: "custom-ease",
    }, 0.2);
    tl.call(function () {
      scroll.stop();
    }, null, 0);
  }

  function pageTransitionOut() {
    let tl = gsap.timeline();
    tl.call(function () {
      scroll.start();
    }, null, 0);

    tl.set(".quickbar", {
      y: "100%",
      autoAlpha: 0,
    });

    tl.set(".page-transition .transition-overlay", {
      yPercent: "100%",
      top: "0",
      bottom: "auto",
    });

    tl.to(".page-transition .transition-overlay:nth-of-type(1)", {
      duration: .7,
      height: "0%",
      ease: "custom-ease",
    });

    tl.to(".page-transition .transition-overlay:nth-of-type(2)", {
      duration: .7,
      height: "0%",
      ease: "custom-ease",
    }, 0.1);
    tl.to(".page-transition .transition-overlay:nth-of-type(3)", {
      duration: .7,
      height: "0%",
      ease: "custom-ease",
    }, 0.2);
    tl.to(".quickbar", {
      duration: 1,
      y: "0%",
      ease: "Expo.EaseOut",
      autoAlpha: 1,
    }, 0.4);
  }



  function initPageTransitions() {

    history.scrollRestoration = "manual";


    barba.hooks.beforeLeave(() => {
      document.querySelector('html').classList.add('is-trans');
    });
    barba.hooks.after(() => {
      document.querySelector('html').classList.remove('is-trans');
    });

    barba.hooks.afterEnter(() => {
      // Scrollen Sie zum Seitenanfang, wenn keine interne Verlinkung vorliegt
      window.scrollTo(0, 0);
      ScrollTrigger.refresh();

      const htmlElement = document.querySelector('html');
      if (htmlElement.classList.contains('open-navi')) {
        htmlElement.classList.remove('open-navi');
      }



      // Überprüfen, ob die neue URL einen internen Link enthält
      if (window.location.hash) {
        const targetId = window.location.hash.substring(1); // Ziel-ID extrahieren
        const targetElement = document.getElementById(targetId); // Ziel-Element abrufen
        if (targetElement) {
          targetElement.scrollIntoView({
            block: 'start',
          });
          console.log(`Scrolling to anchor ${targetId}`);

          // Überprüfen, ob das Ziel-Element das Attribut [data-trans-id] enthält
          if (targetElement.hasAttribute('data-trans-id')) {
            const offset = window.innerHeight * 0.75; // 75vh Offset
            window.scrollBy(0, offset);
            console.log(`Scrolling 75vh down from the top of [data-trans-id] section`);
          }

          // Aktualisieren von LazyLoad und ScrollTrigger
          return; // Beenden Sie die Funktion, wenn das Scrollen zum Ankerziel erfolgt ist
        }
      }


    });



    barba.init({
      prevent: ({
        el
      }) => {
        return el.tagName === 'A' && el.getAttribute('href').startsWith('#');
      },
      sync: true,
      debug: true,
      timeout: 7000,
      transitions: [{
          name: 'default',
          once(data) {
            initSmoothScroll(data.next.container);
            initScript();
            initLoader();
          },
          async leave(data) {
            pageTransitionIn(data.current);
            await delay(transitionOffset);
            scroll.destroy();
            data.current.container.remove();
          },
          async enter(data) {
            pageTransitionOut(data.next);
          },
          async beforeEnter(data) {
            ScrollTrigger.getAll().forEach(t => t.kill());
            initSmoothScroll(data.next.container);
            initScript();

          }
        },
        {
          name: 'self',
          async leave(data) {
            pageTransitionIn(data.current);
            await delay(transitionOffset);
            scroll.destroy();
            data.current.container.remove();
          },
          async enter(data) {
            pageTransitionOut(data.next);
          },
          async beforeEnter(data) {
            ScrollTrigger.getAll().forEach(t => t.kill());
            initSmoothScroll(data.next.container);
            initScript();
          }
        },
      ]
    });


    function initSmoothScroll(container) {

      initLenis();

      function raf(time) {
        scroll.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      ScrollTrigger.refresh();
    }



  }


  function initLenis() {
    scroll = new Lenis({
      duration: 1.3,
      wheelMultiplier: .9,
    })

    scroll.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      scroll.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        let scrollOffset = 0;
        if (this.hasAttribute('data-trans-link')) {
          scrollOffset = window.innerHeight * .75;
        }
        scroll.scrollTo(this.getAttribute('href'), {
          offset: scrollOffset
        });
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

  }

  function delay(n) {
    n = n || 2000;
    return new Promise((done) => {
      setTimeout(() => {
        done();
      }, n);
    });
  }


  /**
   * Fire all scripts on page load
   */
  function initScript() {
    checkDeviceOrientation();
    addOnScreen();
    initializeJarallaxScrolling();
    scrollDirection();
    naviToggle();
    contactToggle();
    switchLabels();
    htmlFixed();
    lazyLoadImagesAndRefreshScrollTrigger();
    followCursor();
    setTransitionSectionHeights();
    initializeGSAPAnimations();
  }




  function lazyLoadImagesAndRefreshScrollTrigger() {
    var lazyLoadInstance = new LazyLoad({
      callback_loaded: function (element) {
        ScrollTrigger.refresh();
      }
    });
  }


  function addOnScreen() {
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
      const observer = new MutationObserver(function () {
        addOnScreenClass();
      });
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    });
  }

  function initializeJarallaxScrolling() {
    jarallax(document.querySelectorAll('.jarallax'), {
      speed: 0.4,
    });
  }



  function scrollDirection() {
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
  }

  function naviToggle() {
    const naviToggleElements = document.querySelectorAll('[data-toggle-nav]');
    naviToggleElements.forEach(function (naviToggleElement) {
      naviToggleElement.addEventListener("click", function () {
        var naviElement = document.querySelector('html');
        naviElement.classList.toggle("open-navi");
        setTimeout(function () {
          naviElement.classList.add("is-transitioning");
          setTimeout(function () {
            naviElement.classList.remove("is-transitioning");
          }, 800);
        });
      });
    });
  }

  function contactToggle() {
    const contactToggleElements = document.querySelectorAll('[data-toggle-contact]');
    contactToggleElements.forEach(function (contactToggleElement) {
      contactToggleElement.addEventListener("click", function () {
        var contactElement = document.querySelector('html');
        contactElement.classList.toggle("open-contact");
        setTimeout(function () {
          contactElement.classList.add("contact-is-transitioning");
          setTimeout(function () {
            contactElement.classList.remove("contact-is-transitioning");
          }, 800);
        });
      });
    });
  }

  function switchLabels() {
    var inputs = document.querySelectorAll('form [name]');
  
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('focus', function() {
            const id = this.getAttribute('id');
            document.querySelector('[for="'+id+'"]').classList.add('focus');
        });
        inputs[i].addEventListener('blur', function() {
            const id = this.getAttribute('id');
            if (this.value.length < 1 && document.querySelector('[for="'+id+'"]').classList.contains('focus')) {
                document.querySelector('[for="'+id+'"]').classList.remove('focus');
            }
        });
    }
  }

  function htmlFixed() {
    var e = document.documentElement.scrollTop,
      d = document.querySelector("html");
    50 < e && d.classList.add("fixed"),
      window.addEventListener("scroll", function (e) {
        var t = document.documentElement.scrollTop;
        document.querySelector("html").classList.contains("edge") && (t = document.querySelector("html").scrollTop),
          50 < t ? d.classList.add("fixed") : d.classList.remove("fixed")
      })
  }

  function initializeGSAPAnimations() {

    // GSAP Start

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
  }

  function followCursor() {
    // Überprüfe, ob das erforderliche HTML-Element vorhanden ist
    const cursorFollow = document.querySelector(".cursor-follow");
    if (!cursorFollow) return; // Beende die Funktion, wenn das Element nicht gefunden wurde

    if (window.innerWidth > 759) {
      const span = cursorFollow.querySelector("span");
      let posX = 0;
      let posY = 0;
      let mouseX = 0;
      let mouseY = 0;

      const delay = 0.1;

      function followCursor() {
        const distX = mouseX - posX;
        const distY = mouseY - posY;
        posX += distX * delay;
        posY += distY * delay;

        cursorFollow.style.left = posX + "px";
        cursorFollow.style.top = posY + "px";

        requestAnimationFrame(followCursor);
      }

      document.addEventListener("mousemove", function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
      });

      followCursor();

      const elementsToShowCursor = document.querySelectorAll("[data-show-cursor]");
      elementsToShowCursor.forEach(element => {
        element.addEventListener("mouseover", function () {
          cursorFollow.style.transition = "transform 0.3s";
          cursorFollow.style.transform = "scale(1)";
        });
        element.addEventListener("mouseleave", function () {
          cursorFollow.style.transition = "transform 0.3s";
          cursorFollow.style.transform = "scale(0)";
        });
      });
    }
  }


  function setTransitionSectionHeights() {
    // Wähle alle Elemente mit der Klasse ".transition-sec" aus
    var transitionSecElements = document.querySelectorAll(".transition-sec");

    // Iteriere über jedes Element und setze seine Höhe als Inline-Style
    transitionSecElements.forEach(function (element) {
      var height = element.clientHeight; // Höhe des Elements
      height += window.innerHeight * 1; // Füge 50vh zur aktuellen Höhe hinzu
      element.style.height = height + "px"; // Setze die neue Höhe als Inline-Style
    });

    // Wähle alle Elemente mit der Klasse ".trans-sec-after" aus
    var transSecAfterElements = document.querySelectorAll(".trans-sec-after");

    // Iteriere über jedes Element und setze seine Höhe als Inline-Style
    transSecAfterElements.forEach(function (element) {
      var height = element.clientHeight; // Höhe des Elements
      height += window.innerHeight * 0.75; // Füge 50vh zur aktuellen Höhe hinzu
      element.style.height = height + "px"; // Setze die neue Höhe als Inline-Style
    });

  }

  function checkDeviceOrientation() {
    // Code to check device orientation...
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
  }