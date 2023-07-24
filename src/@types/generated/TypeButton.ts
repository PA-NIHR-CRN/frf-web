import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

/**
 * Fields type definition for content type 'TypeButton'
 * @name TypeButtonFields
 * @type {TypeButtonFields}
 * @memberof TypeButton
 */
export interface TypeButtonFields {
    /**
     * Field type definition for field 'text' (Text)
     * @name Text
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
     * Field type definition for field 'type' (Type)
     * @name Type
     * @localized false
     */
    type?: EntryFieldTypes.Symbol<"Primary" | "Secondary">;
    /**
     * Field type definition for field 'external' (External)
     * @name External
     * @localized false
     */
    external?: EntryFieldTypes.Boolean;
}

/**
 * Entry skeleton type definition for content type 'button' (Button)
 * @name TypeButtonSkeleton
 * @type {TypeButtonSkeleton}
 * @author 0e5NmQEjI50YvjZsuXVNKL
 * @since 2023-07-19T19:25:50.328Z
 * @version 11
 */
export type TypeButtonSkeleton = EntrySkeletonType<TypeButtonFields, "button">;
/**
 * Entry type definition for content type 'button' (Button)
 * @name TypeButton
 * @type {TypeButton}
 * @author 0e5NmQEjI50YvjZsuXVNKL
 * @since 2023-07-19T19:25:50.328Z
 * @version 11
 */
export type TypeButton<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeButtonSkeleton, Modifiers, Locales>;
