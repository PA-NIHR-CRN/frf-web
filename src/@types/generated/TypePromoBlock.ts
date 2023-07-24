import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

/**
 * Fields type definition for content type 'TypePromoBlock'
 * @name TypePromoBlockFields
 * @type {TypePromoBlockFields}
 * @memberof TypePromoBlock
 */
export interface TypePromoBlockFields {
    /**
     * Field type definition for field 'title' (Title)
     * @name Title
     * @localized false
     */
    title: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'buttonText' (Button Text)
     * @name Button Text
     * @localized false
     */
    buttonText?: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'url' (URL)
     * @name URL
     * @localized false
     */
    url?: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'description' (Description)
     * @name Description
     * @localized false
     */
    description?: EntryFieldTypes.RichText;
}

/**
 * Entry skeleton type definition for content type 'promoBlock' (Block: Promo)
 * @name TypePromoBlockSkeleton
 * @type {TypePromoBlockSkeleton}
 * @author 0e5NmQEjI50YvjZsuXVNKL
 * @since 2023-07-20T21:04:27.423Z
 * @version 11
 */
export type TypePromoBlockSkeleton = EntrySkeletonType<TypePromoBlockFields, "promoBlock">;
/**
 * Entry type definition for content type 'promoBlock' (Block: Promo)
 * @name TypePromoBlock
 * @type {TypePromoBlock}
 * @author 0e5NmQEjI50YvjZsuXVNKL
 * @since 2023-07-20T21:04:27.423Z
 * @version 11
 */
export type TypePromoBlock<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypePromoBlockSkeleton, Modifiers, Locales>;
