import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

/**
 * Fields type definition for content type 'TypeEmailContact'
 * @name TypeEmailContactFields
 * @type {TypeEmailContactFields}
 * @memberof TypeEmailContact
 */
export interface TypeEmailContactFields {
    /**
     * Field type definition for field 'name' (Name)
     * @name Name
     * @localized false
     */
    name: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'emailAddress' (Email Address)
     * @name Email Address
     * @localized false
     */
    emailAddress: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'salutation' (Salutation)
     * @name Salutation
     * @localized false
     */
    salutation: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'type' (Type)
     * @name Type
     * @localized false
     */
    type: EntryFieldTypes.Symbol<"BDM" | "FRF" | "LCRN - DA">;
}

/**
 * Entry skeleton type definition for content type 'emailContact' (Email Contact)
 * @name TypeEmailContactSkeleton
 * @type {TypeEmailContactSkeleton}
 * @author 0e5NmQEjI50YvjZsuXVNKL
 * @since 2023-07-11T16:34:42.182Z
 * @version 7
 */
export type TypeEmailContactSkeleton = EntrySkeletonType<TypeEmailContactFields, "emailContact">;
/**
 * Entry type definition for content type 'emailContact' (Email Contact)
 * @name TypeEmailContact
 * @type {TypeEmailContact}
 * @author 0e5NmQEjI50YvjZsuXVNKL
 * @since 2023-07-11T16:34:42.182Z
 * @version 7
 */
export type TypeEmailContact<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeEmailContactSkeleton, Modifiers, Locales>;
