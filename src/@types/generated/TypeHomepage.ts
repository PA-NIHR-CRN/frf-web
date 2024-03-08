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
    description: EntryFieldTypes.RichText;
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
     * @summary Description for the "Get support for your research" section
     */
    signPostDescription1: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'signPostDescription2' (Sign-Post Description #2)
     * @name Sign-Post Description #2
     * @localized false
     * @summary Description for the "Organisations providing data services" section
     */
    signPostDescription2: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'metaTitle' (Meta: Title)
     * @name Meta: Title
     * @localized false
     */
    metaTitle?: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'metaDescription' (Meta: Description)
     * @name Meta: Description
     * @localized false
     */
    metaDescription?: EntryFieldTypes.Text;
}

/**
 * Entry skeleton type definition for content type 'homepage' (Homepage)
 * @name TypeHomepageSkeleton
 * @type {TypeHomepageSkeleton}
 * @author 0e5NmQEjI50YvjZsuXVNKL
 * @since 2023-06-06T15:34:53.249Z
 * @version 65
 */
export type TypeHomepageSkeleton = EntrySkeletonType<TypeHomepageFields, "homepage">;
/**
 * Entry type definition for content type 'homepage' (Homepage)
 * @name TypeHomepage
 * @type {TypeHomepage}
 * @author 0e5NmQEjI50YvjZsuXVNKL
 * @since 2023-06-06T15:34:53.249Z
 * @version 65
 */
export type TypeHomepage<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeHomepageSkeleton, Modifiers, Locales>;
