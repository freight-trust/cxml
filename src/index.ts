import * as fs from 'fs';

import { TokenSet } from './tokenizer/TokenSet';
import { Token } from './tokenizer/Token';
import { Namespace } from './Namespace';

import { ElementSpec } from './schema/ElementSpec';
import { Parser, ParserConfig, RawNamespace } from './parser/Parser';
import { Writer } from './writer/Writer';

const tokenSet = new TokenSet();
const ns = new Namespace(tokenSet, 'xml', 'http://www.w3.org/XML/1998/namespace');

ns.addElementTokens([ tokenSet.add('xml') ]);

const config = new ParserConfig();
config.addNamespace(new RawNamespace(ns.encode()));

const xml = new Parser(config, tokenSet);

fs.createReadStream(process.argv[2]).pipe(xml).pipe(new Writer()).pipe(process.stdout);
