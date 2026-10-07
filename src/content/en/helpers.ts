/** English defaults for the content helpers (the Spanish files use ../helpers directly). */
import { doc as baseDoc } from '../helpers';

export { c, cmd, evt } from '../helpers';

/** Inline citation: opens an original ArchColider document. */
export const doc = (id: string, label = 'original doc') => baseDoc(id, label);
