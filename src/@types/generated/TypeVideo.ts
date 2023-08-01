import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

/**
 * Fields type definition for content type 'TypeVideo'
 * @name TypeVideoFields
 * @type {TypeVideoFields}
 * @memberof TypeVideo
 */
export interface TypeVideoFields {
    /**
     * Field type definition for field 'title' (Title)
     * @name Title
     * @localized false
     */
    title: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'url' (Video URL)
     * @name Video URL
     * @localized false
     */
    url: EntryFieldTypes.Symbol;
}

/**
 * Entry skeleton type definition for content type 'video' (Video)
 * @name TypeVideoSkeleton
 * @type {TypeVideoSkeleton}
 * @author 0e5NmQEjI50YvjZsuXVNKL
 * @since 2023-07-20T22:12:54.838Z
 * @version 1
 */
export type TypeVideoSkeleton = EntrySkeletonType<TypeVideoFields, "video">;
/**
 * Entry type definition for content type 'video' (Video)
 * @name TypeVideo
 * @type {TypeVideo}
 * @author 0e5NmQEjI50YvjZsuXVNKL
 * @since 2023-07-20T22:12:54.838Z
 * @version 1
 */
export type TypeVideo<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeVideoSkeleton, Modifiers, Locales>;
