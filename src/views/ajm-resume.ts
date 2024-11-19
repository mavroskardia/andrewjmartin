import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("ajm-resume")
export class AjmResume extends LitElement {

  static styles = css`

    * {
      font-synthesis: none;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      -webkit-text-size-adjust: 100%;

      padding: 0; margin: 0;
      font-family: Inter, sans-serif;
      font-weight: 300;
      line-height: 1;
      color: #333;
      background-color: none;

      --accent-color-hue: 160;
      --accent-color-saturation: 100%;
      --accent-color-luminance: 25%;
      --accent-color: hsl(
        var(--accent-color-hue)
        var(--accent-color-saturation)
        var(--accent-color-luminance)
      );

      --main-bg: hsl(0 100% 100%);

      --aside-bg-h: 160;
      --aside-bg-s: 100%;
      --aside-bg-l: 15%;
      --aside-bg: hsl(
        var(--aside-bg-h)
        var(--aside-bg-s)
        var(--aside-bg-l)
      );

      --minor-text: hsl(0, 0% 50%);
    }

    #resume {
      position: absolute;
      top: 0; left: 0;
      width: 100vw; height: 100vh;
      overflow: hidden;
      display: flex;
      flex-direction: row-reverse;
      background-color: #fff;
    }

    aside {
      box-shadow: rgb(0 0 0 / 27%) -20px 0px 20px 0px inset;
      float: left;
      background: linear-gradient(
        to left,
        hsl(
          calc(var(--aside-bg-h))
          var(--aside-bg-s)
          calc(var(--aside-bg-l))
        ),
        hsl(
          calc(var(--aside-bg-h))
          var(--aside-bg-s)
          calc(var(--aside-bg-l) * 0.5)
        )
      );
      height: 100vh;
      width: 55vw;
      padding: 5rem 1rem;
    }

    aside section {
      margin: 1rem 0;
    }

    aside section h3 {
      color: hsl(
        calc(var(--aside-bg-h))
        calc(var(--aside-bg-s))
        calc(var(--aside-bg-l) * 2)
      );
      font-size: 1.25rem;
      padding: 1rem 0;
      border-radius: 50px;
      text-shadow: 0 1px 3px rgba(0,0,0,0.5);
    }

    aside section dl {
      display: grid;
      grid-template-columns: 1fr 10fr;
      margin-top: 0.5rem;
    }

    aside section dt,
    aside section dd {
      padding: 0.25rem;
      color: #ddd;
    }

    #publications dd,
    #publications dt,
    #publications iconify-icon {
      line-height: 1;
    }

    #publications dd { margin-bottom: 0.5rem; }

    aside iconify-icon { color: #aaa; }

    aside a {
      text-decoration: none;
      padding: 0.5rem 0;
      color: #ddd;
      line-height: 1.2;
    }

    a { text-decoration: none; color: var(--accent-color); }
    a:hover, a:focus {
      text-decoration: underline;
    }

    #main {
      padding: 1rem;
      overflow-y: auto;
    }

    #name {
      margin: 1rem 0 2rem;
    }

    #name h1 {
      padding: 1.5rem 0 0 0; margin: 0;
      font-size: 2.5rem;
      color: var(--accent-color);
    }

    #name h3 {
      padding: 0; margin: 0;
      font-weight: 200;
      font-size: 0.8rem;
      color: var(--minor-text);
    }

    #main section {
      margin: 2rem 0;
    }

    #main section h3,
    #main section iconify-icon {
      color: var(--accent-color);
      font-size: 1.25rem;
      font-weight: 400;
    }

    #main section h3 {
      border-bottom: solid 1px var(--accent-color);
      margin-bottom: 0.5rem;
    }

    #main section p {
      line-height: 1.25;
      margin: 0.5rem 2rem 0.5rem 1rem;
    }

    #main section header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    #main section header h4,
    #main section article h4 {
      padding: 0; margin: 0;
      font-weight: 400;
      font-size: 1rem;
    }

    #main section header small {
      font-size: 0.75rem;
      color: var(--minor-text);
    }

    #main section header small p {
      padding: 0; margin: 0;
    }

    #main section article {
      margin: 1rem 0;
    }

    #education ul {
      list-style: none;
      margin-top: 0.5rem;
    }

    #education li {
      padding: 0.25rem 1rem;
    }

    @media (max-width: 768px) {
      #resume {
        display: flex;
        flex-wrap: wrap;
        overflow: visible;
      }

      div {
        overflow: visible;
        height: auto;
      }

      aside {
        float: none;
        max-width: 100vw;
      }
    }

    @media print {
      aside {
        max-width: 100vw;
        width: 55rem;
      }
    }

  `;

  render() {
    return html`
      <div id="resume">
        <div id="main">
          <header id="name">
            <h1>Andrew Martin</h1>
            <h3>Remote | Gainesville, Florida, United States</h3>
          </header>
          <section id="summary">
            <h3>
              Summary
            </h3>
            <p>
              I create the environments that identify, develop, and sustain
              teams that create some of the world's most amazing
              software.
            </p>
            <p>
              I've spent my career contemplating everything from operating
              system design to fully modeled virtual worlds to essential
              questions about data, but it always comes back to one fundamental
              thing: are we building software experiences that make our users'
              lives better? To me, that is the reward behind everything I do.
            </p>
         </section>
          <section id="experience">
            <h3>
              Experience
            </h3>
            <article>
              <header>
                <h4>Chief Technology Officer</h4>
                <small>
                  <p><a href="https://www.infotechinc.com">Infotech</a> | July 2022 - Present</p>
                </small>
              </header>
              <p>
                As CTO, I am Infotech's technical thought leader for both our
                proprietary products division and AASHTOWare Project, the
                enterprise solution for state transportation agencies. I
                communicate the history, current state, and future state of all
                products. I support our product experts to make strategic
                decisions for integrations based on our goals and technical
                feasibility. I evangelize our advancement of the technology and
                integrations of our current solutions so we can scale and meet
                our key business objectives.
              </p>
              <p>
                I also create prototypes and proofs-of-concept to demonstrate
                new ideas, which allows me to maintain my craft in a real way.
                I then present upon and write about these new ideas, and
                shephard them through the early phases before helping our
                teams turn them into products.
              </p>
            </article>
            <article>
              <header>
                <h4>Vice President Of Products</h4>
                <small>November 2016 - January 2023</small>
              </header>
              <p>
                I led Infotech's proprietary software products division.
                To do so, it was essential to create an environment where each
                and every member of the division felt motivated and engaged,
                where they knew and believed in their role in achieving our
                shared goals, and had room to perfect their crafts.
              </p>
              <p>
                This extended beyond the product division. Developing and
                growing partnerships with those who rely on the successful
                execution of our strategy meant the difference between success
                and fading into obscurity.
              </p>
              <p>
                Technical excellence is table stakes for me, but requires
                constant vigilance to stay on top of tech trends and responsibly
                respond with sound architecture and application design.
              </p>
            </article>
            <article>
              <header>
                <h4>
                  Progressive Roles in Software Engineering: Senior Lead
                  Software Developer, Application Architect, Systems Analyst
                </h4>
                <small>March 2007 - November 2016</small>
              </header>
              <p>
                Provided architectural design, UX analysis, and interface
                design for large-scale construction management systems. Led
                successful development of greenfield projects with high risk
                that have now created millions of dollars in revenue. Guided
                development teams in consistent and efficient use of frameworks
                and provided development direction as needed.
              </p>
              <p>
                Led UI analysis and design, focused on user interaction and
                accessibility. Provided support for training, hiring, and other
                supervisory tasks.
              </p>
              <p>
                Consistently high engineering output both for new features and
                eradicating technical debt.
              </p>
              <p>
                Focus on UI design and accessibility.
              </p>
            </article>
          </section>
          <section id="education">
            <h3>
              Education
            </h3>
            <article>
              <header>
                <h4>University of Wisconsin - Madison</h4>
                <small>September 1999 - December 2003</small>
              </header>
              <ul>
                <li>B.S., Computer Science</li>
                <li>Minor, Classical Humanities</li>
              </ul>
            </article>
          </section>
        </div>
        <aside>
          <section>
            <h3>Contact</h3>
            <dl>
              <dt><iconify-icon icon="mdi-light:email"></iconify-icon></dt>
              <dd>
                <a href="mailto:andrewjmartin@gmail.com">
                  andrewjmartin@gmail.com
                </a>
              </dd>
              <dt><iconify-icon icon="ant-design:linkedin-outlined"></iconify-icon></dt>
              <dd>
                <a href="https://www.linkedin.com/in/-andy-martin/">-andy-martin</a>
              </dd>
              <dt>
                <iconify-icon icon="mdi:github"></iconify-icon>
              </dt>
              <dd>
                <a href="https://github.com/mavroskardia/">GitHub</a>
              </dd>
            </dl>
          </section>
          <section>
            <h3>Core Skills</h3>
            <dl>
              <dt><iconify-icon icon="fluent:developer-board-16-regular"></iconify-icon></dt>
              <dd>Software Engineering</dd>
              <dt><iconify-icon icon="clarity:design-line"></iconify-icon></dt>
              <dd>Systems Design</dd>
              <dt><iconify-icon icon="pepicons-pencil:people"></iconify-icon></dt>
              <dd>Leadership</dd>
              <dt><iconify-icon icon="system-uicons:speech-typing"></iconify-icon></dt>
              <dd>Communication</dd>
              <dt><iconify-icon icon="fluent:organization-20-regular"></iconify-icon></dt>
              <dd>Organization</dd>
            </dl>
          </section>
          <section>
            <h3>Publications</h3>
            <dl id="publications">
              <dt><iconify-icon icon="material-symbols-light:article-outline"></iconify-icon></dt>
              <dd>
                <a href="https://www.infotechinc.com/blog/the-structure-of-bim-understanding-the-importance-of-ifc-standards/">
                    The Structure of BIM: Understanding the Importance of IFC
                    Standards
                </a>
              </dd>
              <dt><iconify-icon icon="material-symbols-light:article-outline"></iconify-icon></dt>
              <dd>
                <a href="https://www.infotechinc.com/blog/bim-how-ifc-impacts-bidding/">
                  The Structure of BIM: How IFC Impacts Bidding
                </a>
              </dd>
              <dt><iconify-icon icon="material-symbols-light:article-outline"></iconify-icon></dt>
              <dd>
                <a href="https://www.infotechinc.com/blog/taking-steps-toward-model-as-the-legal-document-mald-through-data-standards/">
                  Taking Steps Toward Model as the Legal Document Through Data
                  Standards
                </a>
              </dd>
            </dl>
          </section>
        </aside>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ajm-resume": AjmResume;
  }
}
