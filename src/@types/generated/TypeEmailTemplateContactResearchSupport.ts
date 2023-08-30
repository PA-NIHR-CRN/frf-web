import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

/**
 * Fields type definition for content type 'TypeEmailTemplateContactResearchSupport'
 * @name TypeEmailTemplateContactResearchSupportFields
 * @type {TypeEmailTemplateContactResearchSupportFields}
 * @memberof TypeEmailTemplateContactResearchSupport
 */
export interface TypeEmailTemplateContactResearchSupportFields {
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
     * Field type definition for field 'senderSubject' (Sender Subject)
     * @name Sender Subject
     * @localized false
     */
    senderSubject: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'senderBody' (Sender Body)
     * @name Sender Body
     * @localized false
     */
    senderBody: EntryFieldTypes.RichText;
    /**
     * Field type definition for field 'teamSubject' (Team Subject)
     * @name Team Subject
     * @localized false
     */
    teamSubject: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'teamBody' (Team Body)
     * @name Team Body
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
 * Entry skeleton type definition for content type 'emailTemplateContactResearchSupport' (Email Template - Contact Research Support)
 * @name TypeEmailTemplateContactResearchSupportSkeleton
 * @type {TypeEmailTemplateContactResearchSupportSkeleton}
 * @author 2MXTjjyvpmOzLPW2qSiIPI
 * @since 2023-08-23T17:05:39.734Z
 * @version 17
 */
export type TypeEmailTemplateContactResearchSupportSkeleton = EntrySkeletonType<TypeEmailTemplateContactResearchSupportFields, "emailTemplateContactResearchSupport">;
/**
 * Entry type definition for content type 'emailTemplateContactResearchSupport' (Email Template - Contact Research Support)
 * @name TypeEmailTemplateContactResearchSupport
 * @type {TypeEmailTemplateContactResearchSupport}
 * @author 2MXTjjyvpmOzLPW2qSiIPI
 * @since 2023-08-23T17:05:39.734Z
 * @version 17
 */
export type TypeEmailTemplateContactResearchSupport<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeEmailTemplateContactResearchSupportSkeleton, Modifiers, Locales>;
