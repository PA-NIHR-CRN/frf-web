import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

/**
 * Fields type definition for content type 'TypeServiceUnavailable'
 * @name TypeServiceUnavailableFields
 * @type {TypeServiceUnavailableFields}
 * @memberof TypeServiceUnavailable
 */
export interface TypeServiceUnavailableFields {
    /**
     * Field type definition for field 'title' (Title)
     * @name Title
     * @localized false
     */
    title?: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'content' (Content)
     * @name Content
     * @localized false
     */
    content?: EntryFieldTypes.RichText;
}

/**
 * Entry skeleton type definition for content type 'serviceUnavailable' (Service Unavailable)
 * @name TypeServiceUnavailableSkeleton
 * @type {TypeServiceUnavailableSkeleton}
 * @author 0e5NmQEjI50YvjZsuXVNKL
 * @since 2024-03-11T08:05:36.910Z
 * @version 1
 */
export type TypeServiceUnavailableSkeleton = EntrySkeletonType<TypeServiceUnavailableFields, "serviceUnavailable">;
/**
 * Entry type definition for content type 'serviceUnavailable' (Service Unavailable)
 * @name TypeServiceUnavailable
 * @type {TypeServiceUnavailable}
 * @author 0e5NmQEjI50YvjZsuXVNKL
 * @since 2024-03-11T08:05:36.910Z
 * @version 1
 */
export type TypeServiceUnavailable<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeServiceUnavailableSkeleton, Modifiers, Locales>;
