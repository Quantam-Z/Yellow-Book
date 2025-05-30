import {generateClasses} from '@formkit/themes'
import { applicationIcons, brandIcons, inputIcons } from "@formkit/icons"
import formKitTheme from "~/config/formKitTheme";

export default {
    icons: {
        ...inputIcons,
        ...brandIcons,
        ...applicationIcons
    },
    config: {
        classes: generateClasses(formKitTheme)
    }
}
