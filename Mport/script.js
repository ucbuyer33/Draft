
    (function() {
      var menuButton = document.getElementById('menuButton');
      var navbar = document.getElementById('navbar');
      var navLinks = document.querySelectorAll('#navbar a, .desktop a');
      var fadeEls = document.querySelectorAll('.fade-in');
      var sections = document.querySelectorAll('section[id]');

      if (menuButton) {
        menuButton.addEventListener('click', function() {
          menuButton.classList.toggle('active');
          if (navbar) navbar.classList.toggle('active');
        });
      }

      navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
          if (menuButton) menuButton.classList.remove('active');
          if (navbar) navbar.classList.remove('active');
        });
      });

      document.addEventListener('click', function(e) {
        if (!navbar) return;
        if (!navbar.classList.contains('active')) return;
        var clickedInsideMenu = navbar.contains(e.target);
        var clickedMenuButton = menuButton && menuButton.contains(e.target);
        if (!clickedInsideMenu && !clickedMenuButton) {
          if (menuButton) menuButton.classList.remove('active');
          navbar.classList.remove('active');
        }
      });

      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
          if (menuButton) menuButton.classList.remove('active');
          if (navbar) navbar.classList.remove('active');
        }
      });

      var internalLinks = document.querySelectorAll('a[href^="#"]');
      internalLinks.forEach(function(a) {
        a.addEventListener('click', function(e) {
          var href = this.getAttribute('href');
          if (href && href.startsWith('#') && href.length > 1) {
            var target = document.querySelector(href);
            if (target) {
              e.preventDefault();
              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        });
      });

      function checkFadeIn() {
        var windowHeight = window.innerHeight;
        fadeEls.forEach(function(el) {
          var rect = el.getBoundingClientRect();
          if (rect.top < windowHeight - 100) {
            el.classList.add('visible');
          }
        });
      }
      window.addEventListener('scroll', checkFadeIn);
      window.addEventListener('load', checkFadeIn);

      function onScrollSpy() {
        var middle = window.innerHeight / 2;
        var currentId = null;
        sections.forEach(function(section) {
          var rect = section.getBoundingClientRect();
          if (rect.top <= middle && rect.bottom >= middle) {
            currentId = section.getAttribute('id');
          }
        });

        if (currentId) {
          navLinks.forEach(function(link) {
            link.classList.remove('active');
            var href = link.getAttribute('href');
            if (href === ('#' + currentId)) {
              link.classList.add('active');
            }
          });
        }
      }
      window.addEventListener('scroll', onScrollSpy);
      window.addEventListener('load', onScrollSpy);
    })();
 