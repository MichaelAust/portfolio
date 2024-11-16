 //Thank you to Dennis Snellenberg (https://dennissnellenberg.com/) for large parts of this code 
 
 gsap.registerPlugin(ScrollTrigger, CustomEase)
  CustomEase.create("custom-ease", ".9, .1, .1, .9");

  let scroll;
  let transitionOffset = 1000;

  initPageTransitions();

  function initLoader() {
    let tl = gsap.timeline();

    tl.call(function () {
      pageTransitionOutHome();
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

  function pageTransitionOutHome() {
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
    tl.from("header .header-bg", {
      duration: 2.2,
      scale: "1.1",
      ease: "custom-ease",
    }, 0);
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
        name: 'home',
        from: {

        },
        to: {
           namespace: ['home']
        },
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
          pageTransitionOutHome(data.next);
        },
        async beforeEnter(data) {
          ScrollTrigger.getAll().forEach(t => t.kill());
          initSmoothScroll(data.next.container);
          initScript();

        }
      },
      {
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
      duration: 1.05,
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
          scrollOffset = window.screen.height * .5;
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
    addOnScreen();
    lazyLoadImagesAndRefreshScrollTrigger();
    initScrollTriggerParallaxScroll();
    initializeJarallaxScrolling();
    initializeGSAPAnimations();
    followCursor();
    setTransitionSectionHeights();
    initResponsiveVideo();
    checkDeviceOrientation();
    marquee();
    scrollDirection();
    naviToggle();
    contactToggle();
    switchLabels();
    htmlFixed();
  }

function marquee() {
  $('[data-marquee-target]').each(function () {

    let marquee = $(this);

    let marqueeItemsWidth = marquee.find(".marquee-content").width();
    let marqueeSpeed = marquee.attr('data-marquee-speed') * (marqueeItemsWidth / $(window)
      .width());

    // Duplicate .marquee-content
    if (marquee.attr('data-marquee-duplicate') == "3") {
      // Custom function to clone / append 3x
      for (var i = 0; i < 3; i++) {
        var clonedMarqueeContent = marquee.find(".marquee-content").clone();
        marquee.find(".marquee-scroll").append(clonedMarqueeContent);
      }
    } else {
      var clonedMarqueeContent = marquee.find(".marquee-content").clone();
      marquee.find(".marquee-scroll").append(clonedMarqueeContent);
    }

    // Speed up Marquee on Tablet & Mobile
    if ($(window).width() <= 540) {
      marqueeSpeed = marqueeSpeed * 0.25;
    } else if ($(window).width() <= 1024) {
      marqueeSpeed = marqueeSpeed * 0.5;
    }

    let marqueeDirection;
    if (marquee.attr('data-marquee-direction') == 'right') {
      marqueeDirection = -1;
    } else {
      marqueeDirection = 1;
    }

    let marqueeContent = gsap.to(marquee.find('.marquee-content'), {
      xPercent: -100,
      repeat: -1,
      duration: marqueeSpeed,
      ease: "linear",
      paused: true
    }).totalProgress(0.5);

    gsap.set(marquee.find(".marquee-content"), { xPercent: 50 });

    ScrollTrigger.create({
      trigger: marquee,
      start: "top bottom",
      end: "bottom top",
      onUpdate(self) {
        if (self.direction !== marqueeDirection) {
          marqueeDirection *= -1;
          if (marquee.attr('data-marquee-direction') == 'right') {
            gsap.to([marqueeContent], {
              timeScale: (marqueeDirection * -1),
              overwrite: true
            });
          } else {
            gsap.to([marqueeContent], { timeScale: marqueeDirection, overwrite: true });
          }
        }
        self.direction === -1 ? marquee.attr('data-marquee-status', 'normal') : marquee
          .attr('data-marquee-status', 'inverted');
      },
      onEnter: () => marqueeContent.play(),
      onEnterBack: () => marqueeContent.play(),
      onLeave: () => marqueeContent.pause(),
      onLeaveBack: () => marqueeContent.pause()
    });

    // Extra speed on scroll
    marquee.each(function () {

      let triggerElement = $(this);
      let targetElement = $(this).find('.marquee-scroll');
      let marqueeScrollSpeed = $(this).attr('data-marquee-scroll-speed');

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: $(this),
          start: "0% 100%",
          end: "100% 0%",
          scrub: 0
        }
      });

      if (triggerElement.attr('data-marquee-direction') == 'left') {
        tl.fromTo(targetElement, {
          x: marqueeScrollSpeed + "vw",
        }, {
          x: marqueeScrollSpeed * -1 + "vw",
          ease: "none"
        });
      }

      if (triggerElement.attr('data-marquee-direction') == 'right') {
        tl.fromTo(targetElement, {
          x: marqueeScrollSpeed * -1 + "vw",
        }, {
          x: marqueeScrollSpeed + "vw",
          ease: "none"
        });
      }
    });
  });
}

/**
* GSAP Scrolltrigger Parallax Scroll
*/
function initScrollTriggerParallaxScroll() {


        if(document.querySelector('[data-parallax-strength]')) {
           $('[data-parallax-strength]').each(function () {
              
              let tl;
              let triggerElement = $(this);
              let targetElement = $(this).find('[data-parallax-target]');
              let triggerElementID = $(this).attr('data-parallax-trigger');
              let targetElementParallax = ($(this).attr('data-parallax-strength') * 20);
              let heightElementParallax = ($(this).attr('data-parallax-height') * 20);
              $(this).css("--parallax-strength", " " + targetElementParallax + "%");
              $(this).css("--parallax-height", " " + heightElementParallax + "%");

              
              // Check if [data-parallax-trigger="#header"] exists
              if ($(triggerElementID).length !== 0) {
                 triggerElement = $(document).find(triggerElementID);
              }
              
              tl = gsap.timeline({
                 scrollTrigger: {
                    trigger: triggerElement,
                    start: "0% 100%",
                    end: "100% 0%",
                    scrub: true,
                    markers: false
                 }
              });

              tl.set(targetElement, {
                 rotate: 0.001,
              });

              // if ($(this).attr('data-parallax-position') == 'top') {}

              tl.fromTo(targetElement, {
                 yPercent: (targetElementParallax * -0.5)
              }, {
                 yPercent: (targetElementParallax * 0.5),
                 ease: "none"
              });

           });
        }
     
}

function initResponsiveVideo() {
  function responsiveVideo() {
    const video = document.getElementById("responsive-video");
    
    if (!video) {
      // Falls kein Element mit ID "responsive-video" vorhanden ist, wird die Funktion beendet.
      return;
    }
  
    const source = document.getElementById("video-source");
  
    function setVideoSource() {
      const isMobile = window.innerWidth <= 760;
      const newSrc = isMobile ? source.getAttribute('data-src-mobile') : source.getAttribute('data-src-desktop');
      if (source.getAttribute('src') !== newSrc) {
        source.setAttribute('src', newSrc);
        video.load();
      }
    }
    
    // Initial load
    setVideoSource();
    
    // Update on resize
    window.addEventListener('resize', setVideoSource);
  }
  
  // Call the function
  responsiveVideo();
}




  function lazyLoadImagesAndRefreshScrollTrigger() {
    
    var lazyLoadInstance = new LazyLoad({
      container: document.querySelector('.page-wrap'),
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
          rect.bottom > 50 && // Änderung hier: Prüfe, ob das Element mindestens 50px unterhalb des Viewports liegt
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
              rect.bottom > 50 && // Änderung hier: Prüfe, ob das Element mindestens 50px unterhalb des Viewports liegt
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
  

      window.addEventListener('scroll', addOnScreenClass);
      const observer = new MutationObserver(function () {
        addOnScreenClass();
      });
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
  }
  function initializeJarallaxScrolling() {
  

    jarallax(document.querySelectorAll('.jarallax'), {
      speed: 0.6,
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
      ///GSAP  Mobile START

      "(max-width: 760px)": function () {


        gsap.timeline({
            scrollTrigger: {
              trigger: ".sec-3-inner",
              start: "top bottom",
              end: "top center",
              scrub: true 
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
              scrub: true 
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
              scrub: true, 

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
              scrub: true, 
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
      ///GSAP  Mobile END

      ///GSAP  Desktop
      "(min-width: 760px)": function () {

        gsap.timeline({
            scrollTrigger: {
              trigger: ".sec-3-inner",
              start: "top center",
              end: "top top",
              scrub: true 
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
              scrub: true 
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
              scrub: true, 

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
              scrub: true, 
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

        const elements = document.querySelectorAll('.speed-fast');

        // Iteriere über jedes Element
        elements.forEach(element => {
            // Definiere die Animation mit GSAP
            gsap.fromTo(element, {
                // Startzustand
                y: "5em" 
            }, {
                // Endzustand
                y: "-5em", 
                // ScrollTrigger-Konfiguration
                scrollTrigger: {
                    trigger: element, // Element, das den Trigger auslöst
                    start: "top bottom", // Startpunkt der Animation
                    end: "bottom+=20% top", // Der Endpunkt ist 5em über der Oberkante des Ansichtsfensters
                    scrub: true, // Scrubbing aktivieren
                }
            });
        });

        // Selektiere alle Elemente mit der Klasse '.speed-slow'
        const slowElements = document.querySelectorAll('.speed-slow');

        // Iteriere über jedes Element
        slowElements.forEach(element => {
            // Definiere die Animation mit GSAP
            gsap.fromTo(element, {
                // Startzustand
                y: "-5em" 
            }, {
                // Endzustand
                y: "5em", 
                // ScrollTrigger-Konfiguration
                scrollTrigger: {
                    trigger: element, // Element, das den Trigger auslöst
                    start: "top bottom", // Startpunkt der Animation
                    end: "bottom+=50% top", // Der Endpunkt ist 5em über der Oberkante des Ansichtsfensters
                    scrub: true, // Scrubbing aktivieren
                }
            });
        });
        gsap.timeline({
          scrollTrigger: {
            trigger: ".project-header",
            start: "bottom bottom",
            end: "bottom top",
            scrub: true 
          }
        })
        .to('.project-header .project-header-img-ct img ', {
          scale: "1.2",
          y: "25%",
          
        });

        gsap.timeline({
          scrollTrigger: {
            trigger: ".ref-overlay-screen-sec .row",
            start: "top bottom",
            end: "bottom top",
            scrub: .3, 
          }
        })
        .from('.ref-overlay-screen-sec .row .first-img ', {
          x: "-5em",
        })
        .from('.ref-overlay-screen-sec .row .second-img ', {
          x: "5em",

        },0);

        gsap.timeline({
          scrollTrigger: {
            trigger: ".ref-tripple-sec .row.break-left",
            start: "top bottom",
            end: "bottom top",
            scrub: .3, 
          }
        })
        .fromTo(".ref-tripple-sec .row.break-left .third-img", {
          y: "-20rem",
        }, {
          y: "20rem",
        });

        gsap.timeline({
          scrollTrigger: {
            trigger: ".ref-desk-and-mobile-sec",
            start: "top bottom",
            end: "bottom top",
            scrub: .3, 
          }
        })
        .fromTo(".ref-desk-and-mobile-sec .second-img", {
          y: "10rem",
        }, {
          y: "-10rem",
        });


        

        gsap.timeline({
          scrollTrigger: {
            trigger: ".triple-mobile-sec.ver-1",
            start: "top bottom",
            end: "bottom top",
            scrub: true 
          }
        })
        .from('.triple-mobile-sec.ver-1 .row .first-img ', {
          x: "-10em",
        })
        .from('.triple-mobile-sec.ver-1 .row .second-img ', {
          scale: ".75",
        },0)
        .from('.triple-mobile-sec.ver-1 .row .third-img ', {
          x: "10em",
        },0);

        gsap.timeline({
          scrollTrigger: {
            trigger: ".ref-dual-mobile-sec",
            start: "top bottom",
            end: "bottom top",
            scrub: true 
          }
        })
        .from('.ref-dual-mobile-sec .row .first-img ', {
          y: "18em",
        })
        .from('.ref-dual-mobile-sec .row .third-img ', {
          y: "-18em",
        },0);

        gsap.timeline({
          scrollTrigger: {
            trigger: ".triple-mobile-sec.ver-2",
            start: "top bottom",
            end: "bottom top",
            scrub: true 
          }
        })
        .from('.triple-mobile-sec.ver-2 .row .first-img ', {
          y: "14em",
        })
        .from('.triple-mobile-sec.ver-2 .row .third-img ', {
          y: "-14em",
        },0);

        gsap.timeline({
          scrollTrigger: {
            trigger: ".sm-posts-sec.dark-bg",
            start: "top bottom",
            end: "bottom top",
            scrub: true 
          }
        })
        .from('.sm-posts-sec.dark-bg .row .first-img ', {
          y: "-15em",
        })
        .from('.sm-posts-sec.dark-bg .row .second-img ', {
          y: "15em",
        },0);



        gsap.timeline({
          scrollTrigger: {
            trigger: ".sec-2 >.row",
            start: "top bottom",
            end: "bottom top",
            scrub: true, 
          }
        })
        .from('.sec-2 >.row .text-ct ', {
          y: "-17rem",
        })
      

        gsap.timeline({
          scrollTrigger: {
            trigger: ".sec-2 >.row",
            start: "top bottom",
            end: "bottom top",
            scrub: true, 
          }
        })
        .from('.sec-2 >.row .cutout-ct picture:nth-of-type(1) ', {
          left: "-2rem",
        },0)

     

      
        
      },
      ///GSAP  Desktop END

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
              scrub: true, 

            }
          })
          .to('.sec-3 .bg', {
            backgroundPositionY: "75%", // Hintergrundposition auf -20% setzen
          });
          gsap.timeline({
            scrollTrigger: {
              trigger: ".footer-trigger",
              start: "bottom bottom",
              end: "bottom top",
              scrub: .3, 
            }
          })
          .from('.project-footer .bg ', {
            scale: "1.4",
          })
  
        
      }
      // GSAP All END

    });
  }

  function followCursor() {
    const cursorFollow = document.querySelector(".cursor-follow");
    if (!cursorFollow) return; // Beende die Funktion, wenn das Element nicht gefunden wurde
  
    if (window.innerWidth > 759) {
      const span = cursorFollow.querySelector("span");
      let posX = 0;
      let posY = 0;
      let mouseX = 0;
      let mouseY = 0;
  
      let isHovering = false; // Flag, um zu erkennen, ob ein Hover aktiv ist
  
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
          const target = element.getAttribute("data-cursor-target");
  
          // Verstecke das span-Element, wenn ein target vorhanden ist
          if (target) {
            span.style.display = "none";
          }
  
          // Zeige das Bild mit passendem data-cursor-content im cursorFollow-Container
          const images = cursorFollow.querySelectorAll("img");
          images.forEach(img => {
            if (img.getAttribute("data-cursor-content") === target) {
              img.style.display = "block";
              img.style.transition = "transform 0.3s";
              img.style.transform = "scale(1)";
            } else {
              img.style.display = "none";
            }
          });
  
          cursorFollow.style.transition = "transform 0.3s";
          cursorFollow.style.transform = "scale(1)";
  
          // Setze das isHovering-Flag auf true, da der Hover aktiv ist
          isHovering = true;
        });
  
        element.addEventListener("mouseleave", function () {
          const target = element.getAttribute("data-cursor-target");
  
          // Setze den Cursor-Follow auf scale(0) und verzögere das Verstecken des Bildes um 0.3s
          cursorFollow.style.transition = "transform 0.3s";
          cursorFollow.style.transform = "scale(0)";
  
          const images = cursorFollow.querySelectorAll("img");
          images.forEach(img => {
            if (img.getAttribute("data-cursor-content") === target) {
              img.style.transition = "transform 0.3s";
              img.style.transform = "scale(0)";
  
              // Verzögere das Verstecken des Bildes
              setTimeout(() => {
                img.style.display = "none";
              }, 300);
            }
          });
  
          // Verzögere das Wiederanzeigen des span-Elements nur, wenn kein Hover mehr aktiv ist
          setTimeout(() => {
            if (!isHovering) {
              span.style.display = "flex"; // Zeige das span-Element wieder an
            }
          }, 300); // Verzögerung von 0,3 Sekunden, damit der Übergang abgeschlossen ist
  
          // Setze das isHovering-Flag zurück
          isHovering = false;
        });
      });
    }
  }
  
  
  


  function setTransitionSectionHeights() {
    // Verwende die Höhe des Bildschirms als Basis
    var screenHeight = window.screen.height;
  
    // Wähle alle Elemente mit der Klasse ".transition-sec" aus
    var transitionSecElements = document.querySelectorAll(".transition-sec");
  
    // Iteriere über jedes Element und setze seine Höhe als Inline-Style
    transitionSecElements.forEach(function (element) {
      var height = element.clientHeight; // Höhe des Elements
      height += screenHeight * 1; // Füge die volle Bildschirmhöhe hinzu
      element.style.height = height + "px"; // Setze die neue Höhe als Inline-Style
    });
  
    // Wähle alle Elemente mit der Klasse ".trans-sec-after" aus
    var transSecAfterElements = document.querySelectorAll(".trans-sec-after");
  
    // Iteriere über jedes Element und setze seine Höhe als Inline-Style
    transSecAfterElements.forEach(function (element) {
      var height = element.clientHeight; // Höhe des Elements
      height += screenHeight * 0.5; // Füge 50% der Bildschirmhöhe hinzu
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
  