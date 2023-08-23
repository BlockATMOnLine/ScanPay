
import { createI18n } from 'vue-i18n'
import enUS from './en-US.json'
import zhHK from './zh-HK.json'
import { getParams } from "@/utils/utils"

const messages = {
    'zh-HK': zhHK,
    'en-US': enUS
}

const defaultLocal = getDefaultLang()
const i18n = setupI18n(defaultLocal)
export default i18n

function getDefaultLang () {
    const browserLang = (navigator.language || navigator.browserLanguage)
    const language = getParams('lang') || browserLang
    const languageList = Object.keys(messages)
    return languageList.includes(language) ? language : 'zh-HK';
}

export function setupI18n(locale) {
    const i18n = createI18n({
        legacy: false,
        messages: messages,
        fallbackLocale: defaultLocal,
        locale
    })
    setI18nLanguage(i18n, locale)
    return i18n
}

export function setI18nLanguage(i18n, locale) {
    if (i18n.mode === 'legacy') {
        i18n.global.locale = locale
    } else {
        i18n.global.locale.value = locale
    }
    /**
     * NOTE:
     * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
     * The following is an example for axios.
     *
     * axios.defaults.headers.common['Accept-Language'] = locale
     */
    document.querySelector('html').setAttribute('lang', locale)
}
