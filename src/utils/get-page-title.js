import defaultSettings from '@/settings'

const title = defaultSettings.title || '4arts'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
