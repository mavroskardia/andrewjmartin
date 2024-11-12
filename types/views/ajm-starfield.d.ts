import { LitElement } from "lit";
declare class Star {
    x: number;
    y: number;
    z: number;
    c: number;
    constructor(x: number, y: number, z: number);
    update(dt: number, ctx: CanvasRenderingContext2D | null): void;
}
declare class Starfield {
    static TotalStars: number;
    ctx: CanvasRenderingContext2D | null;
    stars: Array<Star>;
    width: number;
    height: number;
    prevTime: number;
    init(canvasElement: HTMLCanvasElement): void;
    update(dt: number): void;
}
export declare class AjmStarfield extends LitElement {
    _starfieldElement: HTMLCanvasElement;
    starfield: Starfield;
    firstUpdated(): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "ajm-starfield": AjmStarfield;
    }
}
export {};
