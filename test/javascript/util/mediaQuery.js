describe('MediaQuery utils', function () {

  var $iframe, _window, _document, plugin;

  /*
  * Media Query styles for the following configuration:
  *
  * $breakpoints: (
  *   small: 0,
  *   medium: 640px,
  *   large: 1024px,
  *   xlarge: 1200px,
  *   xxlarge: 1440px,
  * );
  *
  */
  const css = `
    .foundation-mq {
      font-family: "small=0em&medium=40em&large=64em&xlarge=75em&xxlarge=90em";
    }
  `;

  const injection = `
    <style type="text/css">${css}</style>
    <script src="http://127.0.0.1:3042/node_modules/jquery/dist/jquery.js" type='text/javascript' async=false defer=false ></script>
    <script src="http://127.0.0.1:3042/_build/assets/js/foundation.js" type='text/javascript' async=false defer=false></script>
    <script type='text/javascript' async=false defer=false>
      parent.window.__foundationIframeReady__();
    </script>
  `;

  beforeEach(function (done) {


    const iframe = document.createElement("iframe");
    document.body.appendChild(iframe);
    $iframe = $(iframe);
    $iframe.attr('frameBorder', 0);
    _window = iframe.contentWindow;
    _document = iframe.contentDocument;

    window.__foundationIframeReady__ = () => {
      plugin = _window.Foundation.MediaQuery;
      plugin._init();
      done();
    };

    var style = _document.createElement("style");
    style.type = "text/css";
    style.innerHTML = css;
    _document.head.appendChild(style);

    var script = _document.createElement("script");
    script.type = "text/javascript";
    script.async = false;
    script.src = 'http://127.0.0.1:3042/node_modules/jquery/dist/jquery.js';
    _document.body.appendChild(script);

    script = _document.createElement("script");
    script.type = "text/javascript";
    script.async = false;
    script.onload = () => window.__foundationIframeReady__();
    script.src = 'http://127.0.0.1:3042/_build/assets/js/foundation.js';
    _document.body.appendChild(script);

    // $iframe = $('<iframe></iframe>').appendTo('body');
    // _window = $iframe.get(0).contentWindow;
    // _document = $iframe.get(0).contentDocument;
    // const injectionElements = $.parseHTML(injection, _document, true);

    // $iframe.on('load', () => console.log('iframe load'));
    // $(window).on('load', () => console.log('window load'));
    // $(_document).on('load', () => console.log('document load'));

    // $(injectionElements).appendTo($(_document).find('head'));
  });

  afterEach(function() {
    $iframe.remove();
  });

  describe('atLeast()', function () {

    it('works', function (done) {
      $iframe.attr('width', 1023);

      (_window.innerWidth);
      plugin.atLeast('small').should.be.true;
      plugin.atLeast('medium').should.be.true;
      plugin.atLeast('large').should.be.false;
      plugin.atLeast('xlarge').should.be.false;
      plugin.atLeast('xxlarge').should.be.false;
      done();
    });

    it('still works', function (done) {
      $iframe.attr('width', 1025);

      (_window.innerWidth);
      plugin.atLeast('small').should.be.true;
      plugin.atLeast('medium').should.be.true;
      plugin.atLeast('large').should.be.true;
      plugin.atLeast('xlarge').should.be.false;
      plugin.atLeast('xxlarge').should.be.false;
      done();
    });

  });

});
