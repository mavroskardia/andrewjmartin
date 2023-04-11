import { LitElement } from "lit";
import "../components/intro-hero";
import "../components/app-nav";
import "../components/app-footer";
export declare class AjmHome extends LitElement {
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        "ajm-home": AjmHome;
    }
}
