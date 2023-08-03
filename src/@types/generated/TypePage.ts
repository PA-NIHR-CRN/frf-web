import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

import type { TypePromoBlockSkeleton } from "./TypePromoBlock";

/**
 * Fields type definition for content type 'TypePage'
 * @name TypePageFields
 * @type {TypePageFields}
 * @memberof TypePage
 */
export interface TypePageFields {
    /**
     * Field type definition for field 'title' (Title)
     * @name Title
     * @localized false
     */
    title: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'slug' (Slug)
     * @name Slug
     * @localized false
     */
    slug: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'content' (Content)
     * @name Content
     * @localized false
     */
    content: EntryFieldTypes.RichText;
    /**
     * Field type definition for field 'sidebar' (Sidebar)
     * @name Sidebar
     * @localized false
     */
    sidebar?: EntryFieldTypes.EntryLink<TypePromoBlockSkeleton>;
}

/**
 * Entry skeleton type definition for content type 'page' (Page)
 * @name TypePageSkeleton
 * @type {TypePageSkeleton}
 * @author 0e5NmQEjI50YvjZsuXVNKL
 * @since 2023-07-19T19:16:36.460Z
 * @version 19
 */
export type TypePageSkeleton = EntrySkeletonType<TypePageFields, "page">;
/**
 * Entry type definition for content type 'page' (Page)
 * @name TypePage
 * @type {TypePage}
 * @author 0e5NmQEjI50YvjZsuXVNKL
 * @since 2023-07-19T19:16:36.460Z
 * @version 19
 */
export type TypePage<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypePageSkeleton, Modifiers, Locales>;
