function ImageChill({
  selector = ".lazyload",
  loadedClass = "loaded",
  src = "data-src",
  srcSet = "data-src-set",
  sizes = "data-sizes",
  rootMargin = "0px",
} = {}) {
  // Let everyone know images are chillin
  console.log("%c⛄", "text-shadow: 0 2px 3px rgba(0, 0, 0, 0.4); font-size: 30px;");

  this.images = document.querySelectorAll(selector);

  // Add loaded class
  const addLoadedClass = el => {
    el.classList.add(loadedClass);
  };

  // function to load an image
  const loadImage = img => {
    const dataSrc = img.getAttribute(src);
    const dataSrcSet = img.getAttribute(srcSet);
    const dataSizes = img.getAttribute(sizes) || "";
    const isImage = img.tagName.toLowerCase() === "img";
    if (isImage) {
      if (dataSrc && !dataSrcSet) {
        const newImg = new Image();
        newImg.src = dataSrc;
        newImg.onload = () => {
          img.src = dataSrc;
          addLoadedClass(img);
        };
      }
      if (dataSrcSet) {
        let newSrcSetImg = new Image();
        newSrcSetImg.srcset = dataSrcSet;
        newSrcSetImg.sizes = dataSizes;
        newSrcSetImg.onload = () => {
          img.srcset = dataSrcSet;
          img.sizes = dataSizes;
          img.src = dataSrc;
          addLoadedClass(img);
          // These next two lines remove reference to the image so it can be garbage collected. Otherwise the script can cause downloading of additional images on screen resizing due to srcset.
          newSrcSetImg.onload = null;
          newSrcSetImg = null;
        };
      }
    } else {
      img.style.backgroundImage = `url(${dataSrc})`;
      addLoadedClass(img);
    }
  };

  // Method to just load all the images right away
  this.loadImages = () => {
    this.images.forEach(image => loadImage(image));
  };

  // if no intersection observer then just load everything now and exit function
  if (!window.IntersectionObserver) {
    this.loadImages();
    return;
  }

  // Set up the Intersection Observer
  const observerConfig = {
    root: null, // defaults to window
    rootMargin: rootMargin,
    threshold: 0,
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // load the image
        loadImage(entry.target);
        // Remove element from observer
        observer.unobserve(entry.target);
      }
    }); // End for Each
  }, observerConfig);

  this.images.forEach(image => observer.observe(image));

  observer;

  const kill = () => {
    observer.disconnect();
    this.loadImages = null;
    this.images = null;
  };

  this.melt = kill;
} // End Image Chill

export default ImageChill;
