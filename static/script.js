const packsAlign = ['brandPack', 'audiencePack'];
let navFramesUniquity = new Array();

const storeScroll = () => {
  if(!document.body.classList.contains('start')) {
    const firstBlockHeight = document.getElementById('firstTouch').clientHeight

    if(!document.body.classList.contains('auto-scroll')) {
      if(window.scrollY >= firstBlockHeight && !document.body.classList.contains('sticky')) {
        document.body.classList.add('sticky')
      }
      else if(window.scrollY <= firstBlockHeight && document.body.classList.contains('sticky')) {
        document.body.classList.remove('sticky')
      }
    }
  }
  else {document.body.classList.add('sticky')}
};
/*
const waitHydrate = () => {
  setTimeout(function() {
    createFrames();
    colsAlignment();
  }, 2000);
};*/
const createFrames = () => {
  if(document.getElementById('cnt')) {
    const navs = document.getElementById('cnt').getElementsByClassName('navFrame')

    if(navs) {
      const framesHolder = document.getElementById('framesHolder')

      for(let f = 0; f < navs.length; f++) {
        const frameID = navs[f].getAttribute('id')
        const frameHTML = navs[f].cloneNode(true)

        if(!navFramesUniquity.includes(frameHTML.id)) {
          navFramesUniquity.push(frameHTML.id)
          frameHTML.removeAttribute('id')

          if(frameHTML.querySelector('.packagesInfo')) {
            frameHTML.querySelector('.packagesInfo').remove()
          }

          const newMenuFrame = document.createElement('div')
          const newMenuFrameWrap = document.createElement('div')

          newMenuFrame.classList.add('block-frame', 'ease2')
          newMenuFrame.setAttribute('onClick', "goTo(this, '"+frameID+"')")
          newMenuFrameWrap.classList.add('frame-wrap')

          newMenuFrame.appendChild(frameHTML)
          newMenuFrameWrap.appendChild(newMenuFrame)
          framesHolder.appendChild(newMenuFrameWrap)
        }
      }
    }
  }
};


const colsAlignment = () => {
  if(window.innerWidth >= 1280) {
    if(packsAlign.length > 0) {
      for(let b = 0; b < packsAlign.length; b++) {
        if(document.getElementById(packsAlign[b])) {
          if(document.getElementById(packsAlign[b]).getElementsByClassName('pack_item')) {
            const packs = document.getElementById(packsAlign[b]).getElementsByClassName('pack_item')
            let descrSize = 0

            // set it to default
            for(let p = 0; p < packs.length; p++) {
              packs[p].getElementsByClassName('pac_descr')[0].removeAttribute('style')
            }

            // get max height
            for(let p = 0; p < packs.length; p++) {
              const thisHeight = packs[p].getElementsByClassName('pac_descr')[0].clientHeight
              if(thisHeight > descrSize) {descrSize = thisHeight}
            }

            // set it to all
            for(let p = 0; p < packs.length; p++) {
              packs[p].getElementsByClassName('pac_descr')[0].setAttribute('style', 'min-height: ' + (descrSize + 25) + 'px')
            }
          }
        }
      }
    }
  }
};



document.addEventListener('readystatechange', tryme, {passive: true});
function tryme() {
  let framesInterval = setInterval(function() {
    if(document.getElementById('cnt')) {
      if(document.getElementById('cnt').getElementsByClassName('navFrame').length > 0) {
        createFrames();
        clearInterval(framesInterval);
      }
    }
  }, 200);

  let colsInterval = setInterval(function() {
    if(document.querySelectorAll('.pack_item').length > 0) {
      colsAlignment();
      clearInterval(colsInterval);
    }
  }, 120);
}



const checkVisibilities = () => {
  const sections = document.querySelectorAll('.detectVisibility');
  sections.forEach((item) => {
    if(!item.classList.contains('section--thisVisible')) {
      if(item.offsetTop < Math.round(window.scrollY + window.innerHeight * .5)) {
        item.classList.add('section--thisVisible');
      }
    }
    else if(item.offsetTop > Math.round(window.scrollY + window.innerHeight)) {
        item.classList.remove('section--thisVisible');
    }
  });
};

window.addEventListener('scroll', checkVisibilities, {passive: true});

checkVisibilities();




function goTo(e, id) {
  if(id && document.getElementById(id)) {
    document.body.classList.add('auto-scroll')
    window.scrollTo({ top: 0 });

    const wW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const sizeRatio = (wW < 1280)? 18 : 7;
    const targetPosition = document.getElementById(id).getElementsByClassName('packagesBlock')[0].getBoundingClientRect();
    const diff = wW * (sizeRatio / 100)
    const scrollTo = Math.round(targetPosition.top - diff);
    e = e || window.event;
    let clicked = e.target || e.srcElement || e;
    if(clicked.nodeType == 3) {clicked = clicked.parentNode;}

    window.scrollTo({ top: scrollTo });
    clicked.classList.add('start-zoom');

    const offsetLeft = clicked.getBoundingClientRect().left;
    const offsetTop = clicked.getBoundingClientRect().top;

    document.body.classList.remove('sticky')
    clicked.setAttribute('style', '-webkit-transform: translate(-'+offsetLeft+'px, -'+offsetTop+'px);-moz-transform: translate(-'+offsetLeft+'px, -'+offsetTop+'px);transform: translate(-'+offsetLeft+'px, -'+offsetTop+'px);')
    setTimeout(function() {
      document.body.classList.add('hideMenu')
      document.body.classList.remove('menu-open')
      clicked.removeAttribute('style')
      clicked.classList.remove('start-zoom')

      setTimeout(function() {
        document.body.classList.remove('hideMenu')
      }, 200)

      document.body.classList.remove('auto-scroll')
      document.body.classList.remove('fast-hide')
    }, 850)


    // close deep popup
    const deep = document.getElementById('deep')

    document.body.classList.add('fast-hide')
    document.body.classList.remove('sidebarActivated')
    deep.removeAttribute('data-target')
  }
};




window.addEventListener('scroll', storeScroll, {passive: true});
window.addEventListener('load', storeScroll, {passive: true});
//window.addEventListener('load', waitHydrate, {passive: true});
window.addEventListener('resize', colsAlignment, {passive: true});




