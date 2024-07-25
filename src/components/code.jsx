import React from "react";
import Prism from "prismjs";

import styles from "../cdn/css/prism.module.css";

import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-shell-session";
import "prismjs/components/prism-json";

import "prismjs/plugins/autolinker/prism-autolinker";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/show-language/prism-show-language";

const copy = (e, code) => {
    navigator.clipboard.writeText(code);
    e.target.innerText = "Copied!";
    e.target.disabled = true;
    setTimeout(() => {
        e.target.innerText = "Copy";
        e.target.removeAttribute("disabled");
    }, 5_000);
}

export default class PrismCode extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }
    
    componentDidMount() {
        this.highlight();
    }
    
    componentDidUpdate() {
        this.highlight();
    }
    
    highlight = () => {
        if (this.ref && this.ref.current) {
            Prism.highlightElement(this.ref.current);
        }
    };

    render() {
        const {code, children, plugins, language} = this.props;
        return (
            <div className={styles["code-toolbar"]}>
                <div class={styles.toolbar}>
                    <button type="button" onClick={(e) => copy(e, code || children)}>
                        Copy
                    </button>
                </div>
                <pre className={`${plugins ? plugins.join(" ") : ""} show-language autolinker copy-to-clipboard`}>
                    <code ref={this.ref} className={`language-${language}`}>
                        {code ? code.trim() : children.trim()}
                    </code>
                </pre>
            </div>
        );
    }
}