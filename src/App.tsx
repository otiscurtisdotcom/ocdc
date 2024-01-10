import React, { useEffect, useRef, useState } from 'react';
import './App.scss';
import { useWindowSize } from './window_resize';

const strings = [
  "Hello, I'm Jack.",
  "Projects:"
];

const links = [
  {
    url: "https://www.bystandersfilm.com/",
    label: "The Bystanders"
  },
  {
    url: "https://otiscurtisdotcom.github.io/strollin/",
    label: "Strollin"
  },
  {
    url: "https://otiscurtisdotcom.github.io/jazzmachine/",
    label: "Jazz Machine"
  },
  {
    url: "https://otiscurtisdotcom.github.io/o-right",
    label: "O-Right"
  },
  {
    url: "https://otiscurtisdotcom.github.io/rapmachine/",
    label: "Rap Machine"
  },
  {
    url: "https://otiscurtisdotcom.github.io/vidz/",
    label: "Vidz"
  },
  {
    url: "https://otiscurtisdotcom.github.io/eresoneforya/",
    label: "'Ere's one for ya"
  },
  {
    url: "https://otiscurtisdotcom.github.io/storymaker/",
    label: "Storymaker"
  },
];

const App = () => {
  const [fontSize, setFontSize] = useState(0);
  const ref = useRef(null as null | HTMLDivElement);
  const {width, height} = useWindowSize();

  useEffect(() => {
    if (ref.current) {
      setFontSize(ref.current.clientHeight / (links.length + strings.length));
    }
  }, [width, height]);

  const text = () => {
    return  <>
              {strings.map((string, i) =>
                <p
                  key={`string-${i}`}
                  style={{fontSize: `${fontSize}px`, lineHeight: `${fontSize}px`}}
                >
                  {[...string].map((char, j) =>
                    <span key={`stringspan-${i}-${j}`}>
                      {char}
                    </span>
                  )}
                </p>
              )}

              {links.map((link, i) =>
                <a
                  target={'_blank'}
                  href={link.url}
                  key={`link-${i}`}
                  style={{fontSize: `${fontSize * 0.618}px`, lineHeight: `${fontSize}px`}}
                >
                  {[...link.label].map((char, j) =>
                  <span key={`linkspan-${i}-${j}`}>
                    {char}
                  </span>
                )}
                </a>
              )}
            </>
  };

  return (
    <div className='wrapper' ref={ref}>
      {fontSize && text()}
    </div>
  );
}

export default App;
