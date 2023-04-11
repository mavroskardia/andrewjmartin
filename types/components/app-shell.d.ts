import { LitElement } from "lit";
import "./app-nav";
export declare class AppShell extends LitElement {
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "app-shell": AppShell;
    }
}
