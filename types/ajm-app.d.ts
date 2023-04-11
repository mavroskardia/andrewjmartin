import { LitElement } from "lit";
import './intro-hero';
import './app-nav';
import './app-footer';
export declare class AjmApp extends LitElement {
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        "ajm-app": AjmApp;
    }
}
