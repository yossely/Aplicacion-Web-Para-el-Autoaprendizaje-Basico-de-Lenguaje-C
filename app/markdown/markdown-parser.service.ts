import { Injectable } from '@angular/core';

import * as marked from 'marked';
import 'prismjs/prism';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-javascript';

@Injectable()
export class MarkdownParserService{
    
    private md: MarkedStatic;

    constructor() {
        this.md = marked;

        this.md.setOptions({
            gfm: true,
            breaks: true,
            highlight: function (code) {
                return Prism.highlight(code, Prism.languages['c']);
                // return 's';
            }
        });
    }

    convert(markdown: string){
        return this.md.parse(markdown);
    }
}