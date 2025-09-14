import { Buffer} from 'buffer'

(window as any).global = window;
(window as any).Buffer = Buffer;
(window as any).process = require("process/browser")

export class Pollyfills {
}
