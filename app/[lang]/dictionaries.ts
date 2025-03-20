import 'server-only'

const dictionaries = {
  fr: () => import('./dictionaries/fr.json').then((module) => module.default),
  ja: () => import('./dictionaries/ja.json').then((module) => module.default),
}

export const getDictionary = async (locale: 'fr' | 'ja') =>
  dictionaries[locale]()