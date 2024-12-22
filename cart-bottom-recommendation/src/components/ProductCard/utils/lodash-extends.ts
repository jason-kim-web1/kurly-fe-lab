import { eq, isEmpty, isFunction, isNull, negate } from 'lodash';

export const isNotEmpty = negate(isEmpty);
export const ne = negate(eq);
export const isNotNull = negate(isNull);
export const isNotFunction = negate(isFunction);
