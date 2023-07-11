import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

/**
 * Fields type definition for content type 'TypeLcrnsAndDevolvedAdministrations'
 * @name TypeLcrnsAndDevolvedAdministrationsFields
 * @type {TypeLcrnsAndDevolvedAdministrationsFields}
 * @memberof TypeLcrnsAndDevolvedAdministrations
 */
export interface TypeLcrnsAndDevolvedAdministrationsFields {
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
    type: EntryFieldTypes.Symbol<"BDM" | "FRF" | "LCRN">;
}

/**
 * Entry skeleton type definition for content type 'lcrnsAndDevolvedAdministrations' (Email Contact)
 * @name TypeLcrnsAndDevolvedAdministrationsSkeleton
 * @type {TypeLcrnsAndDevolvedAdministrationsSkeleton}
 * @author 2MXTjjyvpmOzLPW2qSiIPI
 * @since 2023-07-02T10:08:29.344Z
 * @version 25
 */
export type TypeLcrnsAndDevolvedAdministrationsSkeleton = EntrySkeletonType<TypeLcrnsAndDevolvedAdministrationsFields, "lcrnsAndDevolvedAdministrations">;
/**
 * Entry type definition for content type 'lcrnsAndDevolvedAdministrations' (Email Contact)
 * @name TypeLcrnsAndDevolvedAdministrations
 * @type {TypeLcrnsAndDevolvedAdministrations}
 * @author 2MXTjjyvpmOzLPW2qSiIPI
 * @since 2023-07-02T10:08:29.344Z
 * @version 25
 */
export type TypeLcrnsAndDevolvedAdministrations<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeLcrnsAndDevolvedAdministrationsSkeleton, Modifiers, Locales>;
