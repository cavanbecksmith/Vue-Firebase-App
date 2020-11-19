import $ from 'jquery';

import 'prismjs';
// const loadLanguages = require('prismjs/components/');
// loadLanguages(['css', 'csharp', 'markdown', 'php', 'javascript']);
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-css';
// import 'prismjs/components/prism-php';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-javascript';
import 'prismjs/plugins/line-highlight/prism-line-highlight.js';

var highlights = {
    init: function () {
      this.highlightCode();
      // this.collapseCode();
    },
    highlightCode: function () {
      $('.post').each(function(){

        $('pre').each(function(){

          $(this).attr('data-start',0);

          var code = $(this).text();

          $(this).addClass('line-numbers');

          if($(this).hasClass('language-csharp')){
            // $(this).html(Prism.highlight(code, Prism.languages.csharp));
          }
          else if($(this).hasClass('language-markup')){
            $(this).html(Prism.highlight(code, Prism.languages.markup));
          }
          else if($(this).hasClass('language-javascript')){
            $(this).html(Prism.highlight(code, Prism.languages.javascript));
          }
          else if($(this).hasClass('language-php')){
            $(this).html(Prism.highlight(code, Prism.languages.php));
          }
          else if($(this).hasClass('language-css')){
            $(this).html(Prism.highlight(code, Prism.languages.css));
          }

        });

      });
    },
    hightlightAll: function () {
      Prism.highlightAll();
      // this.collapseCode();
    },
    collapseCode: function(){
      $('.HTML').each(function(){
        var pre = $(this).find('pre');
        var hideClass = 'collapsed'
        pre.find('code').addClass(hideClass)
        pre.prepend('<div class="icon icon--toggle"><span class="line--vertical"></span><span class="line--horizontal"></span></div>');
      });

      // toggleIcon();

      function toggleIcon(){

        $('.icon--toggle').on('click', function(){
          $(this).toggleClass('toggle--horizontal');
          $(this).parent().find('code').toggleClass('collapsed');
        });

        $('.icon--close').on('click', function(){
          $(this).toggleClass('toggle--open');
          $(this).parent().find('code').toggleClass('collapsed');
        });

      }

      function toggleCollapse(){
        $('')
      }

    }
}

export default{highlights}