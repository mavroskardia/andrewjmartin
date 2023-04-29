import { css, html, LitElement } from "lit";
import { customElement, query } from "lit/decorators.js";
import { animationStyles, baseStyles } from "../styles/base";

class Star {
  x: number = 0;
  y: number = 0;
  z: number = 0;
  c: number = Math.random() * 255;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  update(dt: number, ctx: CanvasRenderingContext2D | null) {
    if (!ctx) return;

    this.z -= dt;
    if (this.z <= 1) {
      this.z += 1000;
    }

    const cx = ctx.canvas.width / 2;
    const cy = ctx.canvas.height / 2;

    const x = cx + this.x / (this.z * 0.001);
    const y = cy + this.y / (this.z * 0.001);

    if (x < 0 || x >= ctx.canvas.width || y < 0 || y > ctx.canvas.height) {
      // skip off screen stars (should rarely happen since we're resetting the z above)
      return;
    }

    const di = this.z / 1000.0;
    const i = 1 - di * di;
    const size = Math.abs(1 - di) * 3;
    ctx.fillStyle = `hsla(${this.c}, 90%, 85%, ${i})`;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fill();
    // ctx.fillRect(x, y, size, size);
  }
}

class Starfield {
  static TotalStars: number = 10000;
  ctx: CanvasRenderingContext2D | null = null;
  stars: Array<Star> = [];
  width: number = 800;
  height: number = 600;
  prevTime: number = 0;

  init(canvasElement: HTMLCanvasElement) {
    this.ctx = canvasElement.getContext("2d");
    this.width = canvasElement.width;
    this.height = canvasElement.height;

    for (let i = 0; i < Starfield.TotalStars; i++) {
      const s = new Star(
        Math.random() * 1600 - 800,
        Math.random() * 1200 - 600,
        Math.random() * 1000
      );
      this.stars.push(s);
    }
  }

  update(dt: number) {
    if (!this.ctx) return;

    const elapsed = dt - this.prevTime;
    this.prevTime = dt;

    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.stars.forEach((s) => s.update(elapsed * 0.1, this.ctx));

    requestAnimationFrame((t) => this.update(t));
  }
}

@customElement("ajm-starfield")
export class AjmStarfield extends LitElement {
  @query("#starfield")
  _starfieldElement!: HTMLCanvasElement;

  starfield = new Starfield();

  firstUpdated(): void {
    if (!this._starfieldElement) {
      console.error("no starfield element");
      return;
    }

    this.starfield.init(this._starfieldElement);

    requestAnimationFrame((tick) => this.starfield.update(tick));
  }

  render() {
    return html`
      <app-shell>
        <section slot="content">
          <canvas id="starfield" width="800" height="600"></canvas>
          <p>
            I have probably made a variation of this starfield at least a dozen
            times for different games or tech demos. It holds a special place
            for me since it evokes 90s era screensavers.
          </p>
        </section>
      </app-shell>
    `;
  }

  static styles = [
    baseStyles,
    animationStyles,
    css`
      section[slot="content"] {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      #starfield {
        box-shadow: 0 0 10px 10px black;
        margin-bottom: 2rem;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "ajm-starfield": AjmStarfield;
  }
}
