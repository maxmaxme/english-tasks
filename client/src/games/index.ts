import atOnIn from './atOnIn';
import { pastSimple, v3 } from './irregularVerbs';

export default () => Promise.resolve([
  { ...atOnIn, id: 1 },
  { ...pastSimple, id: 2 },
  { ...v3, id: 3 },
]);
