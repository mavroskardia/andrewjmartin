import { LitElement } from "lit";
import "../components/app-shell";
import "../components/intro-hero";
export declare class AjmHome extends LitElement {
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "ajm-home": AjmHome;
    }
}
