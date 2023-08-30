import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

/**
 * Fields type definition for content type 'TypeEmailTemplateContactFrfCentralTeam'
 * @name TypeEmailTemplateContactFrfCentralTeamFields
 * @type {TypeEmailTemplateContactFrfCentralTeamFields}
 * @memberof TypeEmailTemplateContactFrfCentralTeam
 */
export interface TypeEmailTemplateContactFrfCentralTeamFields {
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
     * Field type definition for field 'recipients' (Recipients)
     * @name Recipients
     * @localized false
     */
    recipients: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
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
 * Entry skeleton type definition for content type 'emailTemplateContactFrfCentralTeam' (Email Template - Contact FRF Central Team)
 * @name TypeEmailTemplateContactFrfCentralTeamSkeleton
 * @type {TypeEmailTemplateContactFrfCentralTeamSkeleton}
 * @author 2MXTjjyvpmOzLPW2qSiIPI
 * @since 2023-08-23T15:56:17.369Z
 * @version 13
 */
export type TypeEmailTemplateContactFrfCentralTeamSkeleton = EntrySkeletonType<TypeEmailTemplateContactFrfCentralTeamFields, "emailTemplateContactFrfCentralTeam">;
/**
 * Entry type definition for content type 'emailTemplateContactFrfCentralTeam' (Email Template - Contact FRF Central Team)
 * @name TypeEmailTemplateContactFrfCentralTeam
 * @type {TypeEmailTemplateContactFrfCentralTeam}
 * @author 2MXTjjyvpmOzLPW2qSiIPI
 * @since 2023-08-23T15:56:17.369Z
 * @version 13
 */
export type TypeEmailTemplateContactFrfCentralTeam<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeEmailTemplateContactFrfCentralTeamSkeleton, Modifiers, Locales>;
