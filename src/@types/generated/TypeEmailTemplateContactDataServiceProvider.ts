import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

/**
 * Fields type definition for content type 'TypeEmailTemplateContactDataServiceProvider'
 * @name TypeEmailTemplateContactDataServiceProviderFields
 * @type {TypeEmailTemplateContactDataServiceProviderFields}
 * @memberof TypeEmailTemplateContactDataServiceProvider
 */
export interface TypeEmailTemplateContactDataServiceProviderFields {
    /**
     * Field type definition for field 'title' (Title)
     * @name Title
     * @localized false
     */
    title: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'sourceInbox' (Source inbox)
     * @name Source inbox
     * @localized false
     */
    sourceInbox: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'senderSubject' (Researcher Subject)
     * @name Researcher Subject
     * @localized false
     */
    senderSubject: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'senderBody' (Researcher Body)
     * @name Researcher Body
     * @localized false
     */
    senderBody: EntryFieldTypes.RichText;
    /**
     * Field type definition for field 'teamSubject' (Data Service Provider Subject)
     * @name Data Service Provider Subject
     * @localized false
     */
    teamSubject: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'teamBody' (Data Service Provider Body)
     * @name Data Service Provider Body
     * @localized false
     */
    teamBody: EntryFieldTypes.RichText;
    /**
     * Field type definition for field 'signature' (Signature)
     * @name Signature
     * @localized false
     */
    signature: EntryFieldTypes.RichText;
    /**
     * Field type definition for field 'signatureLogo' (Signature Logo)
     * @name Signature Logo
     * @localized false
     */
    signatureLogo?: EntryFieldTypes.Symbol;
}

/**
 * Entry skeleton type definition for content type 'emailTemplateContactDataServiceProvider' (Email Template - Contact Data Service Provider)
 * @name TypeEmailTemplateContactDataServiceProviderSkeleton
 * @type {TypeEmailTemplateContactDataServiceProviderSkeleton}
 * @author 2MXTjjyvpmOzLPW2qSiIPI
 * @since 2023-08-23T19:05:10.798Z
 * @version 17
 */
export type TypeEmailTemplateContactDataServiceProviderSkeleton = EntrySkeletonType<TypeEmailTemplateContactDataServiceProviderFields, "emailTemplateContactDataServiceProvider">;
/**
 * Entry type definition for content type 'emailTemplateContactDataServiceProvider' (Email Template - Contact Data Service Provider)
 * @name TypeEmailTemplateContactDataServiceProvider
 * @type {TypeEmailTemplateContactDataServiceProvider}
 * @author 2MXTjjyvpmOzLPW2qSiIPI
 * @since 2023-08-23T19:05:10.798Z
 * @version 17
 */
export type TypeEmailTemplateContactDataServiceProvider<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeEmailTemplateContactDataServiceProviderSkeleton, Modifiers, Locales>;
