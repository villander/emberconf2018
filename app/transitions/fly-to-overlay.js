import { animate, Promise } from "liquid-fire";

export default function flyToFont(opts={}) {
  if (!this.newElement) {
    return Promise.resolve();
  } else if (!this.oldElement) {
    this.newElement.css({visibility: ''});
    return Promise.resolve();
  }

  // set z-index of fly-to element higher than slide-over/under transitions
  this.oldElement.css('z-index', 3);

  var oldOffset = this.oldElement.offset();
  var newOffset = this.newElement.offset();

  if (opts.movingSide === 'new') {
    let motion = {
      translateX: [0, oldOffset.left - newOffset.left],
      translateY: [0, oldOffset.top - newOffset.top],
      outerWidth: [this.newElement.outerWidth(), this.oldElement.outerWidth()],
      outerHeight: [this.newElement.outerHeight(), this.oldElement.outerHeight()]
    };
    this.oldElement.css({ visibility: 'hidden' });
    return animate(this.newElement, motion, opts);
  } else {
    let motion = {
      translateX: newOffset.left - oldOffset.left,
      translateY: newOffset.top - oldOffset.top,
      outerWidth: this.newElement.outerWidth(),
      outerHeight: this.newElement.outerHeight()
    };
    this.newElement.css({ visibility: 'hidden' });
    return animate(this.oldElement, motion, opts).then(() => {
      this.newElement.css({ visibility: ''});
    });
  }
}

function rgbToHex(rgb){
  return '#' + rgb.substr(4, rgb.indexOf(')') - 4).split(',').map((color) => parseInt(color).toString(16)).join('');
}
