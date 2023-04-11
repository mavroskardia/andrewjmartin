import { s as l, x as s, i as p, e as m } from "./query-assigned-elements-94c95e81.js";
import "./app-shell-b8870c3f.js";
var d = Object.defineProperty, f = Object.getOwnPropertyDescriptor, y = (h, i, n, a) => {
  for (var e = a > 1 ? void 0 : a ? f(i, n) : i, r = h.length - 1, t; r >= 0; r--)
    (t = h[r]) && (e = (a ? t(i, n, e) : t(e)) || e);
  return a && e && d(i, n, e), e;
};
let o = class extends l {
  render() {
    return s`
      <app-shell>
        <header slot="header">
          <h1>About Andy</h1>
        </header>
        <ol slot="content">
          <li>
            <h2>Who??</h2>
            <p>
              Having a really common name has made it really easy to hide in plain sight, especially
              when there are so many other far more amazing
              <a href="https://en.wikipedia.org/wiki/Andy_Martin_(disambiguation)">Andy Martins</a>
              out there.
            </p>
            <p>
              After being born and raised in Wisconsin, which does funny things to speech patterns
              and accents, I moved to Gainesville, Florida. I live here with my incredible wife and kids.
            </p>
            <p>
              I am a lifelong computer enthusiast. I have fond memories of our family's first computer:
              a Packard Bell 386SX running MS-DOS 5.0 on a 10MB HDD with 4MB of memory. Even before that,
              having encounters with my neighbor's Commodore 64 and then my friend's Apple IIc, I knew
              from an early age what I wanted to be when I grew up.
            </p>
          </li>
          <li>
            <h2>What</h2>
            <p>

            </p>
          </li>
          <li>
            <h2>Where</h2>
          </li>
          <li>
            <h2>When</h2>
          </li>
          <li>
            <h2>Why</h2>
          </li>
        </ol>
      </app-shell>
    `;
  }
};
o.styles = p`
    ol {
      list-style: upper-roman;
      max-width: 40vw;
    }
  `;
o = y([
  m("ajm-about")
], o);
export {
  o as AjmAbout
};
