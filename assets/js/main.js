!(function ($) {
  "use strict";

  const body = $("body");
  const navMenu = $(".nav-menu, .mobile-nav");
  const navSections = $("section");
  const mobileNavToggle = $(".mobile-nav-toggle");
  const backToTop = $(".back-to-top");

  const easing = $.easing && $.easing.easeInOutExpo ? "easeInOutExpo" : "swing";

  function closeMobileNav() {
    if (body.hasClass("mobile-nav-active")) {
      body.removeClass("mobile-nav-active");

      const icon = $(".mobile-nav-toggle i");
      if (icon.length) {
        icon.removeClass("icofont-close").addClass("icofont-navigation-menu");
      }
    }
  }

  function toggleMobileNav() {
    body.toggleClass("mobile-nav-active");

    const icon = $(".mobile-nav-toggle i");
    if (icon.length) {
      icon.toggleClass("icofont-navigation-menu icofont-close");
    }
  }

  function scrollToTarget(target) {
    if (!target.length) return;

    $("html, body").animate(
      {
        scrollTop: target.offset().top
      },
      1500,
      easing
    );
  }

  function setActiveNav(link) {
    if (!link || !link.length) return;

    $(".nav-menu .active, .mobile-nav .active").removeClass("active");
    link.closest("li").addClass("active");
  }

  function aosInit() {
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 1000,
        easing: "ease-in-out-back",
        once: true
      });
    }
  }

  // Hero typed
  if ($(".typed").length && typeof Typed !== "undefined") {
    let typedStrings = $(".typed").data("typed-items");

    if (typedStrings) {
      typedStrings = typedStrings.split(",");

      new Typed(".typed", {
        strings: typedStrings,
        loop: true,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000
      });
    }
  }

  // Smooth scroll untuk menu dan link .scrollto
  $(document).on("click", ".nav-menu a, .mobile-nav a, .scrollto", function (e) {
    const pathnameMatch =
      location.pathname.replace(/^\//, "") === this.pathname.replace(/^\//, "");

    const hostnameMatch = location.hostname === this.hostname;

    if (!pathnameMatch || !hostnameMatch) return;

    const hash = this.hash;

    if (!hash) return;

    const target = $(hash);

    if (target.length) {
      e.preventDefault();

      scrollToTarget(target);
      setActiveNav($(this));
      closeMobileNav();

      return false;
    }
  });

  // Smooth scroll saat halaman dibuka dengan hash
  $(document).ready(function () {
    if (window.location.hash) {
      const target = $(window.location.hash);

      if (target.length) {
        scrollToTarget(target);
      }
    }
  });

  // Toggle mobile navigation
  $(document).on("click", ".mobile-nav-toggle", function (e) {
    e.preventDefault();
    toggleMobileNav();
  });

  // Tutup mobile navigation saat klik di luar menu
  $(document).on("click", function (e) {
    const clickInsideToggle = mobileNavToggle.is(e.target) || mobileNavToggle.has(e.target).length > 0;
    const clickInsideNav = $(".mobile-nav").is(e.target) || $(".mobile-nav").has(e.target).length > 0;

    if (!clickInsideToggle && !clickInsideNav) {
      closeMobileNav();
    }
  });

  // Active menu saat scroll
  $(window).on("scroll", function () {
    const curPos = $(this).scrollTop() + 200;

    navSections.each(function () {
      const section = $(this);
      const top = section.offset().top;
      const bottom = top + section.outerHeight();
      const id = section.attr("id");

      if (!id) return;

      if (curPos >= top && curPos <= bottom) {
        navMenu.find("li").removeClass("active");
        navMenu.find('a[href="#' + id + '"]').parent("li").addClass("active");
      }
    });

    if (curPos < 300) {
      $(".nav-menu ul:first li:first").addClass("active");
    }
  });

  // Back to top button
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 100) {
      backToTop.fadeIn("slow");
    } else {
      backToTop.fadeOut("slow");
    }
  });

  backToTop.on("click", function (e) {
    e.preventDefault();

    $("html, body").animate(
      {
        scrollTop: 0
      },
      1500,
      easing
    );

    return false;
  });

  // Counter up
  if ($.fn.counterUp) {
    $('[data-toggle="counter-up"]').counterUp({
      delay: 10,
      time: 1000
    });
  }

  // Skills progress bar
  if ($.fn.waypoint) {
    $(".skills-content").waypoint(
      function () {
        $(".progress .progress-bar").each(function () {
          const value = $(this).attr("aria-valuenow");

          if (value) {
            $(this).css("width", value + "%");
          }
        });
      },
      {
        offset: "80%"
      }
    );
  }

  // Portfolio isotope dan filter
  $(window).on("load", function () {
    if ($.fn.isotope && $(".portfolio-container").length) {
      const portfolioIsotope = $(".portfolio-container").isotope({
        itemSelector: ".portfolio-item",
        layoutMode: "fitRows"
      });

      $("#portfolio-flters li").on("click", function () {
        $("#portfolio-flters li").removeClass("filter-active");
        $(this).addClass("filter-active");

        portfolioIsotope.isotope({
          filter: $(this).data("filter")
        });

        aosInit();
      });
    }

    // Venobox lightbox
    if ($.fn.venobox) {
      $(".venobox").venobox();
    }

    aosInit();
  });

  // Testimonials carousel
  if ($.fn.owlCarousel && $(".testimonials-carousel").length) {
    $(".testimonials-carousel").owlCarousel({
      autoplay: true,
      dots: true,
      loop: true,
      responsive: {
        0: {
          items: 1
        },
        768: {
          items: 2
        },
        900: {
          items: 2
        }
      }
    });
  }

  // Portfolio details carousel
  if ($.fn.owlCarousel && $(".portfolio-details-carousel").length) {
    $(".portfolio-details-carousel").owlCarousel({
      autoplay: true,
      dots: true,
      loop: true,
      items: 1
    });
  }
})(jQuery);


/* Console print */
console.log(
  `%c
 __       __            __              _______                                 __
/  |  _  /  |          /  |            /       \\                               /  |
$$ | / \\ $$ |  ______  $$ |____        $$$$$$$  |  ______   __     __  ______  $$ |  ______    ______    ______    ______
$$ |/$  \\$$ | /      \\ $$      \\       $$ |  $$ | /      \\ /  \\   /  |/      \\ $$ | /      \\  /      \\  /      \\  /      \\
$$ /$$$  $$ |/$$$$$$  |$$$$$$$  |      $$ |  $$ |/$$$$$$  |$$  \\ /$$//$$$$$$  |$$ |/$$$$$$  |/$$$$$$  |/$$$$$$  |/$$$$$$  |
$$ $$/$$ $$ |$$    $$ |$$ |  $$ |      $$ |  $$ |$$    $$ | $$  /$$/ $$    $$ |$$ |$$ |  $$ |$$ |  $$ |$$    $$ |$$ |  $$/
$$$$/  $$$$ |$$$$$$$$/ $$ |__$$ |      $$ |__$$ |$$$$$$$$/   $$ $$/  $$$$$$$$/ $$ |$$ \\__$$ |$$ |__$$ |$$$$$$$$/ $$ |
$$$/    $$$ |$$       |$$    $$/       $$    $$/ $$       |   $$$/   $$       |$$ |$$    $$/ $$    $$/ $$       |$$ |
$$/      $$/  $$$$$$$/ $$$$$$$/        $$$$$$$/   $$$$$$$/     $/     $$$$$$$/ $$/  $$$$$$/  $$$$$$$/   $$$$$$$/ $$/
                                                                                             $$ |
                                                                                             $$ |
                                                                                             $$/
`,
  "font-family: monospace"
);