import "./style.less"

import { library, dom } from "@fortawesome/fontawesome-svg-core"
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons"

library.add(faCameraRetro)

export function init() {
  dom.i2svg()
}
