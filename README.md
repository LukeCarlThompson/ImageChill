# ImageChill.js ⛄️

### A 1.2kb smart but lazy loader for responsive images

ImageChill works by detecting when your images are near the screen and then loading the high quality file in the background. When that image has been loaded and cached by the browser it swaps the src, src-set or inline background image attribute.
This way the swap is instant and jank free. The user never sees an image loading so you can just chill and not worry about a thing man.

#### Basic usage
```javascript
const iceCold = new ImageChill();
```

#### Default options

```javascript
const iceCold = new ImageChill({
  selector = ".lazyload",
  loadedClass = "loaded",
  src = "data-src",
  srcSet = "data-src-set",
  sizes = "data-sizes",
  rootMargin = "0px",
});
```

#### Img tag
Recomend setting height and width inline or in CSS to avoid size changing when larger image is added in.

```html
<img class="image lazyload" data-src="./img/high-res.jpg" src="./img/low-res.jpg">
```

#### Img srcset
Use data-src-set and data-sizes the same way you would normally use srcset and sizes attributes. The data-sizes attribute is important to ensure the correct size image gets pre-loaded.

Here data-src is just used as a backup in case srcset is unsupported.

```html
<img class="image lazyload"
    data-src-set="./img/high-res.jpg 1000w,
    ./img/500px.jpg 500w,
    ./img/low-res.jpg 100w"
    data-sizes="100vw"
    data-src="./img/high-res.jpg"
    src="./img/low-res.jpg"
    >
```

#### Background image

```html
<div class="image--bg lazyload" data-src="./img/high-res.jpg" style="background-image: url('./img/low-res.jpg')"></div>
```

#### Blur up/in effect CSS
```css
.lazyload {
  filter: blur(5px);
  transition: filter 0.5s linear;
}
.lazyload.loaded {
  filter: blur(0);
}
```

## Methods
In our above example
```javascript
const iceCold = new ImageChill({
  selector = ".lazyload",
  loadedClass = "loaded",
  src = "data-src",
  srcSet = "data-src-set",
  sizes = "data-sizes",
  rootMargin = "0px",
});
```

This just loads all the images whether they are in the viewport or not
```javascript
iceCold.loadImages();
```

This removes intersection observer and removes images elements from memory
```javascript
iceCold.melt();
```
Why not go all the way 🥶💙
```javascript
iceCold = null;
```


## Dev setup
It uses gulp, scss, browserSync, Rollup and buble.

### Folder structure

**\_src/** - is where you work  
**dev/** - is where the browserSync server runs from  
**dist/** - contains the processed js files

### Get started

1. `npm install` - install dependencies
2. `npm run dev` - spins up the dev server
3. `npm run build` - transpiles and builds final js files in dist/ folder