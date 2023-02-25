import { replaceDoubleCurly } from '@/utils/translation'
import en from './en.json'

const enNext = { ...en }
replaceDoubleCurly(enNext)
export default enNext
