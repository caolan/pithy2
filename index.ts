export type Props<T extends keyof HTMLElementTagNameMap> =
    Partial<HTMLElementTagNameMap[T]> | {
        classList?: Array<string>,
        style?: Partial<HTMLElementTagNameMap[T]['style']>,
    };

interface TagFn<T extends keyof HTMLElementTagNameMap> {
    (): HTMLElementTagNameMap[T];
    (children: Array<string | HTMLElement>): HTMLElementTagNameMap[T];
    (props: Props<T>): HTMLElementTagNameMap[T];
    (props: Props<T>, children: Array<string | HTMLElement>): HTMLElementTagNameMap[T];
}

function tagBuilder<T extends keyof HTMLElementTagNameMap>(name: T): TagFn<T> {
    return (props?: any, children?: any) => {
        if (Array.isArray(props)) {
            children = props;
            props = {};
        }
        if (!props) {
            props = {};
        }
        if (!children) {
            children = [];
        }
        const t = document.createElement(name);
        for (const prop in props) {
            switch (prop) {
                case 'classList':
                    for (const name of props[prop] as Array<string>) {
                        t[prop].add(name);
                    }
                    break;
                case 'style':
                    for (const k in props[prop]) {
                        t.style.setProperty(k, props[prop][k]);
                    }
                    break;
                default:
                    (t as any)[prop] = props[prop];
                    break;
            }
        }
        const nodes = children.map(
            (c: string | HTMLElement) =>
                c instanceof Node ? c : document.createTextNode(c)
        );
        for (const node of nodes) {
            t.appendChild(node);
        }
        return t;
    }
}

export function makeElement<T extends keyof HTMLElementTagNameMap>(name: T): HTMLElementTagNameMap[T];
export function makeElement<T extends keyof HTMLElementTagNameMap>(name: T, children: Array<string | HTMLElement>): HTMLElementTagNameMap[T];
export function makeElement<T extends keyof HTMLElementTagNameMap>(name: T, props: Props<T>): HTMLElementTagNameMap[T];
export function makeElement<T extends keyof HTMLElementTagNameMap>(name: T, props: Props<T>, children: Array<string | HTMLElement>): HTMLElementTagNameMap[T];
export function makeElement(name: any, props?: any, children?: any): any {
    return tagBuilder(name)(props, children);
}

export const a = tagBuilder("a");
export const abbr = tagBuilder("abbr");
export const address = tagBuilder("address");
export const applet = tagBuilder("applet");
export const area = tagBuilder("area");
export const article = tagBuilder("article");
export const aside = tagBuilder("aside");
export const audio = tagBuilder("audio");
export const b = tagBuilder("b");
export const base = tagBuilder("base");
export const basefont = tagBuilder("basefont");
//export const bdi = tagBuilder("bdi");
export const bdo = tagBuilder("bdo");
export const blockquote = tagBuilder("blockquote");
export const body = tagBuilder("body");
export const br = tagBuilder("br");
export const button = tagBuilder("button");
export const canvas = tagBuilder("canvas");
export const caption = tagBuilder("caption");
export const cite = tagBuilder("cite");
export const code = tagBuilder("code");
export const col = tagBuilder("col");
export const colgroup = tagBuilder("colgroup");
export const data = tagBuilder("data");
export const datalist = tagBuilder("datalist");
export const dd = tagBuilder("dd");
export const del = tagBuilder("del");
export const details = tagBuilder("details");
export const dfn = tagBuilder("dfn");
export const dialog = tagBuilder("dialog");
export const dir = tagBuilder("dir");
export const div = tagBuilder("div");
export const dl = tagBuilder("dl");
export const dt = tagBuilder("dt");
export const em = tagBuilder("em");
export const embed = tagBuilder("embed");
export const fieldset = tagBuilder("fieldset");
export const figcaption = tagBuilder("figcaption");
export const figure = tagBuilder("figure");
export const font = tagBuilder("font");
export const footer = tagBuilder("footer");
export const form = tagBuilder("form");
export const frame = tagBuilder("frame");
export const frameset = tagBuilder("frameset");
export const h1 = tagBuilder("h1");
export const h2 = tagBuilder("h2");
export const h3 = tagBuilder("h3");
export const h4 = tagBuilder("h4");
export const h5 = tagBuilder("h5");
export const h6 = tagBuilder("h6");
export const head = tagBuilder("head");
export const header = tagBuilder("header");
export const hgroup = tagBuilder("hgroup");
export const hr = tagBuilder("hr");
export const html = tagBuilder("html");
export const i = tagBuilder("i");
export const iframe = tagBuilder("iframe");
export const img = tagBuilder("img");
export const input = tagBuilder("input");
export const ins = tagBuilder("ins");
export const kbd = tagBuilder("kbd");
export const label = tagBuilder("label");
export const legend = tagBuilder("legend");
export const li = tagBuilder("li");
export const link = tagBuilder("link");
//export const main = tagBuilder("main");
export const map = tagBuilder("map");
export const mark = tagBuilder("mark");
export const marquee = tagBuilder("marquee");
export const menu = tagBuilder("menu");
export const meta = tagBuilder("meta");
export const meter = tagBuilder("meter");
export const nav = tagBuilder("nav");
export const noscript = tagBuilder("noscript");
//export const object = tagBuilder("object");
export const ol = tagBuilder("ol");
export const optgroup = tagBuilder("optgroup");
export const option = tagBuilder("option");
export const output = tagBuilder("output");
export const p = tagBuilder("p");
export const param = tagBuilder("param");
export const picture = tagBuilder("picture");
export const pre = tagBuilder("pre");
export const progress = tagBuilder("progress");
export const q = tagBuilder("q");
//export const rp = tagBuilder("rp");
export const rt = tagBuilder("rt");
export const ruby = tagBuilder("ruby");
export const s = tagBuilder("s");
export const samp = tagBuilder("samp");
export const script = tagBuilder("script");
export const section = tagBuilder("section");
export const select = tagBuilder("select");
export const slot = tagBuilder("slot");
export const small = tagBuilder("small");
export const source = tagBuilder("source");
export const span = tagBuilder("span");
export const strong = tagBuilder("strong");
export const style = tagBuilder("style");
export const sub = tagBuilder("sub");
//export const summary = tagBuilder("summary");
export const sup = tagBuilder("sup");
export const table = tagBuilder("table");
export const tbody = tagBuilder("tbody");
export const td = tagBuilder("td");
export const template = tagBuilder("template");
export const textarea = tagBuilder("textarea");
export const tfoot = tagBuilder("tfoot");
export const th = tagBuilder("th");
export const thead = tagBuilder("thead");
export const time = tagBuilder("time");
export const title = tagBuilder("title");
export const tr = tagBuilder("tr");
export const track = tagBuilder("track");
export const u = tagBuilder("u");
export const ul = tagBuilder("ul");
//export const var = tagBuilder("var");
export const video = tagBuilder("video");
export const wbr = tagBuilder("wbr");
