/**
 * Dialogcards module
 *
 * @param {jQuery} $
 */
H5P.Dialogcards = (function ($, Audio, JoubelUI) {

  /**
   * Initialize module.
   *
   * @param {Object} params Behavior settings
   * @param {Number} id Content identification
   * @param {Object} contentData
   * @returns {C} self
   */
  function C(params, id, contentData) {
    var self = this;
    H5P.EventDispatcher.call(this);

    self.contentId = self.id = id;

    // Var cardOrder stores order of cards to allow resuming of card set.
    // Var progress stores current card index.
    this.contentData = contentData || {};

    // Set default behavior.
    self.params = $.extend({
      title: '',
      description: "Sit in pairs and make up sentences where you include the expressions below.<br/>Example: I should have said yes, HOWEVER I kept my mouth shut.",
      next: "Next",
      prev: "Previous",
      retry: "Retry",
      answer: "Turn",
      progressText: "Card @card of @total",
      cardFrontLabel: "Card front",
      cardBackLabel: "Card back",
      tipButtonLabel: 'Show tip',
      audioNotSupported: 'Your browser does not support this audio',
      dialogs: [
        {
          text: 'Horse',
          answer: 'Hest'
        },
        {
          text: 'Cow',
          answer: 'Ku'
        }
      ],
      behaviour: {
        enableRetry: true,
        //randomAnswers: false, // This param is not used!
        scaleTextNotCard: false,
        randomCards: false
      }
    }, params);

    self._current = -1;
    self._turned = [];
    self.$images = [];
    self.audios = [];
  }

  C.prototype = Object.create(H5P.EventDispatcher.prototype);
  C.prototype.constructor = C;

  /**
   * Attach h5p inside the given container.
   *
   * @param {jQuery} $container
   */
  C.prototype.attach = function ($container) {
    var self = this;
    var title = $('<div>' + self.params.title + '</div>').text().trim();

    self.$inner = $container
      .addClass('h5p-dialogcards')
      .append($((title ? '<div class="h5p-dialogcards-title"><div class="h5p-dialogcards-title-inner">' + self.params.title + '</div></div>' : '') +
      '<div class="h5p-dialogcards-description">' + self.params.description + '</div>'
      ));

    if (self.params.behaviour.scaleTextNotCard) {
      $container.addClass('h5p-text-scaling');
    }

    self.initCards(self.params.dialogs)
      .appendTo(self.$inner);

    self.$cardSideAnnouncer = $('<div>', {
      html: self.params.cardFrontLabel,
      'class': 'h5p-dialogcards-card-side-announcer',
      'aria-live': 'polite',
      'aria-hidden': 'true'
    }).appendTo(self.$inner);

    self.createFooter()
      .appendTo(self.$inner);

    self.updateNavigation();

    self.on('reset', function () {
      self.reset();
    });

    self.on('resize', self.resize);
    self.trigger('resize');
  };

  /**
   * Create footer/navigation line
   *
   * @returns {*|jQuery|HTMLElement} Footer element
   */
  C.prototype.createFooter = function () {
    var self = this;
    var $footer = $('<nav>', {
      'class': 'h5p-dialogcards-footer',
      'role': 'navigation'
    });

    self.$prev = JoubelUI.createButton({
      'class': 'h5p-dialogcards-footer-button h5p-dialogcards-prev truncated',
      'title': self.params.prev
    }).click(function () {
      self.prevCard();
    }).appendTo($footer);

    self.$next = JoubelUI.createButton({
      'class': 'h5p-dialogcards-footer-button h5p-dialogcards-next truncated',
      'title': self.params.next
    }).click(function () {
      self.nextCard();
    }).appendTo($footer);

    self.$retry = JoubelUI.createButton({
      'class': 'h5p-dialogcards-footer-button h5p-dialogcards-retry h5p-dialogcards-disabled',
      'title': self.params.retry,
      'html': self.params.retry
    }).click(function () {
      self.trigger('reset');
    }).appendTo($footer);

    self.$progress = $('<div>', {
      'class': 'h5p-dialogcards-progress',
      'aria-live': 'assertive'
    }).appendTo($footer);

    return $footer;
  };

  /**
   * Called when all cards has been loaded.
   */
  C.prototype.updateImageSize = function () {
    var self = this;

    // Find highest card content
    var relativeHeightCap = 15;
    var height = 0;
    var i;
    var foundImage = false;
    for (i = 0; i < self.params.dialogs.length; i++) {
      var card = self.params.dialogs[i];
      var $card = self.$current.find('.h5p-dialogcards-card-content');

      if (card.image === undefined) {
        continue;
      }
      foundImage = true;
      var imageHeight = card.image.height / card.image.width * $card.get(0).getBoundingClientRect().width;

      if (imageHeight > height) {
        height = imageHeight;
      }
    }

    if (foundImage) {
      var relativeImageHeight = height / parseFloat(self.$inner.css('font-size'));
      if (relativeImageHeight > relativeHeightCap) {
        relativeImageHeight = relativeHeightCap;
      }
      self.$images.forEach(function ($img) {
        $img.parent().css('height', relativeImageHeight + 'em');
      });
    }
  };

  /**
   * Adds tip to a card
   *
   * @param {jQuery} $card The card
   * @param {String} [side=front] Which side of the card
   * @param {Number} [index] Index of card
   */
  C.prototype.addTipToCard = function($card, side, index) {
    var self = this;

    // Make sure we have a side
    if (side !== 'back') {
      side = 'front';
    }

    // Make sure we have an index

    if (index === undefined) {
      index = self.$current.index();
    }

    // Remove any old tips
    $card.find('.joubel-tip-container').remove();

    // Add new tip if set and has length after trim
    var tips = self.params.dialogs[index].tips;
    if (tips !== undefined && tips[side] !== undefined) {
      var tip = tips[side].trim();
      if (tip.length) {
        $card.find('.h5p-dialogcards-card-text-wrapper .h5p-dialogcards-card-text-inner')
          .after(JoubelUI.createTip(tip, {
            tipLabel: self.params.tipButtonLabel
          }));
      }
    }
  };

  /**
   * Creates all cards and appends them to card wrapper.
   *
   * @param {Array} cards Card parameters
   * @returns {*|jQuery|HTMLElement} Card wrapper set
   */
  C.prototype.initCards = function (cards) {
    var self = this;
    var loaded = 0;
    var initLoad = 2;

    // Randomize cards order
    if (self.params.behaviour.randomCards) {
      cards = H5P.shuffleArray(cards);
    }

    self.$cardwrapperSet = $('<div>', {
      'class': 'h5p-dialogcards-cardwrap-set'
    });

    var setCardSizeCallback = function () {
      loaded++;
      if (loaded === initLoad) {
        self.resize();
      }
    };


    for (var i = 0; i < cards.length; i++) {

      // Load cards progressively
      if (i >= initLoad) {
        break;
      }

      var $cardWrapper = self.createCard(cards[i], i, setCardSizeCallback);

      // Set current card
      if (i === 0) {
        $cardWrapper.addClass('h5p-dialogcards-current');
        self.$current = $cardWrapper;
      }

      self.addTipToCard($cardWrapper.find('.h5p-dialogcards-card-content'), 'front', i);

      self.$cardwrapperSet.append($cardWrapper);
    }

    return self.$cardwrapperSet;
  };

  /**
   * Create a single card card
   *
   * @param {Object} card Card parameters
   * @param {number} cardNumber Card number in order of appearance
   * @param {Function} [setCardSizeCallback] Set card size callback
   * @returns {*|jQuery|HTMLElement} Card wrapper
   */
  C.prototype.createCard = function (card, cardNumber, setCardSizeCallback) {
    var self = this;
    var $cardWrapper = $('<div>', {
      'class': 'h5p-dialogcards-cardwrap'
    });

    var $cardHolder = $('<div>', {
      'class': 'h5p-dialogcards-cardholder'
    }).appendTo($cardWrapper);

    // Progress for assistive technologies
    var progressText = self.params.progressText
      .replace('@card', (cardNumber + 1).toString())
      .replace('@total', (self.params.dialogs.length).toString());

    $('<div>', {
      'class': 'h5p-dialogcards-at-progress',
      'text': progressText
    }).appendTo($cardHolder);

    self.createCardContent(card, cardNumber, setCardSizeCallback)
      .appendTo($cardHolder);

    return $cardWrapper;

  };

  /**
   * Create content for a card
   *
   * @param {Object} card Card parameters
   * @param {number} cardNumber Card number in order of appearance
   * @param {Function} [setCardSizeCallback] Set card size callback
   * @returns {*|jQuery|HTMLElement} Card content wrapper
   */
  C.prototype.createCardContent = function (card, cardNumber, setCardSizeCallback) {
    var self = this;
    var $cardContent = $('<div>', {
      'class': 'h5p-dialogcards-card-content'
    });


    self.createCardImage(card, setCardSizeCallback)
      .appendTo($cardContent);

    var $cardTextWrapper = $('<div>', {
      'class': 'h5p-dialogcards-card-text-wrapper'
    }).appendTo($cardContent);

    var $cardTextInner = $('<div>', {
      'class': 'h5p-dialogcards-card-text-inner'
    }).appendTo($cardTextWrapper);

    var $cardTextInnerContent = $('<div>', {
      'class': 'h5p-dialogcards-card-text-inner-content'
    }).appendTo($cardTextInner);

    self.createCardAudio(card)
      .appendTo($cardTextInnerContent);

    var $cardText = $('<div>', {
      'class': 'h5p-dialogcards-card-text'
    }).appendTo($cardTextInnerContent);

    $('<div>', {
      'class': 'h5p-dialogcards-card-text-area',
      'tabindex': '-1',
      'html': card.text
    }).appendTo($cardText);

    if (!card.text || !card.text.length) {
      $cardText.addClass('hide');
    }

    self.createCardFooter()
      .appendTo($cardTextWrapper);

    return $cardContent;
  };

  /**
   * Create card footer
   *
   * @returns {*|jQuery|HTMLElement} Card footer element
   */
  C.prototype.createCardFooter = function () {
    var self = this;
    var $cardFooter = $('<div>', {
      'class': 'h5p-dialogcards-card-footer'
    });

    JoubelUI.createButton({
      'class': 'h5p-dialogcards-turn',
      'html': self.params.answer
    }).click(function () {
      self.turnCard($(this).parents('.h5p-dialogcards-cardwrap'));
    }).appendTo($cardFooter);

    return $cardFooter;
  };

  /**
   * Create card image
   *
   * @param {Object} card Card parameters
   * @param {Function} [loadCallback] Function to call when loading image
   * @returns {*|jQuery|HTMLElement} Card image wrapper
   */
  C.prototype.createCardImage = function (card, loadCallback) {
    var self = this;
    var $image;
    var $imageWrapper = $('<div>', {
      'class': 'h5p-dialogcards-image-wrapper'
    });

    if (card.image !== undefined) {
      $image = $('<img class="h5p-dialogcards-image" src="' + H5P.getPath(card.image.path, self.id) + '"/>');
      if (loadCallback) {
        $image.load(loadCallback);
      }

      if (card.imageAltText) {
        $image.attr('alt', card.imageAltText);
      }
    }
    else {
      $image = $('<div class="h5p-dialogcards-image"></div>');
      if (loadCallback) {
        loadCallback();
      }
    }
    self.$images.push($image);
    $image.appendTo($imageWrapper);

    return $imageWrapper;
  };

  /**
   * Create card audio
   *
   * @param {Object} card Card parameters
   * @returns {*|jQuery|HTMLElement} Card audio element
   */
  C.prototype.createCardAudio = function (card) {
    var self = this;
    var audio;
    var $audioWrapper = $('<div>', {
      'class': 'h5p-dialogcards-audio-wrapper'
    });
    if (card.audio !== undefined) {

      var audioDefaults = {
        files: card.audio,
        audioNotSupported: self.params.audioNotSupported
      };

      audio = new Audio(audioDefaults, self.id);
      audio.attach($audioWrapper);

      // Have to stop else audio will take up a socket pending forever in chrome.
      if (audio.audio && audio.audio.preload) {
        audio.audio.preload = 'none';
      }
    }
    else {
      $audioWrapper.addClass('hide');
    }
    self.audios.push(audio);

    return $audioWrapper;
  };

  /**
   * Update navigation text and show or hide buttons.
   */
  C.prototype.updateNavigation = function () {
    var self = this;

    if (self.$current.next('.h5p-dialogcards-cardwrap').length) {
      self.$next.removeClass('h5p-dialogcards-disabled');
      self.$retry.addClass('h5p-dialogcards-disabled');
    }
    else {
      self.$next.addClass('h5p-dialogcards-disabled');
    }

    if (self.$current.prev('.h5p-dialogcards-cardwrap').length && !self.params.behaviour.disableBackwardsNavigation) {
      self.$prev.removeClass('h5p-dialogcards-disabled');
    }
    else {
      self.$prev.addClass('h5p-dialogcards-disabled');
    }

    self.$progress.text(self.params.progressText.replace('@card', self.$current.index() + 1).replace('@total', self.params.dialogs.length));
    self.resizeOverflowingText();
  };

  /**
   * Show next card.
   */
  C.prototype.nextCard = function () {
    var self = this;
    var $next = self.$current.next('.h5p-dialogcards-cardwrap');

    // Next card not loaded or end of cards
    if ($next.length) {
      self.stopAudio(self.$current.index());
      self.$current.removeClass('h5p-dialogcards-current').addClass('h5p-dialogcards-previous');
      self.$current = $next.addClass('h5p-dialogcards-current');
      self.setCardFocus(self.$current);

      // Add next card.
      var $loadCard = self.$current.next('.h5p-dialogcards-cardwrap');
      if (!$loadCard.length && self.$current.index() + 1 < self.params.dialogs.length) {
        var $cardWrapper = self.createCard(self.params.dialogs[self.$current.index() + 1], self.$current.index() + 1)
          .appendTo(self.$cardwrapperSet);
        self.addTipToCard($cardWrapper.find('.h5p-dialogcards-card-content'), 'front', self.$current.index() + 1);
        self.resize();
      }

      // Update navigation
      self.updateNavigation();
    }
  };

  /**
   * Show previous card.
   */
  C.prototype.prevCard = function () {
    var self = this;
    var $prev = self.$current.prev('.h5p-dialogcards-cardwrap');

    if ($prev.length) {
      self.stopAudio(self.$current.index());
      self.$current.removeClass('h5p-dialogcards-current');
      self.$current = $prev.addClass('h5p-dialogcards-current').removeClass('h5p-dialogcards-previous');
      self.setCardFocus(self.$current);
      self.updateNavigation();
    }
  };

  /**
   * Show the opposite site of the card.
   *
   * @param {jQuery} $card
   */
  C.prototype.turnCard = function ($card) {
    var self = this;
    var $c = $card.find('.h5p-dialogcards-card-content');
    var $ch = $card.find('.h5p-dialogcards-cardholder').addClass('h5p-dialogcards-collapse');

    // Removes tip, since it destroys the animation:
    $c.find('.joubel-tip-container').remove();

    // Check if card has been turned before
    var turned = $c.hasClass('h5p-dialogcards-turned');
    self.$cardSideAnnouncer.html(turned ? self.params.cardFrontLabel : self.params.cardBackLabel);

    // Update HTML class for card
    $c.toggleClass('h5p-dialogcards-turned', !turned);

    setTimeout(function () {
      $ch.removeClass('h5p-dialogcards-collapse');
      self.changeText($c, self.params.dialogs[$card.index()][turned ? 'text' : 'answer']);
      if (turned) {
        $ch.find('.h5p-audio-inner').removeClass('hide');
      }
      else {
        self.removeAudio($ch);
      }

      // Add backside tip
      // Had to wait a little, if not Chrome will displace tip icon
      setTimeout(function () {
        self.addTipToCard($c, turned ? 'front' : 'back');
        if (!self.$current.next('.h5p-dialogcards-cardwrap').length) {
          if (self.params.behaviour.enableRetry) {
            self.$retry.removeClass('h5p-dialogcards-disabled');
            self.truncateRetryButton();
            self.resizeOverflowingText();
          }
        }
      }, 200);

      self.resizeOverflowingText();

      // Focus text
      $card.find('.h5p-dialogcards-card-text-area').focus();
    }, 200);
  };

  /**
   * Change text of card, used when turning cards.
   *
   * @param $card
   * @param text
   */
  C.prototype.changeText = function ($card, text) {
    var $cardText = $card.find('.h5p-dialogcards-card-text-area');
    $cardText.html(text);
    $cardText.toggleClass('hide', (!text || !text.length));
  };

  /**
   * Stop audio of card with cardindex

   * @param {Number} cardIndex Index of card
   */
  C.prototype.stopAudio = function (cardIndex) {
    var self = this;
    var audio = self.audios[cardIndex];
    if (audio && audio.stop) {
      audio.stop();
    }
  };

  /**
   * Hide audio button
   *
   * @param $card
   */
  C.prototype.removeAudio = function ($card) {
    var self = this;
    self.stopAudio($card.closest('.h5p-dialogcards-cardwrap').index());
    $card.find('.h5p-audio-inner')
      .addClass('hide');
  };

  /**
   * Show all audio buttons
   */
  C.prototype.showAllAudio = function () {
    var self = this;
    self.$cardwrapperSet.find('.h5p-audio-inner')
      .removeClass('hide');
  };

  /**
   * Reset the task so that the user can do it again.
   */
  C.prototype.reset = function () {
    var self = this;
    var $cards = self.$inner.find('.h5p-dialogcards-cardwrap');

    self.stopAudio(self.$current.index());
    self.$current.removeClass('h5p-dialogcards-current');
    self.$current = $cards.filter(':first').addClass('h5p-dialogcards-current');
    self.updateNavigation();

    $cards.each(function (index) {
      var $card = $(this).removeClass('h5p-dialogcards-previous');
      self.changeText($card, self.params.dialogs[$card.index()].text);
      var $cardContent = $card.find('.h5p-dialogcards-card-content');
      $cardContent.removeClass('h5p-dialogcards-turned');
      self.addTipToCard($cardContent, 'front', index);
    });
    self.$retry.addClass('h5p-dialogcards-disabled');
    self.showAllAudio();
    self.resizeOverflowingText();
    self.setCardFocus(self.$current);
  };

  /**
   * Update the dimensions of the task when resizing the task.
   */
  C.prototype.resize = function () {
    var self = this;
    var maxHeight = 0;
    self.updateImageSize();
    if (!self.params.behaviour.scaleTextNotCard) {
      self.determineCardSizes();
    }

    // Reset card-wrapper-set height
    self.$cardwrapperSet.css('height', 'auto');

    //Find max required height for all cards
    self.$cardwrapperSet.children().each( function () {
      var wrapperHeight = $(this).css('height', 'initial').outerHeight();
      $(this).css('height', 'inherit');
      maxHeight = wrapperHeight > maxHeight ? wrapperHeight : maxHeight;

      // Check height
      if (!$(this).next('.h5p-dialogcards-cardwrap').length) {
        var initialHeight = $(this).find('.h5p-dialogcards-cardholder').css('height', 'initial').outerHeight();
        maxHeight = initialHeight > maxHeight ? initialHeight : maxHeight;
        $(this).find('.h5p-dialogcards-cardholder').css('height', 'inherit');
      }
    });
    var relativeMaxHeight = maxHeight / parseFloat(self.$cardwrapperSet.css('font-size'));
    self.$cardwrapperSet.css('height', relativeMaxHeight + 'em');
    self.scaleToFitHeight();
    self.truncateRetryButton();
    self.resizeOverflowingText();
  };

  /**
   * Resizes each card to fit its text
   */
  C.prototype.determineCardSizes = function () {
    var self = this;

    if (self.cardSizeDetermined === undefined) {
      // Keep track of which cards we've already determined size for
      self.cardSizeDetermined = [];
    }

    // Go through each card
    self.$cardwrapperSet.children(':visible').each(function (i) {
      if (self.cardSizeDetermined.indexOf(i) !== -1) {
        return; // Already determined, no need to determine again.
      }
      self.cardSizeDetermined.push(i);

      var $content = $('.h5p-dialogcards-card-content', this);
      var $text = $('.h5p-dialogcards-card-text-inner-content', $content);

      // Grab size with text
      var textHeight = $text[0].getBoundingClientRect().height;

      // Change to answer
      self.changeText($content, self.params.dialogs[i].answer);

      // Grab size with answer
      var answerHeight = $text[0].getBoundingClientRect().height;

      // Use highest
      var useHeight = (textHeight > answerHeight ? textHeight : answerHeight);

      // Min. limit
      var minHeight = parseFloat($text.parent().parent().css('minHeight'));
      if (useHeight < minHeight) {
        useHeight =  minHeight;
      }

      // Convert to em
      var fontSize = parseFloat($content.css('fontSize'));
      useHeight /= fontSize;

      // Set height
      $text.parent().css('height', useHeight + 'em');

      // Change back to text
      self.changeText($content, self.params.dialogs[i].text);
    });
  };

  C.prototype.scaleToFitHeight = function () {
    var self = this;
    if (!self.$cardwrapperSet || !self.$cardwrapperSet.is(':visible') || !self.params.behaviour.scaleTextNotCard) {
      return;
    }

    // Resize font size to fit inside CP
    if (self.$inner.parents('.h5p-course-presentation').length) {
      var $parentContainer = self.$inner.parent();
      if (self.$inner.parents('.h5p-popup-container').length) {
        $parentContainer = self.$inner.parents('.h5p-popup-container');
      }
      var containerHeight = $parentContainer.get(0).getBoundingClientRect().height;
      var getContentHeight = function () {
        var contentHeight = 0;
        self.$inner.children().each(function () {
          contentHeight += $(this).get(0).getBoundingClientRect().height +
          parseFloat($(this).css('margin-top')) + parseFloat($(this).css('margin-bottom'));
        });
        return contentHeight;
      };
      var contentHeight = getContentHeight();
      var parentFontSize = parseFloat(self.$inner.parent().css('font-size'));
      var newFontSize = parseFloat(self.$inner.css('font-size'));

      // Decrease font size
      if (containerHeight < contentHeight) {
        while (containerHeight < contentHeight) {
          newFontSize -= C.SCALEINTERVAL;

          // Cap at min font size
          if (newFontSize < C.MINSCALE) {
            break;
          }

          // Set relative font size to scale with full screen.
          self.$inner.css('font-size', (newFontSize / parentFontSize) + 'em');
          contentHeight = getContentHeight();
        }
      }
      else { // Increase font size
        var increaseFontSize = true;
        while (increaseFontSize) {
          newFontSize += C.SCALEINTERVAL;

          // Cap max font size
          if (newFontSize > C.MAXSCALE) {
            increaseFontSize = false;
            break;
          }

          // Set relative font size to scale with full screen.
          var relativeFontSize = newFontSize / parentFontSize;
          self.$inner.css('font-size', relativeFontSize + 'em');
          contentHeight = getContentHeight();
          if (containerHeight <= contentHeight) {
            increaseFontSize = false;
            relativeFontSize = (newFontSize - C.SCALEINTERVAL) / parentFontSize;
            self.$inner.css('font-size', relativeFontSize + 'em');
          }
        }
      }
    }
    else { // Resize mobile view
      self.resizeOverflowingText();
    }
  };

  /**
   * Resize the font-size of text areas that tend to overflow when dialog cards
   * is squeezed into a tiny container.
   */
  C.prototype.resizeOverflowingText = function () {
    var self = this;

    if (!self.params.behaviour.scaleTextNotCard) {
      return; // No text scaling today
    }

    // Resize card text if needed
    var $textContainer = self.$current.find('.h5p-dialogcards-card-text');
    var $text = $textContainer.children();
    self.resizeTextToFitContainer($textContainer, $text);
  };

  /**
   * Increase or decrease font size so text wil fit inside container.
   *
   * @param {jQuery} $textContainer Outer container, must have a set size.
   * @param {jQuery} $text Inner text container
   */
  C.prototype.resizeTextToFitContainer = function ($textContainer, $text) {
    var self = this;

    // Reset text size
    $text.css('font-size', '');

    // Measure container and text height
    var currentTextContainerHeight = $textContainer.get(0).getBoundingClientRect().height;
    var currentTextHeight = $text.get(0).getBoundingClientRect().height;
    var parentFontSize = parseFloat($textContainer.css('font-size'));
    var fontSize = parseFloat($text.css('font-size'));
    var mainFontSize = parseFloat(self.$inner.css('font-size'));

    // Decrease font size
    if (currentTextHeight > currentTextContainerHeight) {
      var decreaseFontSize = true;
      while (decreaseFontSize) {

        fontSize -= C.SCALEINTERVAL;

        if (fontSize < C.MINSCALE) {
          decreaseFontSize = false;
          break;
        }

        $text.css('font-size', (fontSize / parentFontSize) + 'em');

        currentTextHeight = $text.get(0).getBoundingClientRect().height;
        if (currentTextHeight <= currentTextContainerHeight) {
          decreaseFontSize = false;
        }
      }

    }
    else { // Increase font size
      var increaseFontSize = true;
      while (increaseFontSize) {
        fontSize += C.SCALEINTERVAL;

        // Cap at  16px
        if (fontSize > mainFontSize) {
          increaseFontSize = false;
          break;
        }

        // Set relative font size to scale with full screen.
        $text.css('font-size', fontSize / parentFontSize + 'em');
        currentTextHeight = $text.get(0).getBoundingClientRect().height;
        if (currentTextHeight >= currentTextContainerHeight) {
          increaseFontSize = false;
          fontSize = fontSize- C.SCALEINTERVAL;
          $text.css('font-size', fontSize / parentFontSize + 'em');
        }
      }
    }
  };

  /**
   * Set focus to a given card
   *
   * @param {jQuery} $card Card that should get focus
   */
  C.prototype.setCardFocus = function ($card) {
    // Wait for transition, then set focus
    $card.one('transitionend', function () {
      $card.find('.h5p-dialogcards-card-text-area').focus();
    });
  };

  /**
   * Truncate retry button if width is small.
   */
  C.prototype.truncateRetryButton = function () {
    var self = this;
    if (!self.$retry) {
      return;
    }

    // Reset button to full size
    self.$retry.removeClass('truncated');
    self.$retry.html(self.params.retry);

    // Measure button
    var maxWidthPercentages = 0.3;
    var retryWidth = self.$retry.get(0).getBoundingClientRect().width +
        parseFloat(self.$retry.css('margin-left')) + parseFloat(self.$retry.css('margin-right'));
    var retryWidthPercentage = retryWidth / self.$retry.parent().get(0).getBoundingClientRect().width;

    // Truncate button
    if (retryWidthPercentage > maxWidthPercentages) {
      self.$retry.addClass('truncated');
      self.$retry.html('');
    }
  };

  /**
   * Get the content type title.
   *
   * @return {string} title.
   */
  C.prototype.getTitle = function () {
    return H5P.createTitle((this.contentData && this.contentData.metadata && this.contentData.metadata.title) ? this.contentData.metadata.title : 'Dialog Cards');
  };
  C.SCALEINTERVAL = 0.2;
  C.MAXSCALE = 16;
  C.MINSCALE = 4;

  return C;
})(H5P.jQuery, H5P.Audio, H5P.JoubelUI);
