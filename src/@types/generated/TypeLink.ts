import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

/**
 * Fields type definition for content type 'TypeLink'
 * @name TypeLinkFields
 * @type {TypeLinkFields}
 * @memberof TypeLink
 */
export interface TypeLinkFields {
    /**
     * Field type definition for field 'text' (Display Text)
     * @name Display Text
     * @localized false
     */
    text: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'url' (URL)
     * @name URL
     * @localized false
     */
    url: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'external' (External)
     * @name External
     * @localized false
     * @summary Is the link directing to an external site, if checked the link will be opened in a new browser window/tab and ‘(opens in a new tab)’ will be appended to the display text.
     */
    external: EntryFieldTypes.Boolean;
}

/**
 * Entry skeleton type definition for content type 'link' (Link)
 * @name TypeLinkSkeleton
 * @type {TypeLinkSkeleton}
 * @author 550yZmTaVUKm21LABzqCb5
 * @since 2023-11-21T13:57:42.468Z
 * @version 11
 */
export type TypeLinkSkeleton = EntrySkeletonType<TypeLinkFields, "link">;
/**
 * Entry type definition for content type 'link' (Link)
 * @name TypeLink
 * @type {TypeLink}
 * @author 550yZmTaVUKm21LABzqCb5
 * @since 2023-11-21T13:57:42.468Z
 * @version 11
 */
export type TypeLink<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeLinkSkeleton, Modifiers, Locales>;
