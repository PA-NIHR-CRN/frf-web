import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

/**
 * Fields type definition for content type 'TypeHomepage'
 * @name TypeHomepageFields
 * @type {TypeHomepageFields}
 * @memberof TypeHomepage
 */
export interface TypeHomepageFields {
    /**
     * Field type definition for field 'title' (Title)
     * @name Title
     * @localized false
     */
    title: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'description' (Description)
     * @name Description
     * @localized false
     */
    description: EntryFieldTypes.Text;
    /**
     * Field type definition for field 'videoUrl' (Video URL)
     * @name Video URL
     * @localized false
     */
    videoUrl?: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'serviceDescriptionFind' (Service Description: Find)
     * @name Service Description: Find
     * @localized false
     */
    serviceDescriptionFind: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'serviceDescriptionRecruit' (Service Description: Recruit)
     * @name Service Description: Recruit
     * @localized false
     */
    serviceDescriptionRecruit: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'serviceDescriptionFollowUp' (Service Description: Follow-up)
     * @name Service Description: Follow-up
     * @localized false
     */
    serviceDescriptionFollowUp: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'signPostDescription1' (Sign-Post Description #1)
     * @name Sign-Post Description #1
     * @localized false
     */
    signPostDescription1: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'signPostDescription2' (Sign-Post Description #2)
     * @name Sign-Post Description #2
     * @localized false
     */
    signPostDescription2: EntryFieldTypes.Symbol;
}

/**
 * Entry skeleton type definition for content type 'homepage' (Homepage)
 * @name TypeHomepageSkeleton
 * @type {TypeHomepageSkeleton}
 * @author 0e5NmQEjI50YvjZsuXVNKL
 * @since 2023-06-06T15:34:53.249Z
 * @version 1
 */
export type TypeHomepageSkeleton = EntrySkeletonType<TypeHomepageFields, "homepage">;
/**
 * Entry type definition for content type 'homepage' (Homepage)
 * @name TypeHomepage
 * @type {TypeHomepage}
 * @author 0e5NmQEjI50YvjZsuXVNKL
 * @since 2023-06-06T15:34:53.249Z
 * @version 1
 */
export type TypeHomepage<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeHomepageSkeleton, Modifiers, Locales>;
