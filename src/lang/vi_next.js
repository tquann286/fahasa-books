import { replaceDoubleCurly } from '@/utils/translation'
import vi from './vi.json'

const viNext = { ...vi }
replaceDoubleCurly(viNext)
export default viNext
