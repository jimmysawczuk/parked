import "./style.less"

import { library, dom } from "@fortawesome/fontawesome-svg-core"
import { faCameraRetro } from "@fortawesome/pro-duotone-svg-icons"

library.add(faCameraRetro)

export function init() {
  dom.i2svg()
}
