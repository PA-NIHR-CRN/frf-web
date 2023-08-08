import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

/**
 * Fields type definition for content type 'TypeCookieBanner'
 * @name TypeCookieBannerFields
 * @type {TypeCookieBannerFields}
 * @memberof TypeCookieBanner
 */
export interface TypeCookieBannerFields {
    /**
     * Field type definition for field 'title' (Title)
     * @name Title
     * @localized false
     */
    title?: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'description' (Description)
     * @name Description
     * @localized false
     */
    description?: EntryFieldTypes.RichText;
}

/**
 * Entry skeleton type definition for content type 'cookieBanner' (Cookie Banner)
 * @name TypeCookieBannerSkeleton
 * @type {TypeCookieBannerSkeleton}
 * @author 0e5NmQEjI50YvjZsuXVNKL
 * @since 2023-07-27T22:49:25.236Z
 * @version 7
 */
export type TypeCookieBannerSkeleton = EntrySkeletonType<TypeCookieBannerFields, "cookieBanner">;
/**
 * Entry type definition for content type 'cookieBanner' (Cookie Banner)
 * @name TypeCookieBanner
 * @type {TypeCookieBanner}
 * @author 0e5NmQEjI50YvjZsuXVNKL
 * @since 2023-07-27T22:49:25.236Z
 * @version 7
 */
export type TypeCookieBanner<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeCookieBannerSkeleton, Modifiers, Locales>;
